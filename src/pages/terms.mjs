import { site } from '../config.mjs';
import { legalPage } from '../components.mjs';
import { esc, href, telText } from '../util.mjs';

const c = site.company;

function trader(lang) {
  const bg = lang === 'bg';
  return `<address>
            <strong>${esc(c.legalName)}</strong><br>
            ${bg ? 'ЕИК' : 'UIC'}: ${esc(c.eik)}${c.vatRegistered ? `, ${bg ? 'ДДС №' : 'VAT No.'} ${esc(c.vatNumber)}` : ''}<br>
            ${bg ? 'Седалище и адрес на управление' : 'Registered office'}: ${esc(c.registeredOffice)}<br>
            ${bg ? 'Адрес за кореспонденция и рекламации' : 'Address for correspondence and complaints'}: ${esc(c.officeAddress)}<br>
            ${bg ? 'Имейл' : 'E-mail'}: <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>, ${bg ? 'телефон' : 'phone'}: ${esc(telText(c.phone))}
          </address>`;
}

const withdrawalForm = {
  bg: `<div class="boxed">
            <h3>Стандартен формуляр за отказ</h3>
            <p class="small">(попълнете и изпратете само ако желаете да се откажете от договора)</p>
            <p>До: ${esc(c.legalName)}, ${esc(c.officeAddress)}, имейл: ${esc(c.email)}</p>
            <p>С настоящото уведомявам/уведомяваме*, че се отказвам/отказваме* от сключения от мен/нас* договор за предоставяне на следната услуга: …</p>
            <p>Поръчан на*/получен на*: …<br>Име на потребителя/ите: …<br>Адрес на потребителя/ите: …<br>Подпис на потребителя/ите (само ако формулярът е на хартия): …<br>Дата: …</p>
            <p class="small">(*) Ненужното се зачертава.</p>
          </div>`,
  en: `<div class="boxed">
            <h3>Model withdrawal form</h3>
            <p class="small">(complete and return this form only if you wish to withdraw from the contract)</p>
            <p>To: ${esc(c.legalName)}, ${esc(c.officeAddress)}, e-mail: ${esc(c.email)}</p>
            <p>I/We* hereby give notice that I/We* withdraw from my/our* contract for the provision of the following service: …</p>
            <p>Ordered on*/received on*: …<br>Name of consumer(s): …<br>Address of consumer(s): …<br>Signature of consumer(s) (only if this form is notified on paper): …<br>Date: …</p>
            <p class="small">(*) Delete as appropriate.</p>
          </div>`,
};

