// Central site configuration.
// Every value that starts with "[TODO" is a placeholder that must be replaced
// with the real company details before going live. Run `npm run placeholders`
// to list the ones that are still left.

export const site = {
  // Public URL of the site (used for canonical links, hreflang and the sitemap).
  url: process.env.SITE_URL || 'https://www.vhodmanager.bg',
  // Path prefix when the site is hosted in a sub-folder (e.g. GitHub Pages project site).
  basePath: (process.env.BASE_PATH || '').replace(/\/$/, ''),

  brand: { bg: 'Вход мениджър', en: 'Vhodmanager' },

  company: {
    legalName: '[TODO: Наименование на дружеството / Company name]',
    eik: '[TODO: ЕИК / UIC]',
    vatNumber: '[TODO: ДДС № BG… / VAT No.]',
    // true if the company is VAT-registered; changes the wording next to the prices.
    vatRegistered: true,
    registeredOffice: '[TODO: Седалище и адрес на управление / Registered office]',
    officeAddress: '[TODO: Адрес на офиса за клиенти / Customer office address]',
    representative: '[TODO: Управител / Managing director]',
    email: 'office@vhodmanager.bg',
    privacyEmail: 'privacy@vhodmanager.bg',
    phone: '+359 2 000 0000',
    emergencyPhone: '+359 800 00 000',
    hours: { bg: 'Понеделник – петък, 9:00 – 18:00 ч.', en: 'Monday – Friday, 9:00 – 18:00' },
    // Data protection officer. Leave null if none is appointed (not mandatory for most small companies).
    dpo: null,
  },

  // Hosting provider – named in the privacy policy as a processor.
  hosting: '[TODO: Хостинг доставчик и държава / Hosting provider and country]',

  // Where form submissions go. Leave empty to fall back to opening the visitor's
  // e-mail program (mailto:). Set to a form-handling endpoint (hosted in the EU and
  // covered by a data processing agreement) for direct submission.
  formEndpoint: process.env.FORM_ENDPOINT || '',

  // Office location for the map on the contact page (loaded only after consent).
  map: { lat: 42.6977, lon: 23.3219 },

  // Monthly prices in EUR per self-contained unit (apartment, office, shop), VAT included.
  pricing: {
    currency: 'EUR',
    plans: [
      { id: 'basic', price: 3.9, minimum: 60 },
      { id: 'standard', price: 5.9, minimum: 90, featured: true },
      { id: 'premium', price: 7.9, minimum: 120 },
    ],
  },

  // Date the legal texts were last reviewed (ISO format).
  legalUpdated: '2026-10-11',
};

