import { site } from './config.mjs';
import { esc } from './util.mjs';

/**
 * Opening <form> tag. With a configured endpoint the form posts there; otherwise it
 * falls back to the visitor's e-mail program (site.js turns that into a tidy mailto link).
 */
export function formOpen({ id, to, subject, labelledby }) {
  const action = site.formEndpoint || `mailto:${to}`;
  const enctype = site.formEndpoint ? '' : ' enctype="text/plain"';
  return `<form id="${id}" class="form" action="${esc(action)}" method="post"${enctype} data-mailto="${esc(to)}" data-subject="${esc(subject)}" aria-labelledby="${labelledby}">`;
}

export function field({ name, label, type = 'text', required = false, autocomplete, hint, lang, rows, options }) {
  const id = `f-${name}`;
  const req = required ? ' required aria-required="true"' : '';
  const ac = autocomplete ? ` autocomplete="${autocomplete}"` : '';
  const optionalTag = required ? '' : ` <span class="optional">(${lang === 'bg' ? 'по избор' : 'optional'})</span>`;
  const describedby = [hint ? `${id}-hint` : '', `${id}-error`].filter(Boolean).join(' ');
  let control;
  if (type === 'textarea') {
    control = `<textarea id="${id}" name="${name}" rows="${rows || 5}"${ac}${req} aria-describedby="${describedby}"></textarea>`;
  } else if (type === 'select') {
    control = `<select id="${id}" name="${name}"${req} aria-describedby="${describedby}">
              <option value="">${lang === 'bg' ? '– изберете –' : '– choose –'}</option>
              ${options.map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
            </select>`;
  } else {
    const extra = type === 'number' ? ' min="1" inputmode="numeric"' : '';
    control = `<input id="${id}" name="${name}" type="${type}"${ac}${req}${extra} aria-describedby="${describedby}">`;
  }
  return `<div class="field">
            <label for="${id}">${label}${optionalTag}</label>
            ${hint ? `<p class="hint" id="${id}-hint">${hint}</p>` : ''}
            ${control}
            <p class="error" id="${id}-error" hidden></p>
          </div>`;
}

/** Hidden trap field for spam bots (no third-party CAPTCHA, so no extra data sharing). */
export function honeypot(lang) {
  return `<div class="hp" aria-hidden="true">
            <label for="f-website">${lang === 'bg' ? 'Не попълвайте' : 'Leave empty'}</label>
            <input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off">
          </div>`;
}

export function formMessages(lang) {
  const m =
    lang === 'bg'
      ? {
          errors: 'Моля, поправете следните грешки:',
          required: 'Това поле е задължително.',
          email: 'Въведете валиден имейл адрес, напр. ime@primer.bg.',
          sending: 'Изпращане…',
          sent: 'Благодарим ви! Получихме съобщението и ще отговорим възможно най-скоро.',
          mailto: 'Отваряме имейл програмата ви с попълнено съобщение. Ако не се отвори, пишете ни на',
          failed: 'Съобщението не беше изпратено. Опитайте отново или ни пишете на',
        }
      : {
          errors: 'Please correct the following errors:',
          required: 'This field is required.',
          email: 'Enter a valid e-mail address, e.g. name@example.com.',
          sending: 'Sending…',
          sent: 'Thank you! We have received your message and will reply as soon as possible.',
          mailto: 'We are opening your e-mail program with the message filled in. If it does not open, write to us at',
          failed: 'Your message was not sent. Please try again or write to us at',
        };
  return `<div class="form-errors" tabindex="-1" hidden data-title="${esc(m.errors)}"></div>
          <p class="form-status" role="status" aria-live="polite"
            data-required="${esc(m.required)}" data-email="${esc(m.email)}" data-sending="${esc(m.sending)}"
            data-sent="${esc(m.sent)}" data-mailto-text="${esc(m.mailto)}" data-failed="${esc(m.failed)}"></p>`;
}
