import { site } from '../config.mjs';
import { pageHero, table } from '../components.mjs';
import { href, price, vatPhrase } from '../util.mjs';

const plans = {
  bg: {
    basic: { name: 'Основен', desc: 'За малки сгради, които искат подредена каса и документи.' },
    standard: { name: 'Стандарт', desc: 'Пълно управление на входа – най-често избираният план.' },
    premium: { name: 'Премиум', desc: 'За големи сгради и комплекси с повече поддръжка.' },
  },
  en: {
    basic: { name: 'Basic', desc: 'For small buildings that want tidy funds and paperwork.' },
    standard: { name: 'Standard', desc: 'Full building management – our most popular plan.' },
    premium: { name: 'Premium', desc: 'For large buildings and complexes with more maintenance.' },
  },
};

// [label, basic, standard, premium]
const features = {
  bg: [
    ['Книга на етажната собственост и документи', true, true, true],
    ['Събиране на вноски и плащане на сметки', true, true, true],
    ['Онлайн отчет за собствениците', true, true, true],
    ['Общи събрания (до 2 годишно)', true, true, true],
    ['Огледи на общите части', 'веднъж месечно', 'два пъти месечно', 'всяка седмица'],
    ['Организиране на ремонти и поддръжка', false, true, true],
    ['Аварийна линия 24/7', false, true, true],
    ['Отговорен мениджър на сградата', false, true, true],
    ['Съдействие при събиране на задължения', false, false, true],
    ['Кандидатстване по програми за обновяване', false, false, true],
  ],
  en: [
    ['Condominium register and documents', true, true, true],
    ['Collecting contributions and paying bills', true, true, true],
    ['Online reports for owners', true, true, true],
    ['General meetings (up to 2 a year)', true, true, true],
    ['Inspections of common areas', 'monthly', 'twice a month', 'weekly'],
    ['Organising repairs and maintenance', false, true, true],
    ['24/7 emergency line', false, true, true],
    ['Dedicated building manager', false, true, true],
    ['Help with recovering arrears', false, false, true],
    ['Applying for renovation programmes', false, false, true],
  ],
};

const text = {
  bg: {
    title: 'Цени',
    description: 'Прозрачни месечни цени за професионално управление на етажна собственост – на самостоятелен обект, в евро.',
    intro: 'Една фиксирана месечна такса на самостоятелен обект (апартамент, ателие, офис, магазин). Без такса за преминаване и без скрити разходи.',
    perUnit: 'на обект / месец',
    minimum: (m) => `Минимум ${m} на сграда месечно`,
    popular: 'Най-избиран',
    choose: 'Поискайте оферта',
    compareTitle: 'Сравнение на плановете',
    tableLabel: 'Таблица за сравнение на плановете',
    feature: 'Услуга',
    yes: 'Включено',
    no: 'Не е включено',
    notesTitle: 'Важно за цените',
    notes: [
      `Всички цени са в евро и са крайни – ${vatPhrase('bg')}.`,
      'Цената не включва разходите на етажната собственост (ток и вода за общите части, асансьор, почистване, ремонти) – те се плащат от средствата на сградата и се отчитат отделно.',
      'Таксата се дължи от етажната собственост въз основа на договора, сключен след решение на общото събрание.',
      'Допълнителни услуги извън плана (напр. извънредни общи събрания, юридическа помощ) се договарят предварително и писмено.',
      'Окончателната цена се посочва в индивидуалната оферта и договора. Цените на тази страница не представляват оферта по смисъла на Закона за задълженията и договорите.',
    ],
  },
  en: {
    title: 'Pricing',
    description: 'Transparent monthly prices for professional condominium management – per unit, in euro.',
    intro: 'One fixed monthly fee per self-contained unit (apartment, studio, office, shop). No switching fee and no hidden costs.',
    perUnit: 'per unit / month',
    minimum: (m) => `Minimum ${m} per building per month`,
    popular: 'Most popular',
    choose: 'Request a quote',
    compareTitle: 'Compare plans',
    tableLabel: 'Plan comparison table',
    feature: 'Service',
    yes: 'Included',
    no: 'Not included',
    notesTitle: 'Good to know',
    notes: [
      `All prices are in euro and final – ${vatPhrase('en')}.`,
      'The price does not include the condominium’s own costs (common-area electricity and water, lift, cleaning, repairs) – these are paid from the building’s funds and reported separately.',
      'The fee is payable by the condominium under the contract concluded after the general meeting’s decision.',
      'Extra services outside the plan (e.g. extraordinary meetings, legal assistance) are agreed in advance and in writing.',
      'The final price is stated in the individual quote and contract. The prices on this page are not a binding offer.',
    ],
  },
};

function cell(value, t) {
  if (value === true) return `<td><span class="yes" aria-hidden="true">✓</span><span class="visually-hidden">${t.yes}</span></td>`;
  if (value === false) return `<td><span class="no" aria-hidden="true">—</span><span class="visually-hidden">${t.no}</span></td>`;
  return `<td>${value}</td>`;
}

function render(lang) {
  const t = text[lang];
  const p = plans[lang];
  const cards = site.pricing.plans
    .map(
      (plan) => `<li class="plan${plan.featured ? ' plan-featured' : ''}">
            ${plan.featured ? `<p class="badge">${t.popular}</p>` : ''}
            <h2 class="plan-name">${p[plan.id].name}</h2>
            <p class="plan-price"><span class="amount">${price(plan.price, lang)}</span> <span class="unit">${t.perUnit}</span></p>
            <p class="small muted">${vatPhrase(lang)}</p>
            <p>${p[plan.id].desc}</p>
            <p class="small">${t.minimum(price(plan.minimum, lang))}</p>
            <a class="button${plan.featured ? '' : ' button-outline'}" href="${href(lang, 'contact')}#zapitvane">${t.choose}<span class="visually-hidden"> – ${p[plan.id].name}</span></a>
          </li>`,
    )
    .join('');
  const head = `<caption class="visually-hidden">${t.compareTitle}</caption><thead><tr><th scope="col">${t.feature}</th>${site.pricing.plans
    .map((plan) => `<th scope="col">${p[plan.id].name}</th>`)
    .join('')}</tr></thead>`;
  const rows = features[lang]
    .map(([label, ...vals]) => `<tr><th scope="row">${label}</th>${vals.map((v) => cell(v, t)).join('')}</tr>`)
    .join('');
  return {
    title: t.title,
    description: t.description,
    body: `${pageHero(t.title, t.intro)}
      <section class="section" aria-label="${t.title}">
        <div class="container">
          <ul class="plans">${cards}</ul>
        </div>
      </section>
      <section class="section section-alt" aria-labelledby="compare-title">
        <div class="container">
          <h2 id="compare-title" class="section-title">${t.compareTitle}</h2>
          ${table(t.tableLabel, `${head}<tbody>${rows}</tbody>`)}
        </div>
      </section>
      <section class="section" aria-labelledby="notes-title">
        <div class="container narrow">
          <h2 id="notes-title">${t.notesTitle}</h2>
          <ul>${t.notes.map((n) => `<li>${n}</li>`).join('')}</ul>
        </div>
      </section>`,
  };
}

export default { key: 'pricing', render };
