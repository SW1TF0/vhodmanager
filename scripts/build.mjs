// Static site generator: renders every page in both languages into dist/.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../src/config.mjs';
import { layout } from '../src/layout.mjs';
import { ui } from '../src/ui.mjs';
import { LANGS, absolute, href, pagePath, routes } from '../src/util.mjs';

import home from '../src/pages/home.mjs';
import services from '../src/pages/services.mjs';
import pricing from '../src/pages/pricing.mjs';
import about from '../src/pages/about.mjs';
import contact from '../src/pages/contact.mjs';
import privacy from '../src/pages/privacy.mjs';
import cookies from '../src/pages/cookies.mjs';
import terms from '../src/pages/terms.mjs';
import accessibility from '../src/pages/accessibility.mjs';
import legal from '../src/pages/legal.mjs';
import rights from '../src/pages/rights.mjs';

const pages = [home, services, pricing, about, contact, privacy, cookies, terms, accessibility, legal, rights];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

async function write(path, content) {
  const file = join(dist, path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
}

function notFound() {
  // One bilingual 404 page, served by the host for any unknown URL.
  const bg = ui.bg.notFound;
  const en = ui.en.notFound;
  return layout({
    lang: 'bg',
    key: null,
    title: bg.title,
    description: bg.text,
    body: `<section class="page-hero"><div class="container">
        <h1>${bg.title}</h1>
        <p class="lead">${bg.text}</p>
        <p><a class="button" href="${href('bg', 'home')}">${bg.back}</a></p>
        <div lang="en">
          <h2>${en.title}</h2>
          <p>${en.text}</p>
          <p><a class="button button-outline" href="${href('en', 'home')}">${en.back}</a></p>
        </div>
      </div></section>`,
  });
}

function sitemap() {
  const urls = Object.keys(routes)
    .flatMap((key) =>
      LANGS.map(
        (lang) => `  <url>
    <loc>${absolute(lang, key)}</loc>
${LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${absolute(l, key)}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute('bg', key)}"/>
  </url>`,
      ),
    )
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}

// Security headers for hosts that support a _headers file (Netlify, Cloudflare Pages).
function headers() {
  return `/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Content-Security-Policy: frame-ancestors 'none'
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()
  Cross-Origin-Opener-Policy: same-origin

/css/*
  Cache-Control: public, max-age=86400
/js/*
  Cache-Control: public, max-age=86400
`;
}

export async function build() {
  await rm(dist, { recursive: true, force: true });
  await cp(join(root, 'static'), dist, { recursive: true });
  const seen = new Set(pages.map((p) => p.key));
  for (const key of Object.keys(routes)) {
    if (!seen.has(key)) throw new Error(`No page module for route "${key}"`);
  }
  for (const page of pages) {
    for (const lang of LANGS) {
      const { title, description, body } = page.render(lang);
      const html = layout({ lang, key: page.key, title, description, body });
      await write(join(pagePath(lang, page.key), 'index.html'), html);
    }
  }
  await write('404.html', notFound());
  await write('sitemap.xml', sitemap());
  await write('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url.replace(/\/$/, '')}/sitemap.xml\n`);
  await write('_headers', headers());
  await write('.nojekyll', '');
  return dist;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = await build();
  console.log(`Built ${pages.length * LANGS.length} pages into ${out}`);
}
