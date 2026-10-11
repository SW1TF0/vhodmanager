/*
 * Cookie / external-content consent manager.
 *
 * - Nothing optional loads before an explicit opt-in (GDPR Art. 7, ePrivacy Art. 5(3)).
 * - "Accept" and "Reject" are equally prominent; optional categories are off by default.
 * - The choice is stored in localStorage (strictly necessary) for 12 months, then we ask again.
 * - Consent can be changed or withdrawn at any time from the footer link.
 *
 * To gate a new embed, mark it up as
 *   <div data-consent-embed="external" data-src="https://…" data-title="…">placeholder</div>
 */
(function () {
  'use strict';

  var KEY = 'vm_consent';
  var VERSION = 1;
  var MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
  var CATEGORIES = ['external'];

  var state = read();
  var banner = document.getElementById('consent-banner');
  var dialog = document.getElementById('consent-dialog');
  var status = document.getElementById('consent-status');

  function read() {
    try {
      var value = JSON.parse(window.localStorage.getItem(KEY));
      if (!value || value.version !== VERSION || Date.now() - value.date > MAX_AGE_MS) return null;
      return value;
    } catch (e) {
      return null;
    }
  }

  function save(categories) {
    state = { version: VERSION, date: Date.now(), categories: categories };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch (e) {
      /* Storage blocked: the choice applies to this page view only. */
    }
    if (banner) banner.hidden = true;
    apply();
    if (status) {
      status.textContent = '';
      window.setTimeout(function () {
        status.textContent = status.getAttribute('data-saved-text');
      }, 50);
    }
    document.dispatchEvent(new CustomEvent('vm:consentchange', { detail: categories }));
  }

  function allowed(category) {
    return !!(state && state.categories && state.categories[category] === true);
  }

  function all(value) {
    var result = {};
    CATEGORIES.forEach(function (c) {
      result[c] = value;
    });
    return result;
  }

  function loadEmbed(el) {
    if (el.getAttribute('data-loaded') === 'true') return;
    if (!el.hasAttribute('data-placeholder')) el.setAttribute('data-placeholder', el.innerHTML);
    var iframe = document.createElement('iframe');
    iframe.src = el.getAttribute('data-src');
    iframe.title = el.getAttribute('data-title') || '';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer';
    el.innerHTML = '';
    el.appendChild(iframe);
    el.setAttribute('data-loaded', 'true');
  }

  function unloadEmbed(el) {
    if (el.getAttribute('data-loaded') !== 'true') return;
    el.innerHTML = el.getAttribute('data-placeholder') || '';
    el.removeAttribute('data-loaded');
  }

  function apply() {
    var embeds = document.querySelectorAll('[data-consent-embed]');
    Array.prototype.forEach.call(embeds, function (el) {
      if (allowed(el.getAttribute('data-consent-embed'))) loadEmbed(el);
      else unloadEmbed(el);
    });
  }

  function openSettings() {
    if (!dialog) return;
    dialog.returnValue = '';
    CATEGORIES.forEach(function (c) {
      var box = dialog.querySelector('input[name="' + c + '"]');
      if (box) box.checked = allowed(c);
    });
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  document.addEventListener('click', function (event) {
    var target = event.target.closest('button');
    if (!target) return;
    if (target.hasAttribute('data-consent-accept')) save(all(true));
    else if (target.hasAttribute('data-consent-reject')) save(all(false));
    else if (target.hasAttribute('data-consent-open')) openSettings();
    else if (target.hasAttribute('data-map-load')) {
      var embed = target.closest('[data-consent-embed]');
      var remember = embed.querySelector('[data-map-remember]');
      if (remember && remember.checked) {
        var categories = Object.assign(all(false), state ? state.categories : {});
        categories[embed.getAttribute('data-consent-embed')] = true;
        save(categories);
      } else {
        // One-off load for this page view only; nothing is stored.
        loadEmbed(embed);
      }
    }
  });

  if (dialog) {
    dialog.addEventListener('close', function () {
      if (dialog.returnValue !== 'save') return;
      var categories = {};
      CATEGORIES.forEach(function (c) {
        var box = dialog.querySelector('input[name="' + c + '"]');
        categories[c] = !!(box && box.checked);
      });
      save(categories);
    });
  }

  if (!state && banner) banner.hidden = false;
  apply();

  window.vmConsent = { allowed: allowed, open: openSettings };
})();
