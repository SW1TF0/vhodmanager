import { site } from './config.mjs';
import { ui } from './ui.mjs';
import { formatDate } from './util.mjs';

export function pageHero(title, intro = '') {
  return `<section class="page-hero">
        <div class="container">
          <h1>${title}</h1>
          ${intro ? `<p class="lead">${intro}</p>` : ''}
        </div>
      </section>`;
}

/** Wraps long-form legal text with a heading, last-updated date and a table of contents. */
export function legalPage(lang, title, intro, sections) {
  const toc = sections
    .map((s, i) => `<li><a href="#s${i + 1}">${s.title}</a></li>`)
    .join('');
  const tocLabel = lang === 'bg' ? 'Съдържание' : 'Contents';
  const body = sections
    .map(
      (s, i) => `<section id="s${i + 1}" aria-labelledby="s${i + 1}-h">
            <h2 id="s${i + 1}-h">${i + 1}. ${s.title}</h2>
            ${s.body}
          </section>`,
    )
    .join('\n');
  return `${pageHero(title, intro)}
      <div class="container prose">
        <p class="small muted">${ui[lang].updated} <time datetime="${site.legalUpdated}">${formatDate(site.legalUpdated, lang)}</time></p>
        <nav class="toc" aria-labelledby="toc-title">
          <h2 id="toc-title" class="toc-title">${tocLabel}</h2>
          <ol>${toc}</ol>
        </nav>
        ${body}
      </div>`;
}

/** A horizontally scrollable, keyboard-focusable wrapper for wide tables. */
export function table(label, inner) {
  return `<section class="table-wrap" aria-label="${label}" tabindex="0"><table>${inner}</table></section>`;
}

// Simple 24×24 line icons (decorative).
const ICONS = {
  doc: '<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
  coins: '<ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/>',
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z"/>',
  shield: '<path d="M12 3 4 6v6c0 4.4 3.4 8.3 8 9 4.6-.7 8-4.6 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 4a3 3 0 0 1 0 6M18 14a6 6 0 0 1 3 6"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
};

export function icon(name, cls = 'icon') {
  return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;
}
