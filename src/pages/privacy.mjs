import { site } from '../config.mjs';
import { legalPage, table } from '../components.mjs';
import { esc, href, telText } from '../util.mjs';

const c = site.company;

function controllerBlock(lang) {
  const bg = lang === 'bg';
  const dpo = c.dpo
    ? `${bg ? 'Длъжностно лице по защита на данните' : 'Data protection officer'}: ${esc(c.dpo)}`
    : bg
      ? 'Не сме определили длъжностно лице по защита на данните, тъй като не сме задължени по чл. 37 ОРЗД. За всички въпроси за личните данни пишете на адреса по-долу.'
      : 'We have not appointed a data protection officer, as we are not required to under Art. 37 GDPR. For any data protection question, write to the address below.';
  return `<p>${bg ? 'Администратор на личните данни е' : 'The controller of your personal data is'}:</p>
          <address>
            <strong>${esc(c.legalName)}</strong><br>
            ${bg ? 'ЕИК' : 'UIC'}: ${esc(c.eik)}<br>
            ${bg ? 'Седалище и адрес на управление' : 'Registered office'}: ${esc(c.registeredOffice)}<br>
            ${bg ? 'Имейл за въпроси за личните данни' : 'Data protection e-mail'}: <a href="mailto:${esc(c.privacyEmail)}">${esc(c.privacyEmail)}</a><br>
            ${bg ? 'Телефон' : 'Phone'}: ${esc(telText(c.phone))}
          </address>
          <p>${dpo}</p>`;
}

const kzld = {
  bg: `<address>Комисия за защита на личните данни<br>София 1592, бул. „Проф. Цветан Лазаров“ № 2<br>Уебсайт: <a href="https://www.cpdp.bg/" rel="noopener">www.cpdp.bg</a></address>`,
  en: `<address>Commission for Personal Data Protection (KZLD)<br>2 Prof. Tsvetan Lazarov Blvd., Sofia 1592, Bulgaria<br>Website: <a href="https://www.cpdp.bg/" rel="noopener">www.cpdp.bg</a></address>`,
};

