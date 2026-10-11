import { site } from '../config.mjs';
import { pageHero } from '../components.mjs';
import { field, formMessages, formOpen, honeypot } from '../forms.mjs';
import { ui } from '../ui.mjs';
import { esc, href, telHref, telText } from '../util.mjs';

const text = {
  bg: {
    title: 'Контакти',
    description: 'Свържете се с Вход мениджър за оферта за управление на вашата етажна собственост.',
    intro: 'Изпратете запитване и ще получите писмена оферта без ангажимент.',
    formTitle: 'Запитване за оферта',
    subject: 'Запитване за оферта от сайта',
    fields: {
      name: 'Име и фамилия',
      email: 'Имейл',
      phone: 'Телефон',
      address: 'Адрес на сградата',
      addressHint: 'Град, квартал, улица и номер, вход.',
      units: 'Брой самостоятелни обекти',
      message: 'Съобщение',
    },
    privacy: (link) =>
      `Ще използваме данните ви само за да отговорим на запитването и да ви изпратим оферта (чл. 6, пар. 1, буква „б“ от ОРЗД). Пазим ги до 12 месеца, ако не сключим договор. Повече в <a href="${link}">Политиката за поверителност</a>.`,
    submit: 'Изпращане на запитването',
    infoTitle: 'Данни за контакт',
    office: 'Офис',
    phone: 'Телефон',
    email: 'Имейл',
    emergency: 'Аварийна линия (24/7)',
    hours: 'Работно време',
    mapTitle: 'Как да ни намерите',
  },
  en: {
    title: 'Contact',
    description: 'Contact Vhodmanager for a quote for managing your condominium.',
    intro: 'Send us an enquiry and you will receive a written, no-obligation quote.',
    formTitle: 'Request a quote',
    subject: 'Quote request from the website',
    fields: {
      name: 'Full name',
      email: 'E-mail',
      phone: 'Phone',
      address: 'Building address',
      addressHint: 'City, district, street and number, entrance.',
      units: 'Number of self-contained units',
      message: 'Message',
    },
    privacy: (link) =>
      `We will only use your data to answer your enquiry and send you a quote (Art. 6(1)(b) GDPR). We keep it for up to 12 months if no contract is concluded. More in our <a href="${link}">Privacy policy</a>.`,
    submit: 'Send enquiry',
    infoTitle: 'Contact details',
    office: 'Office',
    phone: 'Phone',
    email: 'E-mail',
    emergency: 'Emergency line (24/7)',
    hours: 'Opening hours',
    mapTitle: 'How to find us',
  },
};

export function mapBlock(lang) {
  const m = ui[lang].map;
  const { lat, lon } = site.map;
  const d = 0.006;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d}%2C${lat - d / 2}%2C${lon + d}%2C${lat + d / 2}&layer=mapnik&marker=${lat}%2C${lon}`;
  return `<div class="map" data-consent-embed="external" data-src="${esc(src)}" data-title="${esc(m.title)}">
            <div class="map-placeholder">
              <p>${m.notice}</p>
              <button type="button" class="button" data-map-load>${m.load}</button>
              <label class="check"><input type="checkbox" data-map-remember> ${m.remember}</label>
            </div>
          </div>`;
}

function render(lang) {
  const t = text[lang];
  const f = t.fields;
  const c = site.company;
  return {
    title: t.title,
    description: t.description,
    body: `${pageHero(t.title, t.intro)}
      <section class="section">
        <div class="container contact-grid">
          <div>
            <h2 id="zapitvane" tabindex="-1">${t.formTitle}</h2>
            ${formOpen({ id: 'quote-form', to: c.email, subject: t.subject, labelledby: 'zapitvane' })}
              ${formMessages(lang)}
              ${field({ name: 'name', label: f.name, required: true, autocomplete: 'name', lang })}
              ${field({ name: 'email', label: f.email, type: 'email', required: true, autocomplete: 'email', lang })}
              ${field({ name: 'phone', label: f.phone, type: 'tel', autocomplete: 'tel', lang })}
              ${field({ name: 'address', label: f.address, type: 'textarea', rows: 2, required: true, autocomplete: 'street-address', hint: f.addressHint, lang })}
              ${field({ name: 'units', label: f.units, type: 'number', lang })}
              ${field({ name: 'message', label: f.message, type: 'textarea', lang })}
              ${honeypot(lang)}
              <p class="small">${t.privacy(href(lang, 'privacy'))}</p>
              <button type="submit" class="button button-large">${t.submit}</button>
            </form>
          </div>
          <aside aria-labelledby="contact-info">
            <h2 id="contact-info">${t.infoTitle}</h2>
            <dl class="contact-list">
              <dt>${t.office}</dt><dd>${esc(c.officeAddress)}</dd>
              <dt>${t.phone}</dt><dd><a href="${telHref(c.phone)}">${esc(telText(c.phone))}</a></dd>
              <dt>${t.email}</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd>
              <dt>${t.emergency}</dt><dd><a href="${telHref(c.emergencyPhone)}">${esc(telText(c.emergencyPhone))}</a></dd>
              <dt>${t.hours}</dt><dd>${esc(c.hours[lang])}</dd>
            </dl>
            <h2 id="map-title">${t.mapTitle}</h2>
            ${mapBlock(lang)}
          </aside>
        </div>
      </section>`,
  };
}

export default { key: 'contact', render };
