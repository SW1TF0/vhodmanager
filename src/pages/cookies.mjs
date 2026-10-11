import { legalPage, table } from '../components.mjs';
import { href } from '../util.mjs';

function storageTable(lang) {
  const bg = lang === 'bg';
  const h = bg
    ? ['Име', 'Доставчик', 'Тип', 'Категория', 'Цел', 'Срок']
    : ['Name', 'Provider', 'Type', 'Category', 'Purpose', 'Duration'];
  const rows = bg
    ? [
        ['vm_consent', 'Вход мениджър (собствена)', 'Локално хранилище (localStorage)', 'Технически необходими', 'Запомня избора ви за бисквитките и външното съдържание', '12 месеца, след което питаме отново'],
        ['Бисквитки на OpenStreetMap', 'OpenStreetMap Foundation (Обединено кралство)', 'Бисквитки на трета страна', 'Външно съдържание', 'Показване на картата на страницата „Контакти“. Задават се само ако заредите картата', 'Според политиката на OpenStreetMap'],
      ]
    : [
        ['vm_consent', 'Vhodmanager (first party)', 'Local storage', 'Strictly necessary', 'Remembers your choice about cookies and external content', '12 months, then we ask again'],
        ['OpenStreetMap cookies', 'OpenStreetMap Foundation (United Kingdom)', 'Third-party cookies', 'External content', 'Displaying the map on the Contact page. Only set if you load the map', 'Per the OpenStreetMap policy'],
      ];
  const label = bg ? 'Използвани бисквитки и хранилища' : 'Cookies and storage we use';
  return table(
    label,
    `<caption>${label}</caption><thead><tr>${h.map((x) => `<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows
      .map(([n, ...rest]) => `<tr><th scope="row"><code>${n}</code></th>${rest.map((x) => `<td>${x}</td>`).join('')}</tr>`)
      .join('')}</tbody>`,
  );
}

function sections(lang) {
  const bg = lang === 'bg';
  const privacy = href(lang, 'privacy');
  const settingsBtn = `<button type="button" class="button" data-consent-open>${bg ? 'Отворете настройките на бисквитките' : 'Open cookie settings'}</button>`;
  if (bg) {
    return [
      {
        title: 'Какво са бисквитките',
        body: '<p>Бисквитките са малки текстови файлове, които сайтът записва в браузъра ви. Подобни технологии са локалното хранилище (localStorage) и вградено съдържание от други сайтове. Съгласно чл. 4а от Закона за електронните съобщения и Директива 2002/58/ЕО можем да съхраняваме или достъпваме информация на устройството ви без съгласие само ако това е строго необходимо за услугата, която сте поискали. За всичко останало искаме изричното ви съгласие предварително.</p>',
      },
      {
        title: 'Какво използваме',
        body: `<p>Сайтът <strong>не използва</strong> рекламни, аналитични или проследяващи бисквитки, не зарежда шрифтове, скриптове или пиксели от трети страни и не ви профилира.</p>${storageTable(lang)}`,
      },
      {
        title: 'Външно съдържание',
        body: '<p>Картата на страницата „Контакти“ се предоставя от OpenStreetMap. Тя не се зарежда, докато не я поискате изрично или не разрешите категорията „Външно съдържание“. При зареждането OpenStreetMap Foundation получава IP адреса ви и техническа информация за браузъра. Предаването към Обединеното кралство се основава на решението на Европейската комисия за адекватно ниво на защита. Повече: <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" rel="noopener" lang="en">Privacy Policy на OpenStreetMap Foundation</a>.</p>',
      },
      {
        title: 'Как да дадете или оттеглите съгласие',
        body: `<p>При първото посещение ви питаме дали разрешавате незадължителните категории. Бутоните „Приемам“ и „Отказвам“ са еднакво видими, а всички незадължителни категории са изключени по подразбиране. Оттеглянето на съгласието е толкова лесно, колкото и даването му – по всяко време чрез връзката „Настройки на бисквитките“ в долната част на всяка страница или от бутона тук:</p><p>${settingsBtn}</p><p>Можете също да изтриете бисквитките и данните на сайта от настройките на браузъра си.</p>`,
      },
      {
        title: 'Повече информация',
        body: `<p>Как обработваме личните данни, какви са правата ви и как да се свържете с нас, е описано в <a href="${privacy}">Политиката за поверителност</a>.</p>`,
      },
    ];
  }
  return [
    {
      title: 'What cookies are',
      body: '<p>Cookies are small text files a website stores in your browser. Similar technologies include local storage and content embedded from other sites. Under Directive 2002/58/EC (ePrivacy) and Art. 4a of the Bulgarian Electronic Communications Act, we may store or access information on your device without consent only where strictly necessary for the service you requested. For anything else we ask for your explicit consent first.</p>',
    },
    {
      title: 'What we use',
      body: `<p>This site uses <strong>no</strong> advertising, analytics or tracking cookies, loads no third-party fonts, scripts or pixels, and does not profile you.</p>${storageTable(lang)}`,
    },
    {
      title: 'External content',
      body: '<p>The map on the Contact page is provided by OpenStreetMap. It does not load until you explicitly ask for it or allow the “External content” category. When it loads, the OpenStreetMap Foundation receives your IP address and technical browser information. The transfer to the United Kingdom relies on the European Commission’s adequacy decision. More: <a href="https://wiki.osmfoundation.org/wiki/Privacy_Policy" rel="noopener">OpenStreetMap Foundation Privacy Policy</a>.</p>',
    },
    {
      title: 'How to give or withdraw consent',
      body: `<p>On your first visit we ask whether you allow the optional categories. The “Accept” and “Reject” buttons are equally prominent and all optional categories are off by default. Withdrawing consent is as easy as giving it – at any time via the “Cookie settings” link at the bottom of every page or the button here:</p><p>${settingsBtn}</p><p>You can also delete cookies and site data in your browser settings.</p>`,
    },
    {
      title: 'More information',
      body: `<p>How we process personal data, your rights and how to contact us are described in our <a href="${privacy}">Privacy policy</a>. The Bulgarian version of this policy prevails.</p>`,
    },
  ];
}

function render(lang) {
  const bg = lang === 'bg';
  const title = bg ? 'Политика за бисквитките' : 'Cookie policy';
  return {
    title,
    description: bg
      ? 'Кои бисквитки и технологии използва сайтът на Вход мениджър и как да управлявате съгласието си.'
      : 'Which cookies and technologies the Vhodmanager website uses and how to manage your consent.',
    body: legalPage(
      lang,
      title,
      bg ? 'Кратко: не ви следим. Подробности по-долу.' : 'In short: we do not track you. Details below.',
      sections(lang),
    ),
  };
}

export default { key: 'cookies', render };