function purposesTable(lang) {
  const bg = lang === 'bg';
  const rows = bg
    ? [
        ['Отговор на запитвания и изготвяне на оферта', 'Имена, имейл, телефон, адрес на сградата, брой обекти, съдържание на съобщението', 'Чл. 6, пар. 1, б. „б“ (стъпки преди сключване на договор); б. „е“ (легитимен интерес да отговорим), когато запитващият не е страна по бъдещия договор', 'До 12 месеца след последната комуникация, ако не бъде сключен договор'],
        ['Сключване и изпълнение на договора с етажната собственост', 'Данни на председателя/членовете на управителния съвет или упълномощените лица; данни от протоколите на общото събрание', 'Чл. 6, пар. 1, б. „б“ и б. „е“ (отношения с представителите на клиента)', 'Срокът на договора и 5 години след прекратяването му (общ давностен срок)'],
        ['Управление на етажната собственост – книга на ЕС, разпределяне на разходи, събиране на вноски, общи събрания', 'Имена на собствениците, ползвателите и обитателите, самостоятелен обект, брой обитатели, домашни любимци (когато са релевантни за разходите), контакти, вноски и задължения', 'Чл. 6, пар. 1, б. „в“ (законови задължения по ЗУЕС) и б. „б“/„е“ (изпълнение на договора с етажната собственост)', 'Докато управляваме сградата. При прекратяване документите се предават на новия управител по реда на ЗУЕС'],
        ['Счетоводство и данъци', 'Данни от фактури, разписки и платежни документи', 'Чл. 6, пар. 1, б. „в“ (Закон за счетоводството, данъчни закони)', 'Сроковете по Закона за счетоводството (до 10 години)'],
        ['Аварийни сигнали и сигнали за нередности', 'Имена, телефон, обект, описание на проблема', 'Чл. 6, пар. 1, б. „е“ (безопасност на сградата и обитателите); б. „г“ при опасност за живота или здравето', 'До 3 години'],
        ['Отговор на искания за упражняване на права по ОРЗД', 'Данните в искането и кореспонденцията', 'Чл. 6, пар. 1, б. „в“ (чл. 12 ОРЗД)', '3 години след приключване на искането'],
        ['Сигурност на сайта', 'IP адрес, дата и час, заявена страница, браузър (сървърни логове)', 'Чл. 6, пар. 1, б. „е“ (защита от злоупотреби)', 'До 30 дни'],
        ['Зареждане на външно съдържание (карта)', 'IP адрес и технически данни, получавани от OpenStreetMap', 'Чл. 6, пар. 1, б. „а“ (съгласие) и чл. 4а от Закона за електронните съобщения', 'Докато не оттеглите съгласието си (изборът се пази до 12 месеца)'],
      ]
    : [
        ['Answering enquiries and preparing quotes', 'Name, e-mail, phone, building address, number of units, message', 'Art. 6(1)(b) (steps prior to entering into a contract); Art. 6(1)(f) (legitimate interest in replying) where the enquirer will not be a party to the contract', 'Up to 12 months after the last contact if no contract is concluded'],
        ['Concluding and performing the contract with the condominium', 'Details of the chair/members of the management board or authorised persons; data from general-meeting minutes', 'Art. 6(1)(b) and (f) (dealing with the client’s representatives)', 'The term of the contract plus 5 years after termination (general limitation period)'],
        ['Managing the condominium – register, cost allocation, collecting contributions, general meetings', 'Names of owners, users and occupants, unit, number of occupants, pets (where relevant to costs), contact details, contributions and arrears', 'Art. 6(1)(c) (legal obligations under the Condominium Management Act) and Art. 6(1)(b)/(f) (performing the contract with the condominium)', 'For as long as we manage the building. On termination the records are handed over to the new manager as the Act requires'],
        ['Accounting and tax', 'Data on invoices, receipts and payment documents', 'Art. 6(1)(c) (Accountancy Act, tax laws)', 'The periods under the Accountancy Act (up to 10 years)'],
        ['Emergency calls and reported issues', 'Name, phone, unit, description of the problem', 'Art. 6(1)(f) (safety of the building and its occupants); Art. 6(1)(d) where life or health is at risk', 'Up to 3 years'],
        ['Handling GDPR rights requests', 'Data in the request and related correspondence', 'Art. 6(1)(c) (Art. 12 GDPR)', '3 years after the request is closed'],
        ['Website security', 'IP address, date and time, requested page, browser (server logs)', 'Art. 6(1)(f) (protection against abuse)', 'Up to 30 days'],
        ['Loading external content (map)', 'IP address and technical data received by OpenStreetMap', 'Art. 6(1)(a) (consent) and Art. 4a of the Bulgarian Electronic Communications Act', 'Until you withdraw consent (your choice is kept for up to 12 months)'],
      ];
  const h = bg
    ? ['Цел', 'Данни', 'Правно основание (ОРЗД)', 'Срок на съхранение']
    : ['Purpose', 'Data', 'Legal basis (GDPR)', 'Retention period'];
  const label = bg ? 'Цели, данни, основания и срокове' : 'Purposes, data, legal bases and retention';
  return table(
    label,
    `<caption>${label}</caption><thead><tr>${h.map((x) => `<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows
      .map(([a, b, cc, d]) => `<tr><th scope="row">${a}</th><td>${b}</td><td>${cc}</td><td>${d}</td></tr>`)
      .join('')}</tbody>`,
  );
}

function sections(lang) {
  const bg = lang === 'bg';
  const rightsLink = href(lang, 'rights');
  const cookiesLink = href(lang, 'cookies');
  if (bg) {
    return [
      { title: 'Кои сме ние', body: controllerBlock(lang) },
      {
        title: 'За кого се отнася тази политика',
        body: `<p>Тази политика обяснява как обработваме личните данни на:</p>
          <ul>
            <li>посетителите на сайта и лицата, които ни изпращат запитване;</li>
            <li>представителите на етажните собствености, с които имаме или обсъждаме договор;</li>
            <li>собствениците, ползвателите и обитателите в сградите, които управляваме;</li>
            <li>изпълнителите и доставчиците, с които работим.</li>
          </ul>
          <p>Когато управляваме етажна собственост, обработваме данните на собствениците и обитателите, за да изпълним задълженията на управителя по Закона за управление на етажната собственост (ЗУЕС) и договора с етажната собственост. Когато действаме само по нареждане на етажната собственост, сключваме с нея договор за обработване на лични данни по чл. 28 ОРЗД.</p>`,
      },
      { title: 'Какви данни обработваме, защо и колко дълго', body: purposesTable(lang) + '<p>Не обработваме специални категории данни (напр. за здравето), освен ако не ни ги предоставите сами при авариен сигнал и това е необходимо за защита на жизненоважни интереси.</p>' },
      {
        title: 'Откъде получаваме данните',
        body: '<p>Повечето данни получаваме директно от вас. Данните на собствениците и обитателите получаваме и от книгата на етажната собственост и документите, предадени ни от досегашния управител, както и от решенията на общото събрание.</p>',
      },
      {
        title: 'Задължително ли е да ни предоставите данни',
        body: '<p>Данните във формата за запитване са необходими, за да ви отговорим. Данните, които ЗУЕС изисква за книгата на етажната собственост, собствениците и обитателите са длъжни да предоставят по закон. Ако не ги предоставите, не можем да изпълним съответното действие.</p>',
      },
      {
        title: 'С кого споделяме данните',
        body: `<p>Не продаваме лични данни. Споделяме ги само когато е необходимо, с:</p>
          <ul>
            <li>обработващи данни, които работят по наше нареждане и по договор по чл. 28 ОРЗД: хостинг (${esc(site.hosting)}), имейл и ИТ услуги, счетоводство;</li>
            <li>банки и платежни институции – за плащанията;</li>
            <li>изпълнители на ремонти и поддръжка – само името и телефона, нужни за достъп до обекта;</li>
            <li>другите собственици в сградата – в обема, който ЗУЕС изисква (напр. отчети пред общото събрание, без да разкриваме повече от необходимото);</li>
            <li>държавни и общински органи, съдилища и съдебни изпълнители – когато законът го изисква;</li>
            <li>новия управител на етажната собственост – при прекратяване на договора.</li>
          </ul>`,
      },
      {
        title: 'Предаване извън ЕС/ЕИП',
        body: '<p>Съхраняваме данните в Европейския съюз. Ако някой наш доставчик предава данни извън ЕИП, това става само при решение на Европейската комисия за адекватно ниво на защита или при подходящи гаранции по чл. 46 ОРЗД (напр. стандартни договорни клаузи). Можете да поискате копие от тези гаранции.</p>',
      },
      {
        title: 'Вашите права',
        body: `<p>Имате право:</p>
          <ul>
            <li>на достъп до данните си и на копие от тях (чл. 15 ОРЗД);</li>
            <li>да поискате коригиране на неточни данни (чл. 16);</li>
            <li>да поискате изтриване („право да бъдеш забравен“), когато няма основание да ги пазим (чл. 17);</li>
            <li>да поискате ограничаване на обработването (чл. 18);</li>
            <li>на преносимост на данните, които сте ни предоставили (чл. 20);</li>
            <li><strong>да възразите по всяко време срещу обработване, основано на легитимен интерес</strong> (чл. 21);</li>
            <li>да оттеглите съгласието си по всяко време, без това да засяга законността на обработването преди оттеглянето (чл. 7, пар. 3).</li>
          </ul>
          <p>Отговаряме безплатно в срок от един месец. При сложни искания срокът може да бъде удължен с още два месеца, за което ще ви уведомим. Може да поискаме да потвърдите самоличността си.</p>
          <p><a class="button" href="${rightsLink}">Подайте искане</a></p>`,
      },
      {
        title: 'Право на жалба',
        body: `<p>Ако смятате, че обработваме данните ви незаконосъобразно, можете да подадете жалба до надзорния орган в държавата, в която живеете или работите, или където е извършено нарушението. В България това е:</p>${kzld.bg}`,
      },
      {
        title: 'Автоматизирани решения и профилиране',
        body: '<p>Не вземаме решения, основани изцяло на автоматизирано обработване, включително профилиране, които да пораждат правни последици за вас.</p>',
      },
      {
        title: 'Бисквитки и външно съдържание',
        body: `<p>Сайтът не използва рекламни или аналитични бисквитки и не зарежда шрифтове или скриптове от трети страни. Подробности ще намерите в <a href="${cookiesLink}">Политиката за бисквитките</a>.</p>`,
      },
      {
        title: 'Сигурност',
        body: '<p>Прилагаме подходящи технически и организационни мерки: криптирана връзка (HTTPS), ограничен достъп до данните само за служителите, които се нуждаят от тях, задължение за поверителност, резервни копия и обучение на персонала. При нарушение на сигурността, което създава риск, ще уведомим КЗЛД в срок до 72 часа и засегнатите лица, когато законът го изисква.</p>',
      },
      {
        title: 'Деца',
        body: '<p>Сайтът не е предназначен за деца под 16 години и не събираме съзнателно техни данни чрез него. Данни за непълнолетни обитатели обработваме само в обема, изискван от ЗУЕС (напр. брой обитатели).</p>',
      },
      {
        title: 'Промени в политиката',
        body: '<p>Можем да актуализираме тази политика. Датата на последната промяна е посочена в началото. При съществени промени ще уведомим клиентите си.</p>',
      },
    ];
  }
  return [
    { title: 'Who we are', body: controllerBlock(lang) },
    {
      title: 'Who this policy applies to',
      body: `<p>This policy explains how we process the personal data of:</p>
          <ul>
            <li>visitors to this website and people who send us an enquiry;</li>
            <li>representatives of condominiums we have, or are discussing, a contract with;</li>
            <li>owners, users and occupants of the buildings we manage;</li>
            <li>contractors and suppliers we work with.</li>
          </ul>
          <p>When we manage a condominium, we process the data of owners and occupants to fulfil the manager’s duties under the Condominium Management Act (ZUES) and our contract with the condominium. Where we act solely on the condominium’s instructions, we sign a data processing agreement with it under Art. 28 GDPR.</p>`,
    },
    { title: 'What data we process, why and for how long', body: purposesTable(lang) + '<p>We do not process special categories of data (e.g. health data) unless you provide it yourself in an emergency call and it is necessary to protect vital interests.</p>' },
    {
      title: 'Where we get the data from',
      body: '<p>We collect most data directly from you. We also obtain owners’ and occupants’ data from the condominium register and documents handed over by the previous manager, and from the general meeting’s decisions.</p>',
    },
    {
      title: 'Do you have to give us your data?',
      body: '<p>The data in the enquiry form is needed for us to reply. Owners and occupants are required by law to provide the data the Condominium Management Act requires for the register. If it is not provided, we cannot carry out the related task.</p>',
    },
    {
      title: 'Who we share data with',
      body: `<p>We never sell personal data. We share it only where necessary, with:</p>
          <ul>
            <li>processors acting on our instructions under an Art. 28 GDPR agreement: hosting (${esc(site.hosting)}), e-mail and IT services, accounting;</li>
            <li>banks and payment institutions – for payments;</li>
            <li>repair and maintenance contractors – only the name and phone number needed to access a unit;</li>
            <li>other owners in the building – to the extent the Act requires (e.g. reports to the general meeting, disclosing no more than necessary);</li>
            <li>public authorities, courts and bailiffs – where required by law;</li>
            <li>the condominium’s new manager – when the contract ends.</li>
          </ul>`,
    },
    {
      title: 'Transfers outside the EU/EEA',
      body: '<p>We store data in the European Union. If a supplier transfers data outside the EEA, it does so only under a European Commission adequacy decision or with appropriate safeguards under Art. 46 GDPR (e.g. standard contractual clauses). You may ask for a copy of these safeguards.</p>',
    },
    {
      title: 'Your rights',
      body: `<p>You have the right to:</p>
          <ul>
            <li>access your data and obtain a copy (Art. 15 GDPR);</li>
            <li>have inaccurate data corrected (Art. 16);</li>
            <li>have your data erased (“right to be forgotten”) where there is no ground to keep it (Art. 17);</li>
            <li>restrict processing (Art. 18);</li>
            <li>data portability for data you gave us (Art. 20);</li>
            <li><strong>object at any time to processing based on legitimate interests</strong> (Art. 21);</li>
            <li>withdraw consent at any time, without affecting the lawfulness of processing before withdrawal (Art. 7(3)).</li>
          </ul>
          <p>We reply free of charge within one month. For complex requests this may be extended by two further months, and we will tell you if so. We may ask you to confirm your identity.</p>
          <p><a class="button" href="${rightsLink}">Make a request</a></p>`,
    },
    {
      title: 'Right to lodge a complaint',
      body: `<p>If you believe we process your data unlawfully, you may complain to the supervisory authority in the country where you live, work or where the infringement took place. In Bulgaria this is:</p>${kzld.en}`,
    },
    {
      title: 'Automated decisions and profiling',
      body: '<p>We do not make decisions based solely on automated processing, including profiling, that produce legal effects for you.</p>',
    },
    {
      title: 'Cookies and external content',
      body: `<p>This site uses no advertising or analytics cookies and loads no third-party fonts or scripts. See our <a href="${cookiesLink}">Cookie policy</a> for details.</p>`,
    },
    {
      title: 'Security',
      body: '<p>We apply appropriate technical and organisational measures: encrypted connections (HTTPS), access limited to staff who need it, confidentiality obligations, backups and staff training. If a personal data breach creates a risk, we notify the KZLD within 72 hours and inform affected people where the law requires.</p>',
    },
    {
      title: 'Children',
      body: '<p>This site is not intended for children under 16 and we do not knowingly collect their data through it. We process data about minor occupants only to the extent the Condominium Management Act requires (e.g. number of occupants).</p>',
    },
    {
      title: 'Changes to this policy',
      body: '<p>We may update this policy. The date of the last change is shown at the top. We will notify our clients of material changes. The Bulgarian version of this policy prevails.</p>',
    },
  ];
}

function render(lang) {
  const bg = lang === 'bg';
  const title = bg ? 'Политика за поверителност' : 'Privacy policy';
  return {
    title,
    description: bg
      ? 'Как Вход мениджър обработва и защитава личните данни съгласно ОРЗД (GDPR).'
      : 'How Vhodmanager processes and protects personal data under the GDPR.',
    body: legalPage(
      lang,
      title,
      bg
        ? 'Информация по чл. 13 и 14 от Регламент (ЕС) 2016/679 (ОРЗД).'
        : 'Information under Articles 13 and 14 of Regulation (EU) 2016/679 (GDPR).',
      sections(lang),
    ),
  };
}

export default { key: 'privacy', render };
