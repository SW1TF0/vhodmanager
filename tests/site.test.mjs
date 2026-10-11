// Static checks on the built site: every page exists, links resolve, required
// legal pages are linked everywhere and nothing is loaded from third parties.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';

import { build } from '../scripts/build.mjs';
import { LANGS, pagePath, routes } from '../src/util.mjs';

let dist;
const pages = new Map();

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

before(async () => {
  dist = await build();
  for (const file of await walk(dist)) pages.set(file.slice(dist.length), await readFile(file, 'utf8'));
});

test('every route is built in both languages', () => {
  for (const key of Object.keys(routes)) {
    for (const lang of LANGS) {
      const file = join(pagePath(lang, key), 'index.html');
      assert.ok(pages.has(file), `missing ${file}`);
    }
  }
  assert.ok(pages.has('/404.html'));
});

test('pages declare language, title, description and exactly one h1', () => {
  for (const [file, html] of pages) {
    const lang = file.startsWith('/en/') ? 'en' : 'bg';
    assert.match(html, new RegExp(`<html lang="${lang}">`), file);
    assert.match(html, /<title>[^<]{5,}<\/title>/, file);
    assert.match(html, /<meta name="description" content="[^"]{20,}">/, file);
    assert.equal(html.match(/<h1[\s>]/g)?.length, 1, `${file} should have one h1`);
  }
});

function localLinks(html) {
  return [...html.matchAll(/(?:href|src)="([^"#?:]*)(?:[#?][^"]*)?"/g)].map((m) => m[1]).filter((u) => u && !u.startsWith('//'));
}

test('internal links and assets resolve', async () => {
  for (const [file, html] of pages) {
    for (const url of localLinks(html)) {
      const target = url.startsWith('/') ? join(dist, url) : join(dist, dirname(file), url);
      const exists = await stat(url.endsWith('/') ? join(target, 'index.html') : target).then(
        (s) => s.isFile() || url.endsWith('/'),
        () => false,
      );
      assert.ok(exists, `${file} links to missing ${url}`);
    }
  }
});

test('in-page anchors point at existing ids', () => {
  for (const [file, html] of pages) {
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(id), `${file}: #${id}`);
  }
});

test('legal pages and cookie settings are reachable from every page', () => {
  for (const [file, html] of pages) {
    const lang = file.startsWith('/en/') ? 'en' : 'bg';
    for (const key of ['privacy', 'cookies', 'terms', 'accessibility', 'legal', 'rights']) {
      const linked = localLinks(html).some((u) => !u.startsWith('/') && join(dirname(file), u).replace(/\/?$/, '/') === pagePath(lang, key));
      assert.ok(file === '/404.html' || linked, `${file} lacks a link to ${key}`);
    }
    assert.ok(html.includes('data-consent-open'), `${file} lacks cookie settings`);
  }
});

test('nothing is loaded from third parties and no inline scripts run', () => {
  for (const [file, html] of pages) {
    assert.doesNotMatch(html, /<(script|img|iframe|source|video|audio)[^>]+src="https?:/i, `${file} loads external resource`);
    for (const [tag] of html.matchAll(/<link[^>]+>/g)) {
      if (/rel="(canonical|alternate)"/.test(tag)) continue;
      assert.doesNotMatch(tag, /href="https?:/, `${file} loads external ${tag}`);
    }
    for (const [tag] of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>/g)) {
      assert.match(tag, /type="application\/(ld\+)?json"/, `${file} has an inline executable script`);
    }
    assert.doesNotMatch(html, /\sstyle="/, `${file} uses inline style`);
  }
});

test('pages carry a Content-Security-Policy and hreflang alternates', () => {
  for (const [file, html] of pages) {
    assert.match(html, /http-equiv="Content-Security-Policy" content="default-src 'self'/, file);
    if (file === '/404.html') continue;
    assert.match(html, /hreflang="bg"/, file);
    assert.match(html, /hreflang="en"/, file);
    assert.match(html, /hreflang="x-default"/, file);
  }
});

test('the map is not embedded in the HTML (only after consent)', () => {
  for (const [file, html] of pages) assert.doesNotMatch(html, /<iframe/, file);
});

test('prices state VAT treatment', () => {
  for (const lang of LANGS) {
    const html = pages.get(join(pagePath(lang, 'pricing'), 'index.html'));
    assert.match(html, lang === 'bg' ? /ДДС/ : /VAT/);
    assert.match(html, /€|EUR/);
  }
});
