import { site } from './config.mjs';
import { ui } from './ui.mjs';
import { LANGS, absolute, asset, esc, href, telHref, telText } from './util.mjs';

const OSM_ORIGIN = 'https://www.openstreetmap.org';

function csp() {
  const formTargets = ["'self'", 'mailto:'];
  const connect = ["'self'"];
  if (site.formEndpoint) {
    const origin = new URL(site.formEndpoint).origin;
    formTargets.push(origin);
    connect.push(origin);
  }
  return [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src ${connect.join(' ')}`,
    `frame-src ${OSM_ORIGIN}`,
    `form-action ${formTargets.join(' ')}`,
    "base-uri 'self'",
    "object-src 'none'",
  ].join('; ');
}

function head({ lang, key, title, description }) {
  const brand = site.brand[lang];
  const fullTitle = key === 'home' ? `${brand} – ${ui[lang].tagline}` : `${title} | ${brand}`;
  const alternates = key
    ? LANGS.map(
        (l) => `<link rel="alternate" hreflang="${l}" href="${absolute(l, key)}">`,
      ).join('\n    ') + `\n    <link rel="alternate" hreflang="x-default" href="${absolute('bg', key)}">`
    : '';
  const canonical = key ? `<link rel="canonical" href="${absolute(lang, key)}">` : '';
  return `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Security-Policy" content="${csp()}">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <title>${esc(fullTitle)}</title>
    <meta name="description" content="${esc(description)}">
    ${canonical}
    ${alternates}
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${esc(brand)}">
    <meta property="og:title" content="${esc(fullTitle)}">
    <meta property="og:description" content="${esc(description)}">
    <meta property="og:locale" content="${lang === 'bg' ? 'bg_BG' : 'en_GB'}">
    ${key ? `<meta property="og:url" content="${absolute(lang, key)}">` : ''}
    <meta name="theme-color" content="#0b4f6c">
    <link rel="icon" href="${asset('favicon.svg')}" type="image/svg+xml">
    <link rel="stylesheet" href="${asset('css/site.css')}">
    <script src="${asset('js/consent.js')}" defer></script>
    <script src="${asset('js/site.js')}" defer></script>
  </head>`;
}

function header(lang, key) {
  const t = ui[lang];
  const other = lang === 'bg' ? 'en' : 'bg';
  const navItems = ['home', 'services', 'pricing', 'about', 'contact']
    .map((k) => {
      const current = k === key ? ' aria-current="page"' : '';
      return `<li><a href="${href(lang, k)}"${current}>${t.nav[k]}</a></li>`;
    })
    .join('');
  return `<header class="site-header">
      <div class="container header-inner">
        <a class="logo" href="${href(lang, 'home')}" aria-label="${esc(t.homeLink)}">
          <svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M4 14 16 4l12 10v14H20v-9h-8v9H4z"/></svg>
          <span>${esc(site.brand[lang])}</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">
          <span class="nav-toggle-bar" aria-hidden="true"></span>
          ${t.menu}
        </button>
        <nav id="site-nav" class="site-nav" aria-label="${t.mainNav}">
          <ul>${navItems}</ul>
          <a class="lang-switch" href="${href(other, key || 'home')}" lang="${other}" hreflang="${other}">${t.switchTo}</a>
          <a class="button button-small" href="${href(lang, 'contact')}#zapitvane">${t.cta}</a>
        </nav>
      </div>
    </header>`;
}

function footer(lang) {
  const t = ui[lang];
  const f = t.footer;
  const c = site.company;
  const legalLinks = Object.keys(t.legalNav)
    .map((k) => `<li><a href="${href(lang, k)}">${t.legalNav[k]}</a></li>`)
    .join('');
  const year = new Date().getFullYear();
  return `<footer class="site-footer">
      <div class="container footer-grid">
        <section aria-labelledby="footer-about">
          <h2 id="footer-about" class="footer-title">${esc(site.brand[lang])}</h2>
          <p>${f.about}</p>
          <h3 class="footer-subtitle">${f.company}</h3>
          <p class="small">
            ${esc(c.legalName)}<br>
            ${f.eik}: ${esc(c.eik)}${c.vatRegistered ? `<br>${f.vat}: ${esc(c.vatNumber)}` : ''}<br>
            ${f.address}: ${esc(c.registeredOffice)}
          </p>
        </section>
        <nav aria-labelledby="footer-site">
          <h2 id="footer-site" class="footer-title">${f.site}</h2>
          <ul class="footer-links">
            ${['home', 'services', 'pricing', 'about', 'contact'].map((k) => `<li><a href="${href(lang, k)}">${t.nav[k]}</a></li>`).join('')}
          </ul>
        </nav>
        <nav aria-labelledby="footer-legal">
          <h2 id="footer-legal" class="footer-title">${f.legal}</h2>
          <ul class="footer-links">
            ${legalLinks}
            <li><button type="button" class="link-button" data-consent-open>${f.cookieSettings}</button></li>
          </ul>
        </nav>
        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" class="footer-title">${f.contact}</h2>
          <ul class="footer-links">
            <li><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
            <li><a href="${telHref(c.phone)}">${esc(telText(c.phone))}</a></li>
            <li>${f.emergency}: <a href="${telHref(c.emergencyPhone)}">${esc(telText(c.emergencyPhone))}</a></li>
            <li>${esc(c.hours[lang])}</li>
          </ul>
        </section>
      </div>
      <div class="container footer-bottom small">
        <p>${f.adr} <a href="https://kzp.bg/" rel="noopener" lang="bg">${f.kzp}</a>.</p>
        <p>© ${year} ${esc(c.legalName)}. ${f.rights}</p>
      </div>
    </footer>`;
}

function consentUi(lang) {
  const c = ui[lang].consent;
  return `<section id="consent-banner" class="consent-banner" aria-labelledby="consent-title" hidden>
      <div class="container consent-inner">
        <div>
          <h2 id="consent-title" class="consent-title">${c.bannerTitle}</h2>
          <p>${c.bannerText} <a href="${href(lang, 'cookies')}">${c.more}</a>.</p>
        </div>
        <div class="consent-actions">
          <button type="button" class="button" data-consent-accept>${c.acceptAll}</button>
          <button type="button" class="button" data-consent-reject>${c.rejectAll}</button>
          <button type="button" class="button button-outline" data-consent-open>${c.customize}</button>
        </div>
      </div>
    </section>
    <dialog id="consent-dialog" class="consent-dialog" aria-labelledby="consent-dialog-title">
      <form method="dialog" class="consent-form">
        <h2 id="consent-dialog-title">${c.dialogTitle}</h2>
        <p>${c.dialogIntro}</p>
        <fieldset class="consent-category">
          <legend>${c.necessary}</legend>
          <p class="small">${c.necessaryDesc}</p>
          <p class="small"><strong>${c.alwaysOn}</strong></p>
        </fieldset>
        <fieldset class="consent-category">
          <legend>${c.external}</legend>
          <p class="small" id="consent-external-desc">${c.externalDesc}</p>
          <label class="check"><input type="checkbox" name="external" aria-describedby="consent-external-desc"> ${c.external}</label>
        </fieldset>
        <div class="consent-actions">
          <button type="submit" class="button" value="save" data-consent-save>${c.save}</button>
          <button type="submit" class="button button-outline" value="cancel">${c.close}</button>
        </div>
      </form>
    </dialog>
    <p class="visually-hidden" role="status" id="consent-status" data-saved-text="${esc(c.saved)}"></p>`;
}

function structuredData(lang) {
  const c = site.company;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.brand[lang],
    legalName: c.legalName,
    url: absolute(lang, 'home'),
    email: c.email,
    telephone: c.phone,
    areaServed: 'BG',
    address: { '@type': 'PostalAddress', streetAddress: c.officeAddress, addressCountry: 'BG' },
  };
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

export function layout({ lang, key, title, description, body }) {
  const t = ui[lang];
  return `<!doctype html>
<html lang="${lang}">
  ${head({ lang, key, title, description })}
  <body>
    <a class="skip-link" href="#main">${t.skip}</a>
    ${consentUi(lang)}
    ${header(lang, key)}
    <main id="main" tabindex="-1">
${body}
    </main>
    ${footer(lang)}
    ${key === 'home' ? structuredData(lang) : ''}
  </body>
</html>
`;
}
