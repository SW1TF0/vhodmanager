import { site } from '../config.mjs';
import { pageHero } from '../components.mjs';
import { esc, href, telHref, telText } from '../util.mjs';

const c = site.company;

const text = {
  bg: {
    title: 'Правна информация',
    description: 'Данни за търговеца, регистрация и надзорни органи – информация по Закона за електронната търговия.',
    intro: 'Информация по чл. 4 от Закона за електронната търговия и Закона за защита на потребителите.',
    rows: [
      ['Търговец', esc(c.legalName)],
      ['Търговска марка', esc(site.brand.bg)],
      ['ЕИК', `${esc(c.eik)} (Търговски регистър и регистър на ЮЛНЦ към Агенцията по вписванията)`],
      ...(c.vatRegistered ? [['ДДС номер', esc(c.vatNumber)]] : []),
      ['Седалище и адрес на управление', esc(c.registeredOffice)],
      ['Адрес за кореспонденция', esc(c.officeAddress)],
      ['Представлявано от', esc(c.representative)],
      ['Имейл', `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`],
      ['Телефон', `<a href="${telHref(c.phone)}">${esc(telText(c.phone))}</a>`],
    ],
    authoritiesTitle: 'Надзорни органи',
    authorities: [
      ['Комисия за защита на потребителите', 'София 1000, пл. „Славейков“ № 4А', 'https://kzp.bg/', 'kzp.bg'],
      ['Комисия за защита на личните данни', 'София 1592, бул. „Проф. Цветан Лазаров“ № 2', 'https://www.cpdp.bg/', 'www.cpdp.bg'],
    ],
    activityTitle: 'Дейност',
    activity:
      'Професионално управление на етажна собственост по договор с общото събрание съгласно Закона за управление на етажната собственост. Дейността не подлежи на лицензионен режим.',
    linksTitle: 'Свързани документи',
  },
  en: {
    title: 'Legal notice',
    description: 'Trader details, registration and supervisory authorities – information under the Bulgarian E-Commerce Act.',
    intro: 'Information under Art. 4 of the Bulgarian E-Commerce Act and the Consumer Protection Act.',
    rows: [
      ['Trader', esc(c.legalName)],
      ['Trade mark', esc(site.brand.en)],
      ['UIC', `${esc(c.eik)} (Commercial Register, Registry Agency of Bulgaria)`],
      ...(c.vatRegistered ? [['VAT number', esc(c.vatNumber)]] : []),
      ['Registered office', esc(c.registeredOffice)],
      ['Correspondence address', esc(c.officeAddress)],
      ['Represented by', esc(c.representative)],
      ['E-mail', `<a href="mailto:${esc(c.email)}">${esc(c.email)}</a>`],
      ['Phone', `<a href="${telHref(c.phone)}">${esc(telText(c.phone))}</a>`],
    ],
    authoritiesTitle: 'Supervisory authorities',
    authorities: [
      ['Commission for Consumer Protection', '4A Slaveykov Sq., Sofia 1000', 'https://kzp.bg/', 'kzp.bg'],
      ['Commission for Personal Data Protection', '2 Prof. Tsvetan Lazarov Blvd., Sofia 1592', 'https://www.cpdp.bg/', 'www.cpdp.bg'],
    ],
    activityTitle: 'Business activity',
    activity:
      'Professional condominium management under a contract with the general meeting, in accordance with the Bulgarian Condominium Management Act. This activity is not subject to licensing.',
    linksTitle: 'Related documents',
  },
};

function render(lang) {
  const t = text[lang];
  const docs = ['terms', 'privacy', 'cookies', 'accessibility'];
  const names = {
    bg: { terms: 'Общи условия', privacy: 'Политика за поверителност', cookies: 'Политика за бисквитките', accessibility: 'Декларация за достъпност' },
    en: { terms: 'Terms and conditions', privacy: 'Privacy policy', cookies: 'Cookie policy', accessibility: 'Accessibility statement' },
  }[lang];
  return {
    title: t.title,
    description: t.description,
    body: `${pageHero(t.title, t.intro)}
      <div class="container prose section">
        <dl class="definition-list">
          ${t.rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}
        </dl>
        <h2>${t.activityTitle}</h2>
        <p>${t.activity}</p>
        <h2>${t.authoritiesTitle}</h2>
        <ul>
          ${t.authorities.map(([n, a, u, l]) => `<li><strong>${n}</strong>, ${a} – <a href="${u}" rel="noopener">${l}</a></li>`).join('')}
        </ul>
        <h2>${t.linksTitle}</h2>
        <ul>${docs.map((d) => `<li><a href="${href(lang, d)}">${names[d]}</a></li>`).join('')}</ul>
      </div>`,
  };
}

export default { key: 'legal', render };
