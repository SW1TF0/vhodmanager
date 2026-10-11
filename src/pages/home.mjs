import { site } from '../config.mjs';
import { icon } from '../components.mjs';
import { href, price, vatPhrase } from '../util.mjs';

const content = {
  bg: {
    title: 'Начало',
    description:
      'Вход мениджър поема управлението на етажната собственост вместо домоуправителя: каса, разходи, поддръжка, общи събрания и онлайн отчет за всеки собственик.',
    eyebrow: 'Професионален управител на етажна собственост',
    h1: 'Входът ви – подреден, чист и с ясна сметка. Без домоуправител.',
    lead:
      'Поемаме цялото управление на сградата по Закона за управление на етажната собственост (ЗУЕС): касата, сметките, ремонтите, аварийте и общите събрания. Вие получавате прозрачен отчет онлайн.',
    ctaSecondary: 'Вижте цените',
    trust: ['Работим по ЗУЕС', 'Отделна банкова сметка на входа', 'Отчет за всяко евро', 'Аварийна линия 24/7'],
    featuresTitle: 'Какво поемаме вместо вас',
    features: [
      ['doc', 'Документи и закон', 'Водим книгата на етажната собственост, протоколите и решенията и следим сроковете по ЗУЕС.'],
      ['coins', 'Каса и разходи', 'Събираме вноските, плащаме сметките на общите части и водим фонд „Ремонт и обновяване“.'],
      ['wrench', 'Поддръжка и ремонти', 'Организираме почистване, асансьор, осветление и ремонти с оферти от проверени фирми.'],
      ['users', 'Общи събрания', 'Свикваме и провеждаме общите събрания, изготвяме покани и протоколи.'],
      ['chat', 'Комуникация', 'Едно място за съобщения, сигнали и документи – онлайн, по имейл и на таблото във входа.'],
      ['phone', 'Аварии 24/7', 'Денонощна линия за течове, токови аварии и заседнал асансьор.'],
    ],
    stepsTitle: 'Как преминавате към нас',
    steps: [
      ['Запитване', 'Изпращате ни адреса и броя на обектите в сградата.'],
      ['Оглед и оферта', 'Разглеждаме сградата и ви изпращаме писмена оферта без ангажимент.'],
      ['Решение на общото събрание', 'Общото събрание решава да възложи управлението на нас – помагаме с поканата и протокола.'],
      ['Поемаме управлението', 'Приемаме документите и касата от досегашния управител и започваме работа.'],
    ],
    pricingTitle: 'Ясна цена на обект',
    pricingText: (from) =>
      `Плащате фиксирана месечна такса на самостоятелен обект – от ${from} ${vatPhrase('bg')}. Без скрити такси.`,
    pricingLink: 'Сравнете плановете',
    faqTitle: 'Често задавани въпроси',
    faq: [
      [
        'Законно ли е фирма да управлява входа вместо домоуправител?',
        'Да. ЗУЕС позволява на общото събрание да възложи функциите на управителния съвет (управителя) на физическо или юридическо лице въз основа на писмен договор.',
      ],
      [
        'Как се взема решението да ни наемете?',
        'С решение на общото събрание при спазване на изискванията на ЗУЕС за свикване, кворум и мнозинство. Ние подготвяме образец на покана, дневен ред и протокол.',
      ],
      [
        'Къде отиват парите на входа?',
        'Средствата на етажната собственост се водят отделно от нашите и се отчитат по пера. Всеки собственик вижда приходите и разходите онлайн.',
      ],
      [
        'Мога ли да прекратим договора?',
        'Да. Договорът може да бъде прекратен с решение на общото събрание и предизвестие, посочено в договора. При прекратяване предаваме всички документи и наличните средства.',
      ],
      [
        'Какво се случва с документите от досегашния домоуправител?',
        'Приемаме книгата на етажната собственост, протоколите, договорите и касата с приемо-предавателен протокол.',
      ],
    ],
    finalTitle: 'Готови ли сте за спокоен вход?',
    finalText: 'Изпратете запитване и ще ви се обадим в рамките на един работен ден.',
  },
  en: {
    title: 'Home',
    description:
      'Vhodmanager takes over the running of your condominium instead of a volunteer house manager: funds, bills, maintenance, owners’ meetings and online reports for every owner.',
    eyebrow: 'Professional condominium manager in Bulgaria',
    h1: 'A tidy building with clear accounts. No volunteer house manager needed.',
    lead:
      'We run your building under the Bulgarian Condominium Management Act (ZUES): funds, bills, repairs, emergencies and owners’ meetings. You get transparent reports online.',
    ctaSecondary: 'See pricing',
    trust: ['Compliant with ZUES', 'Separate bank account for your building', 'Every euro accounted for', '24/7 emergency line'],
    featuresTitle: 'What we take off your hands',
    features: [
      ['doc', 'Documents and law', 'We keep the condominium register, minutes and decisions, and track every legal deadline.'],
      ['coins', 'Funds and expenses', 'We collect contributions, pay the common-area bills and manage the repair and renovation fund.'],
      ['wrench', 'Maintenance and repairs', 'We arrange cleaning, lift servicing, lighting and repairs with quotes from vetted contractors.'],
      ['users', 'Owners’ meetings', 'We convene and run general meetings and prepare the notices and minutes.'],
      ['chat', 'Communication', 'One place for notices, reports and documents – online, by e-mail and on the notice board.'],
      ['phone', '24/7 emergencies', 'A round-the-clock line for leaks, power failures and stuck lifts.'],
    ],
    stepsTitle: 'How to switch to us',
    steps: [
      ['Enquiry', 'Send us the address and the number of units in the building.'],
      ['Visit and quote', 'We inspect the building and send you a written, no-obligation quote.'],
      ['Owners’ decision', 'The general meeting decides to entrust management to us – we help with the notice and minutes.'],
      ['We take over', 'We receive the documents and funds from the previous manager and get to work.'],
    ],
    pricingTitle: 'A clear price per unit',
    pricingText: (from) =>
      `You pay a fixed monthly fee per self-contained unit – from ${from} ${vatPhrase('en')}. No hidden fees.`,
    pricingLink: 'Compare plans',
    faqTitle: 'Frequently asked questions',
    faq: [
      [
        'Is it legal for a company to manage the building instead of a house manager?',
        'Yes. The Condominium Management Act allows the general meeting to entrust the functions of the management board (manager) to a natural or legal person under a written contract.',
      ],
      [
        'How do the owners decide to hire you?',
        'By a decision of the general meeting that meets the Act’s requirements for notice, quorum and majority. We provide template notices, agendas and minutes.',
      ],
      [
        'Where does the building’s money go?',
        'The condominium’s funds are kept separate from ours and reported item by item. Every owner can see income and expenses online.',
      ],
      [
        'Can we terminate the contract?',
        'Yes. The general meeting can terminate the contract with the notice period set out in it. On termination we hand over all documents and the remaining funds.',
      ],
      [
        'What happens to the previous house manager’s documents?',
        'We receive the condominium register, minutes, contracts and funds against a signed handover record.',
      ],
    ],
    finalTitle: 'Ready for a stress-free building?',
    finalText: 'Send an enquiry and we will call you back within one business day.',
  },
};