function sections(lang) {
  const privacy = href(lang, 'privacy');
  const pricing = href(lang, 'pricing');
  if (lang === 'bg') {
    return [
      {
        title: 'Предмет',
        body: '<p>Тези общи условия уреждат използването на сайта и отношенията между търговеца и лицата, които ползват сайта или поискат оферта за услугите по професионално управление на етажна собственост. Конкретните права и задължения по управлението се уреждат в индивидуален писмен договор с етажната собственост, който има предимство при противоречие с тези условия.</p>',
      },
      { title: 'Информация за търговеца', body: trader(lang) },
      {
        title: 'Използване на сайта',
        body: '<p>Сайтът е безплатен и достъпен без регистрация. Забранено е да се използва по начин, който нарушава закона, правата на други лица или сигурността на сайта, включително чрез автоматизирано изпращане на запитвания.</p>',
      },
      {
        title: 'Сключване на договор',
        body: `<ol>
            <li>Запитването чрез сайта не е поръчка и не създава задължения за вас.</li>
            <li>След оглед на сградата изпращаме писмена оферта, която съдържа обхвата на услугите, цената, срока и условията за прекратяване.</li>
            <li>Договорът се сключва с етажната собственост, представлявана от лицето, овластено с решение на общото събрание съгласно ЗУЕС. С договора общото събрание възлага на търговеца функциите на управителния съвет (управителя).</li>
            <li>Договорът се сключва в писмена форма – на хартия или с квалифициран електронен подпис. Сайтът не позволява сключване на договор онлайн.</li>
          </ol>`,
      },
      {
        title: 'Цени и плащане',
        body: `<p>Актуалните цени са публикувани на страницата <a href="${pricing}">„Цени“</a> в евро и са крайни. Окончателната цена се посочва в офертата и договора. Възнаграждението се заплаща ежемесечно по банков път въз основа на фактура. Разходите на етажната собственост (консумативи, поддръжка, ремонти) не са включени във възнаграждението и се заплащат от средствата на етажната собственост.</p>`,
      },
      {
        title: 'Задължения на търговеца',
        body: '<p>Търговецът се задължава да изпълнява възложените функции с грижата на добър търговец, в съответствие със ЗУЕС и решенията на общото събрание; да съхранява средствата на етажната собственост отделно от собствените си; да отчита приходите и разходите; и при прекратяване на договора да предаде всички документи и наличните средства на новия управител с приемо-предавателен протокол.</p>',
      },
      {
        title: 'Право на отказ',
        body: `<p>Когато договорът е сключен от разстояние или извън търговския обект с потребител по смисъла на Закона за защита на потребителите, потребителят има право да се откаже от договора в срок от 14 дни от сключването му, без да посочва причина и без да дължи обезщетение.</p>
          <p>За да упражните правото си, уведомете ни с недвусмислено заявление – писмо или имейл на адресите по т. 2. Можете да използвате образеца по-долу, но не сте длъжни. Срокът е спазен, ако изпратите уведомлението преди изтичането му.</p>
          <p>Ако сте поискали изрично изпълнението да започне преди изтичане на срока за отказ, дължите сума, пропорционална на предоставените до момента на отказа услуги. При отказ възстановяваме всички получени плащания не по-късно от 14 дни, със същото платежно средство, освен ако не сте се съгласили с друго.</p>
          ${withdrawalForm.bg}`,
      },
      {
        title: 'Рекламации и жалби',
        body: '<p>Рекламации и жалби можете да подадете писмено на адреса за кореспонденция или по имейл. Отговаряме в срок до 14 дни. Ще получите потвърждение с входящ номер.</p>',
      },
      {
        title: 'Извънсъдебно решаване на спорове',
        body: `<p>Ако не постигнем съгласие, потребителите могат да се обърнат към Общата помирителна комисия към Комисията за защита на потребителите (КЗП) – орган за алтернативно решаване на потребителски спорове:</p>
          <address>Комисия за защита на потребителите, София 1000, пл. „Славейков“ № 4А<br>Уебсайт: <a href="https://kzp.bg/" rel="noopener">kzp.bg</a></address>
          <p>Платформата на ЕС за онлайн решаване на спорове (ОРС) е закрита от 20 юли 2025 г. Информация за органите за алтернативно решаване на спорове в ЕС е достъпна на портала „Вашата Европа“.</p>`,
      },
      {
        title: 'Отговорност',
        body: '<p>Информацията на сайта е с общ характер и не представлява правна консултация. Търговецът отговаря по договора с етажната собственост и по закон. Нищо в тези условия не ограничава правата на потребителите, които не могат да бъдат изключени по закон, нито отговорността за умисъл или груба небрежност.</p>',
      },
      {
        title: 'Интелектуална собственост',
        body: '<p>Текстовете, логото и дизайнът на сайта са собственост на търговеца. Не могат да бъдат копирани с търговска цел без писмено разрешение.</p>',
      },
      {
        title: 'Лични данни',
        body: `<p>Обработването на лични данни е описано в <a href="${privacy}">Политиката за поверителност</a>.</p>`,
      },
      {
        title: 'Приложимо право и спорове',
        body: '<p>Прилага се българското право. Споровете се решават по взаимно съгласие, а при непостигане на такова – от компетентния български съд. Това не лишава потребителите от защитата, която им дават императивните норми на държавата, в която живеят.</p>',
      },
      {
        title: 'Промени в общите условия',
        body: '<p>Можем да изменяме тези условия. Промените не засягат вече сключените договори, освен ако страните не са се съгласили с тях. Датата на последната промяна е посочена в началото.</p>',
      },
    ];
  }
  return [
    {
      title: 'Scope',
      body: '<p>These terms govern the use of this website and the relationship between the trader and people who use the site or request a quote for professional condominium management. The specific rights and obligations of management are set out in an individual written contract with the condominium, which prevails in case of conflict.</p>',
    },
    { title: 'Trader information', body: trader(lang) },
    {
      title: 'Using the website',
      body: '<p>The site is free and requires no registration. You must not use it in a way that breaks the law, infringes others’ rights or compromises the site’s security, including by sending automated enquiries.</p>',
    },
    {
      title: 'How a contract is concluded',
      body: `<ol>
            <li>An enquiry through the site is not an order and creates no obligation for you.</li>
            <li>After inspecting the building we send a written quote setting out the scope of services, price, term and termination conditions.</li>
            <li>The contract is concluded with the condominium, represented by the person authorised by a decision of the general meeting under the Condominium Management Act. Under the contract the general meeting entrusts the trader with the functions of the management board (manager).</li>
            <li>The contract is concluded in writing – on paper or with a qualified electronic signature. Contracts cannot be concluded online through this site.</li>
          </ol>`,
    },
    {
      title: 'Prices and payment',
      body: `<p>Current prices are published on the <a href="${pricing}">Pricing</a> page in euro and are final. The final price is stated in the quote and contract. The fee is paid monthly by bank transfer against an invoice. The condominium’s own costs (utilities, maintenance, repairs) are not included in the fee and are paid from the condominium’s funds.</p>`,
    },
    {
      title: 'Trader’s obligations',
      body: '<p>The trader undertakes to perform the entrusted functions with the care of a prudent trader, in line with the Condominium Management Act and the general meeting’s decisions; to keep the condominium’s funds separate from its own; to report income and expenses; and, on termination, to hand over all documents and remaining funds to the new manager against a signed handover record.</p>',
    },
    {
      title: 'Right of withdrawal',
      body: `<p>Where the contract is concluded at a distance or off-premises with a consumer within the meaning of the Bulgarian Consumer Protection Act, the consumer may withdraw from it within 14 days of its conclusion, without giving any reason and without penalty.</p>
          <p>To exercise this right, send us a clear statement – by letter or e-mail to the addresses in section 2. You may use the model form below, but you do not have to. The deadline is met if you send your notice before it expires.</p>
          <p>If you expressly asked for the service to start during the withdrawal period, you owe an amount proportionate to what was provided until you withdrew. On withdrawal we refund all payments received no later than 14 days, using the same means of payment unless agreed otherwise.</p>
          ${withdrawalForm.en}`,
    },
    {
      title: 'Complaints',
      body: '<p>You can submit complaints in writing to the correspondence address or by e-mail. We reply within 14 days and confirm receipt with a reference number.</p>',
    },
    {
      title: 'Out-of-court dispute resolution',
      body: `<p>If we cannot agree, consumers may refer the dispute to the General Conciliation Commission at the Bulgarian Commission for Consumer Protection (KZP), an alternative dispute resolution body:</p>
          <address>Commission for Consumer Protection, 4A Slaveykov Sq., Sofia 1000, Bulgaria<br>Website: <a href="https://kzp.bg/" rel="noopener">kzp.bg</a></address>
          <p>The EU Online Dispute Resolution (ODR) platform was closed on 20 July 2025. Information on ADR bodies in the EU is available on the Your Europe portal.</p>`,
    },
    {
      title: 'Liability',
      body: '<p>Information on this site is general and is not legal advice. The trader is liable under the contract with the condominium and the law. Nothing in these terms limits consumer rights that cannot be excluded by law, or liability for intent or gross negligence.</p>',
    },
    {
      title: 'Intellectual property',
      body: '<p>The texts, logo and design of this site belong to the trader and may not be copied for commercial purposes without written permission.</p>',
    },
    {
      title: 'Personal data',
      body: `<p>The processing of personal data is described in our <a href="${privacy}">Privacy policy</a>.</p>`,
    },
    {
      title: 'Governing law and disputes',
      body: '<p>Bulgarian law applies. Disputes are settled by mutual agreement or, failing that, by the competent Bulgarian court. This does not deprive consumers of the protection of the mandatory rules of their country of residence. The Bulgarian version of these terms prevails.</p>',
    },
    {
      title: 'Changes to these terms',
      body: '<p>We may amend these terms. Changes do not affect contracts already concluded unless the parties agree. The date of the last change is shown at the top.</p>',
    },
  ];
}

function render(lang) {
  const bg = lang === 'bg';
  const title = bg ? 'Общи условия' : 'Terms and conditions';
  return {
    title,
    description: bg
      ? 'Общи условия за използване на сайта и услугите на Вход мениджър, право на отказ и решаване на спорове.'
      : 'Terms for using the Vhodmanager website and services, right of withdrawal and dispute resolution.',
    body: legalPage(lang, title, '', sections(lang)),
  };
}

export default { key: 'terms', render };
