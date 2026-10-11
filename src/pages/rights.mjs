import { site } from '../config.mjs';
import { pageHero } from '../components.mjs';
import { field, formMessages, formOpen, honeypot } from '../forms.mjs';
import { esc, href } from '../util.mjs';

const text = {
  bg: {
    title: 'Вашите права по ОРЗД',
    description: 'Подайте искане за достъп, коригиране, изтриване, преносимост или възражение относно личните ви данни.',
    intro: 'Използвайте формата, за да упражните правата си относно личните данни, които обработваме за вас. Отговаряме безплатно в срок от един месец.',
    formTitle: 'Искане за упражняване на права',
    subject: 'Искане по ОРЗД',
    fields: {
      name: 'Име и фамилия',
      email: 'Имейл за отговор',
      relation: 'Вие сте',
      relationOptions: [
        ['visitor', 'Посетител на сайта / подател на запитване'],
        ['owner', 'Собственик или обитател в управлявана от нас сграда'],
        ['client', 'Представител на клиент (етажна собственост)'],
        ['other', 'Друго'],
      ],
      building: 'Адрес на сградата и обект',
      buildingHint: 'Ако живеете в сграда, която управляваме – помага ни да открием данните ви.',
      request: 'Вид на искането',
      requestOptions: [
        ['access', 'Достъп до данните и копие (чл. 15)'],
        ['rectification', 'Коригиране (чл. 16)'],
        ['erasure', 'Изтриване (чл. 17)'],
        ['restriction', 'Ограничаване на обработването (чл. 18)'],
        ['portability', 'Преносимост (чл. 20)'],
        ['objection', 'Възражение (чл. 21)'],
        ['withdraw', 'Оттегляне на съгласие (чл. 7, пар. 3)'],
      ],
      details: 'Подробности',
      detailsHint: 'Опишете искането си. Не изпращайте копие от лична карта – ако е нужно да потвърдим самоличността ви, ще се свържем с вас.',
    },
    privacy: (link) =>
      `Данните от тази форма използваме само за да обработим искането ви (чл. 6, пар. 1, буква „в“ от ОРЗД). Повече в <a href="${link}">Политиката за поверителност</a>.`,
    submit: 'Изпращане на искането',
    alt: (email) => `Можете да подадете искане и по имейл на <a href="mailto:${email}">${email}</a>, с писмо до адреса ни или лично в офиса.`,
  },
  en: {
    title: 'Your rights under the GDPR',
    description: 'Submit a request for access, rectification, erasure, portability or objection regarding your personal data.',
    intro: 'Use this form to exercise your rights over the personal data we process about you. We reply free of charge within one month.',
    formTitle: 'Data subject request',
    subject: 'GDPR request',
    fields: {
      name: 'Full name',
      email: 'E-mail for our reply',
      relation: 'You are',
      relationOptions: [
        ['visitor', 'A website visitor / enquirer'],
        ['owner', 'An owner or occupant in a building we manage'],
        ['client', 'A client representative (condominium)'],
        ['other', 'Other'],
      ],
      building: 'Building address and unit',
      buildingHint: 'If you live in a building we manage – this helps us find your data.',
      request: 'Type of request',
      requestOptions: [
        ['access', 'Access and a copy of the data (Art. 15)'],
        ['rectification', 'Rectification (Art. 16)'],
        ['erasure', 'Erasure (Art. 17)'],
        ['restriction', 'Restriction of processing (Art. 18)'],
        ['portability', 'Portability (Art. 20)'],
        ['objection', 'Objection (Art. 21)'],
        ['withdraw', 'Withdrawal of consent (Art. 7(3))'],
      ],
      details: 'Details',
      detailsHint: 'Describe your request. Do not send a copy of your ID card – if we need to confirm your identity, we will contact you.',
    },
    privacy: (link) =>
      `We use the data in this form only to handle your request (Art. 6(1)(c) GDPR). More in our <a href="${link}">Privacy policy</a>.`,
    submit: 'Send request',
    alt: (email) => `You can also make a request by e-mail to <a href="mailto:${email}">${email}</a>, by letter to our address or in person at our office.`,
  },
};

function render(lang) {
  const t = text[lang];
  const f = t.fields;
  const to = site.company.privacyEmail;
  return {
    title: t.title,
    description: t.description,
    body: `${pageHero(t.title, t.intro)}
      <section class="section">
        <div class="container narrow">
          <h2 id="rights-form-title">${t.formTitle}</h2>
          ${formOpen({ id: 'rights-form', to, subject: t.subject, labelledby: 'rights-form-title' })}
            ${formMessages(lang)}
            ${field({ name: 'name', label: f.name, required: true, autocomplete: 'name', lang })}
            ${field({ name: 'email', label: f.email, type: 'email', required: true, autocomplete: 'email', lang })}
            ${field({ name: 'relation', label: f.relation, type: 'select', required: true, options: f.relationOptions, lang })}
            ${field({ name: 'building', label: f.building, hint: f.buildingHint, lang })}
            ${field({ name: 'request', label: f.request, type: 'select', required: true, options: f.requestOptions, lang })}
            ${field({ name: 'details', label: f.details, type: 'textarea', required: true, hint: f.detailsHint, lang })}
            ${honeypot(lang)}
            <p class="small">${t.privacy(href(lang, 'privacy'))}</p>
            <button type="submit" class="button button-large">${t.submit}</button>
          </form>
          <p>${t.alt(esc(to))}</p>
        </div>
      </section>`,
  };
}

export default { key: 'rights', render };
