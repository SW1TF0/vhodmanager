// Browser tests: WCAG 2.1 AA checks with axe-core on every page, plus the
// cookie-consent behaviour (nothing third-party loads before opt-in).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { AxeBuilder } from '@axe-core/playwright';

import { build } from '../scripts/build.mjs';
import { serve } from '../scripts/serve.mjs';
import { LANGS, pagePath, routes } from '../src/util.mjs';

let server;
let browser;
let base;

before(async () => {
  await build();
  server = await serve(0);
  base = `http://127.0.0.1:${server.address().port}`;
  browser = await chromium.launch();
});

after(async () => {
  await browser?.close();
  server?.close();
});

/** New page that records every request leaving our own origin, and blocks it. */
async function newPage(options = {}) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const external = [];
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.startsWith(base)) return route.continue();
    external.push(url);
    return route.abort();
  });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  return { page, context, external, errors };
}

const urls = [...Object.keys(routes).flatMap((key) => LANGS.map((lang) => pagePath(lang, key))), '/404.html'];

for (const url of urls) {
  test(`axe: no WCAG 2.1 A/AA violations on ${url}`, async () => {
    const { page, context, external, errors } = await newPage();
    await page.goto(base + url);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target).join(', ')})`);
    assert.deepEqual(summary, [], summary.join('\n'));
    assert.deepEqual(external, [], 'no third-party requests before consent');
    assert.deepEqual(errors, [], 'no JavaScript errors');
    await context.close();
  });
}

test('consent banner is shown first and "reject" keeps third parties blocked', async () => {
  const { page, context, external } = await newPage();
  await page.goto(`${base}/kontakti/`);
  const banner = page.locator('#consent-banner');
  await assert.doesNotReject(banner.waitFor({ state: 'visible' }));
  await page.click('[data-consent-reject]');
  assert.equal(await banner.isVisible(), false);
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('vm_consent')));
  assert.equal(stored.categories.external, false);
  await page.reload();
  assert.equal(await banner.isVisible(), false, 'choice is remembered');
  assert.equal(await page.locator('.map iframe').count(), 0);
  assert.deepEqual(external, []);
  await context.close();
});

test('accepting loads the map, withdrawing via settings removes it', async () => {
  const { page, context } = await newPage();
  await page.goto(`${base}/en/contact/`);
  await page.locator('.map').scrollIntoViewIfNeeded();
  const mapRequest = page.waitForRequest((r) => r.url().startsWith('https://www.openstreetmap.org/'));
  await page.click('[data-consent-accept]');
  await page.locator('.map iframe').waitFor();
  // Resolves once the browser asks OpenStreetMap for the map.
  await mapRequest;

  await page.click('footer [data-consent-open]');
  const dialog = page.locator('#consent-dialog');
  await dialog.waitFor({ state: 'visible' });
  const box = dialog.locator('input[name="external"]');
  assert.equal(await box.isChecked(), true);
  await box.uncheck();
  await page.click('[data-consent-save]');
  // The dialog's close event fires asynchronously after the click.
  await page.locator('.map iframe').waitFor({ state: 'detached' });
  const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('vm_consent')));
  assert.equal(stored.categories.external, false);
  await context.close();
});

test('the map can be loaded once without storing consent', async () => {
  const { page, context } = await newPage();
  await page.goto(`${base}/kontakti/`);
  await page.click('[data-map-load]');
  await page.locator('.map iframe').waitFor();
  assert.equal(await page.evaluate(() => localStorage.getItem('vm_consent')), null);
  assert.equal(await page.locator('#consent-banner').isVisible(), true);
  await context.close();
});

test('keyboard: skip link is the first focusable element and moves focus to main', async () => {
  const { page, context } = await newPage();
  await page.goto(`${base}/`);
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.className), 'skip-link');
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(() => location.hash), '#main');
  await context.close();
});

test('mobile: menu toggles, and no page scrolls horizontally at 320px', async () => {
  const { page, context } = await newPage({ viewport: { width: 320, height: 640 } });
  await page.goto(`${base}/`);
  await page.evaluate(() => localStorage.setItem('vm_consent', JSON.stringify({ version: 1, date: Date.now(), categories: { external: false } })));
  await page.reload();
  const toggle = page.locator('.nav-toggle');
  assert.equal(await page.locator('#site-nav').isVisible(), false);
  await toggle.click();
  assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(await page.locator('#site-nav').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await toggle.getAttribute('aria-expanded'), 'false');

  for (const url of urls) {
    await page.goto(base + url);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    assert.ok(overflow <= 0, `${url} overflows by ${overflow}px`);
  }
  await context.close();
});

test('forms: errors are announced and linked to fields', async () => {
  const { page, context } = await newPage();
  await page.goto(`${base}/kontakti/`);
  await page.click('[data-consent-reject]');
  await page.click('#quote-form button[type="submit"]');
  const summary = page.locator('#quote-form .form-errors');
  await summary.waitFor({ state: 'visible' });
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains('form-errors')), true);
  assert.equal(await page.locator('#f-name').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#f-phone').getAttribute('aria-invalid'), null);
  await page.fill('#f-email', 'not-an-email');
  await page.click('#quote-form button[type="submit"]');
  assert.match(await page.locator('#f-email-error').textContent(), /имейл/);

  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.deepEqual(results.violations.map((v) => v.id), []);
  await context.close();
});

test('forms: a valid enquiry opens a pre-filled e-mail when no endpoint is configured', async () => {
  const { page, context } = await newPage();
  await page.goto(`${base}/en/contact/`);
  await page.click('[data-consent-reject]');
  await page.fill('#f-name', 'Maria Ivanova');
  await page.fill('#f-email', 'maria@example.com');
  await page.fill('#f-address', 'Sofia, 1 Vitosha Blvd');
  await page.click('#quote-form button[type="submit"]');
  const status = await page.locator('#quote-form .form-status').textContent();
  assert.match(status, /e-mail program/);
  await context.close();
});
