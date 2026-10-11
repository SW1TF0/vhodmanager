import { site } from '../config.mjs';
import { legalPage } from '../components.mjs';
import { esc, formatDate, telHref, telText } from '../util.mjs';

const c = site.company;

function sections(lang) {
  const date = formatDate(site.legalUpdated, lang);
  const contact = `<ul>
            <li>${lang === 'bg' ? 'Имейл' : 'E-mail'}: <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></li>
            <li>${lang === 'bg' ? 'Телефон' : 'Phone'}: <a href="${telHref(c.phone)}">${esc(telText(c.phone))}</a></li>
            <li>${lang === 'bg' ? 'Адрес' : 'Address'}: ${esc(c.officeAddress)}</li>
          </ul>`;
  if (lang === 'bg') {
    return [
      {
        title: 'Нашият ангажимент',
        body: '<p>Искаме сайтът и услугите ни да могат да се ползват от всички, включително от хора с увреждания и възрастни хора. Сайтът е разработен според Насоките за достъпност на уеб съдържание (WCAG) 2.1, ниво AA, и хармонизирания европейски стандарт EN 301 549, в съответствие с изискванията на Директива (ЕС) 2019/882 (Европейски акт за достъпност) и българското законодателство, което я въвежда.</p>',
      },
      {
        title: 'Степен на съответствие',
        body: '<p>Сайтът <strong>съответства в голяма степен</strong> на WCAG 2.1, ниво AA. Ограниченията са описани по-долу.</p>',
      },
      {
        title: 'Какво сме направили',
        body: `<ul>
            <li>Семантична структура със заглавия, ориентири и връзка за прескачане към основното съдържание.</li>
            <li>Пълно управление от клавиатурата с ясно видим фокус.</li>
            <li>Цветов контраст поне 4,5:1 за текста и 3:1 за елементите на интерфейса.</li>
            <li>Текстът може да се увеличи до 200% и съдържанието се пренарежда на тесни екрани без хоризонтално превъртане.</li>
            <li>Формуляри с видими етикети, подсказки, автоматично попълване и ясни съобщения за грешки.</li>
            <li>Уважаваме настройката „намалено движение“ на операционната система.</li>
            <li>Езикът на всяка страница и на чуждоезичните фрагменти е указан, за да ги чете правилно екранният четец.</li>
            <li>Автоматизирани проверки с axe-core при всяка промяна на сайта и ръчна проверка с клавиатура и екранен четец.</li>
          </ul>`,
      },
      {
        title: 'Известни ограничения',
        body: '<ul><li>Картата на страницата „Контакти“ се предоставя от OpenStreetMap и не е напълно достъпна за екранни четци. Адресът на офиса е посочен и като текст на същата страница.</li></ul>',
      },
      {
        title: 'Достъпност на услугите',
        body: '<p>Ако ви е трудно да ползвате някоя от услугите ни – например онлайн отчетите, общите събрания или документите – ще ви ги предоставим в подходящ формат (едър шрифт, телефонно обяснение, лично посещение) без допълнително заплащане.</p>',
      },
      {
        title: 'Обратна връзка и контакт',
        body: `<p>Ако срещнете проблем с достъпността или се нуждаете от съдържанието в друг формат, свържете се с нас. Отговаряме в срок до 14 дни.</p>${contact}`,
      },
      {
        title: 'Процедура по прилагане',
        body: '<p>Ако не сте удовлетворени от отговора ни, можете да подадете сигнал до Комисията за защита на потребителите (<a href="https://kzp.bg/" rel="noopener">kzp.bg</a>), която осъществява надзор за спазване на изискванията за достъпност на услугите за потребителите.</p>',
      },
      {
        title: 'Изготвяне на декларацията',
        body: `<p>Декларацията е изготвена на ${date} въз основа на самооценка с автоматизирани и ръчни тестове. Преглеждаме я поне веднъж годишно.</p>`,
      },
    ];
  }
  return [
    {
      title: 'Our commitment',
      body: '<p>We want our website and services to be usable by everyone, including people with disabilities and older people. The site is built to the Web Content Accessibility Guidelines (WCAG) 2.1, level AA, and the harmonised European standard EN 301 549, in line with Directive (EU) 2019/882 (European Accessibility Act) and the Bulgarian legislation implementing it.</p>',
    },
    {
      title: 'Compliance status',
      body: '<p>This site is <strong>largely compliant</strong> with WCAG 2.1 level AA. The limitations are listed below.</p>',
    },
    {
      title: 'What we have done',
      body: `<ul>
            <li>Semantic structure with headings, landmarks and a skip link to the main content.</li>
            <li>Full keyboard operation with a clearly visible focus indicator.</li>
            <li>Colour contrast of at least 4.5:1 for text and 3:1 for interface elements.</li>
            <li>Text can be zoomed to 200% and content reflows on narrow screens without horizontal scrolling.</li>
            <li>Forms with visible labels, hints, autocomplete and clear error messages.</li>
            <li>We respect the operating system’s “reduced motion” setting.</li>
            <li>The language of every page and of foreign-language passages is declared so screen readers pronounce it correctly.</li>
            <li>Automated checks with axe-core on every change and manual testing with a keyboard and screen reader.</li>
          </ul>`,
    },
    {
      title: 'Known limitations',
      body: '<ul><li>The map on the Contact page is provided by OpenStreetMap and is not fully accessible to screen readers. The office address is also given as text on the same page.</li></ul>',
    },
    {
      title: 'Accessibility of our services',
      body: '<p>If you find any of our services hard to use – such as online reports, general meetings or documents – we will provide them in a suitable format (large print, explanation by phone, in-person visit) at no extra cost.</p>',
    },
    {
      title: 'Feedback and contact',
      body: `<p>If you run into an accessibility problem or need content in another format, please contact us. We reply within 14 days.</p>${contact}`,
    },
    {
      title: 'Enforcement procedure',
      body: '<p>If you are not satisfied with our reply, you can report it to the Bulgarian Commission for Consumer Protection (<a href="https://kzp.bg/" rel="noopener">kzp.bg</a>), which supervises compliance with accessibility requirements for consumer services.</p>',
    },
    {
      title: 'Preparation of this statement',
      body: `<p>This statement was prepared on ${date} based on a self-assessment with automated and manual testing. We review it at least once a year.</p>`,
    },
  ];
}

function render(lang) {
  const bg = lang === 'bg';
  const title = bg ? 'Декларация за достъпност' : 'Accessibility statement';
  return {
    title,
    description: bg
      ? 'Декларация за достъпност на сайта и услугите на Вход мениджър съгласно WCAG 2.1 AA и Европейския акт за достъпност.'
      : 'Accessibility statement for the Vhodmanager website and services under WCAG 2.1 AA and the European Accessibility Act.',
    body: legalPage(lang, title, '', sections(lang)),
  };
}

export default { key: 'accessibility', render };
