import { site } from './config.mjs';

export const LANGS = ['bg', 'en'];

// Route table: page key -> slug per language. The Bulgarian site lives at the root,
// the English one under /en/.
export const routes = {
  home: { bg: '', en: '' },
  services: { bg: 'uslugi', en: 'services' },
  pricing: { bg: 'ceni', en: 'pricing' },
  about: { bg: 'za-nas', en: 'about' },
  contact: { bg: 'kontakti', en: 'contact' },
  privacy: { bg: 'poveritelnost', en: 'privacy' },
  cookies: { bg: 'biskvitki', en: 'cookies' },
  terms: { bg: 'obshti-usloviya', en: 'terms' },
  accessibility: { bg: 'dostapnost', en: 'accessibility' },
  legal: { bg: 'pravna-informaciya', en: 'legal-notice' },
  rights: { bg: 'vashite-prava', en: 'your-rights' },
};

/** Site-relative path of a page, without the base path. */
export function pagePath(lang, key) {
  const slug = routes[key][lang];
  const prefix = lang === 'bg' ? '/' : '/en/';
  return slug ? `${prefix}${slug}/` : prefix;
}

// Links are written relative to the page being rendered, so the built site works
// at any address (custom domain, GitHub Pages sub-folder) and when opened from disk.
// The 404 page can be served at any depth, so it uses root-relative links instead.
let currentDir = null;

/** Set the page being rendered (site-relative directory), or null for root-relative links. */
export function setCurrentPage(dir) {
  currentDir = dir;
}

function link(target) {
  // FILE_LINKS=1 points directory links at index.html so pages open with a double click.
  const file = process.env.FILE_LINKS === '1' && target.endsWith('/') ? `${target}index.html` : target;
  if (currentDir === null) return site.basePath + file;
  const depth = currentDir.split('/').filter(Boolean).length;
  return '../'.repeat(depth) + file.slice(1) || './';
}

/** Link to a page. */
export function href(lang, key) {
  return link(pagePath(lang, key));
}

export function asset(path) {
  return link(`/${path.replace(/^\//, '')}`);
}

export function absolute(lang, key) {
  return site.url.replace(/\/$/, '') + pagePath(lang, key);
}

export function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function price(amount, lang) {
  return new Intl.NumberFormat(lang === 'bg' ? 'bg-BG' : 'en-IE', {
    style: 'currency',
    currency: site.pricing.currency,
  }).format(amount);
}

export function formatDate(iso, lang) {
  return new Intl.DateTimeFormat(lang === 'bg' ? 'bg-BG' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function telHref(phone) {
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

/** How the price relates to VAT, depending on the company's VAT registration. */
export function vatPhrase(lang) {
  if (site.company.vatRegistered) return lang === 'bg' ? 'с включен ДДС' : 'including VAT';
  return lang === 'bg' ? 'без ДДС (търговецът не е регистриран по ЗДДС)' : 'no VAT charged (the trader is not VAT-registered)';
}

/** Phone number for display, kept on one line. */
export function telText(phone) {
  return phone.replace(/ /g, '\u00a0');
}
