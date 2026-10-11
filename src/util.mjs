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

/** Link to a page or asset, including the base path. */
export function href(lang, key) {
  return site.basePath + pagePath(lang, key);
}

export function asset(path) {
  return `${site.basePath}/${path.replace(/^\//, '')}`;
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