function render(lang) {
  const c = content[lang];
  const from = price(Math.min(...site.pricing.plans.map((p) => p.price)), lang);
  const cta = lang === 'bg' ? 'Поискайте оферта' : 'Request a quote';
  return {
    title: c.title,
    description: c.description,
    body: `
      <section class="hero">
        <div class="container hero-inner">
          <div class="hero-copy">
            <p class="eyebrow">${c.eyebrow}</p>
            <h1>${c.h1}</h1>
            <p class="lead">${c.lead}</p>
            <div class="button-row">
              <a class="button button-large" href="${href(lang, 'contact')}#zapitvane">${cta}</a>
              <a class="button button-large button-outline" href="${href(lang, 'pricing')}">${c.ctaSecondary}</a>
            </div>
          </div>
          <ul class="trust-list">
            ${c.trust.map((x) => `<li>${icon('check')}<span>${x}</span></li>`).join('')}
          </ul>
        </div>
      </section>

      <section class="section" aria-labelledby="features-title">
        <div class="container">
          <h2 id="features-title" class="section-title">${c.featuresTitle}</h2>
          <ul class="card-grid">
            ${c.features
              .map(
                ([ic, h, p]) => `<li class="card">${icon(ic, 'icon icon-large')}<h3>${h}</h3><p>${p}</p></li>`,
              )
              .join('')}
          </ul>
        </div>
      </section>

      <section class="section section-alt" aria-labelledby="steps-title">
        <div class="container">
          <h2 id="steps-title" class="section-title">${c.stepsTitle}</h2>
          <ol class="steps">
            ${c.steps.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join('')}
          </ol>
        </div>
      </section>

      <section class="section" aria-labelledby="pricing-teaser-title">
        <div class="container narrow center">
          <h2 id="pricing-teaser-title" class="section-title">${c.pricingTitle}</h2>
          <p class="lead">${c.pricingText(from)}</p>
          <p><a class="button button-outline" href="${href(lang, 'pricing')}">${c.pricingLink}</a></p>
        </div>
      </section>

      <section class="section section-alt" aria-labelledby="faq-title">
        <div class="container narrow">
          <h2 id="faq-title" class="section-title">${c.faqTitle}</h2>
          <div class="faq">
            ${c.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}
          </div>
        </div>
      </section>

      <section class="section cta-band" aria-labelledby="final-cta">
        <div class="container narrow center">
          <h2 id="final-cta">${c.finalTitle}</h2>
          <p>${c.finalText}</p>
          <p><a class="button button-large button-inverse" href="${href(lang, 'contact')}#zapitvane">${cta}</a></p>
        </div>
      </section>`,
  };
}

export default { key: 'home', render };
