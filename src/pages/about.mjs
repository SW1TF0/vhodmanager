import { pageHero } from '../components.mjs';
import { href } from '../util.mjs';

const content = {
  bg: {
    title: 'За нас',
    description: 'Вход мениджър е професионален управител на етажна собственост. Ето как работим и в какво вярваме.',
    intro: 'Вярваме, че никой не трябва да жертва вечерите си, за да бъде домоуправител.',
    sections: [
      [
        'Защо съществуваме',
        [
          'В повечето входове управлението пада върху един доброволец – с тетрадка, плик с пари и много неблагодарна работа. Сметките се бавят, ремонтите се отлагат, а съседите губят доверие един в друг.',
          'Вход мениджър поема тази работа професионално. Действаме като управител на етажната собственост по договор, сключен след решение на общото събрание по ЗУЕС, и носим отговорност за резултата.',
        ],
      ],
      [
        'Как работим',
        [
          '<strong>Прозрачно.</strong> Всеки приход и разход се вижда онлайн, с документ зад него.',
          '<strong>По закон.</strong> Спазваме ЗУЕС, правилата за защита на личните данни и решенията на общото събрание.',
          '<strong>Отговорно.</strong> Всяка сграда има отговорен мениджър, а аварийната линия работи денонощно.',
          '<strong>Справедливо.</strong> Получаваме оферти от няколко изпълнителя и не взимаме комисиони от тях.',
        ],
      ],
      [
        'Кой стои зад нас',
        [
          'Вход мениджър е търговско наименование на дружеството, посочено в <a href="LEGAL">правната информация</a>, където ще намерите и пълните данни за контакт.',
        ],
      ],
    ],
    cta: 'Свържете се с нас',
  },
  en: {
    title: 'About us',
    description: 'Vhodmanager is a professional condominium manager. Here is how we work and what we believe in.',
    intro: 'We believe nobody should have to give up their evenings to be the building’s house manager.',
    sections: [
      [
        'Why we exist',
        [
          'In most Bulgarian buildings, management falls on one volunteer – with a notebook, an envelope of cash and a lot of thankless work. Bills get delayed, repairs get postponed and neighbours lose trust in each other.',
          'Vhodmanager does this work professionally. We act as the condominium’s manager under a contract concluded after a decision of the general meeting under the Condominium Management Act, and we are accountable for the result.',
        ],
      ],
      [
        'How we work',
        [
          '<strong>Transparently.</strong> Every item of income and expense is visible online, with a document behind it.',
          '<strong>By the law.</strong> We follow the Condominium Management Act, data protection rules and the general meeting’s decisions.',
          '<strong>Responsibly.</strong> Every building has a dedicated manager and the emergency line runs around the clock.',
          '<strong>Fairly.</strong> We get quotes from several contractors and take no commissions from them.',
        ],
      ],
      [
        'Who we are',
        [
          'Vhodmanager is a trading name of the company listed in the <a href="LEGAL">legal notice</a>, where you will also find our full contact details.',
        ],
      ],
    ],
    cta: 'Get in touch',
  },
};

function render(lang) {
  const c = content[lang];
  return {
    title: c.title,
    description: c.description,
    body: `${pageHero(c.title, c.intro)}
      <div class="container prose section">
        ${c.sections
          .map(
            ([h, ps], i) => `<section aria-labelledby="about-${i}">
          <h2 id="about-${i}">${h}</h2>
          ${ps.map((p) => `<p>${p.replace('LEGAL', href(lang, 'legal'))}</p>`).join('')}
        </section>`,
          )
          .join('')}
        <p><a class="button" href="${href(lang, 'contact')}">${c.cta}</a></p>
      </div>`,
  };
}

export default { key: 'about', render };
