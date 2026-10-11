(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* Mobile navigation */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute('aria-expanded', String(open));
      nav.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* Forms: accessible validation, then submit to the configured endpoint or via e-mail. */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function labelText(field) {
    var label = document.querySelector('label[for="' + field.id + '"]');
    if (!label) return field.name;
    var clone = label.cloneNode(true);
    var optional = clone.querySelector('.optional');
    if (optional) optional.remove();
    return clone.textContent.trim();
  }

  function setError(field, message) {
    var error = document.getElementById(field.id + '-error');
    if (message) {
      field.setAttribute('aria-invalid', 'true');
      if (error) {
        error.textContent = message;
        error.hidden = false;
      }
    } else {
      field.removeAttribute('aria-invalid');
      if (error) {
        error.textContent = '';
        error.hidden = true;
      }
    }
  }

  function validate(form, status) {
    var problems = [];
    var fields = form.querySelectorAll('input:not([type="checkbox"]):not([name="website"]), select, textarea');
    Array.prototype.forEach.call(fields, function (field) {
      var value = field.value.trim();
      var message = '';
      if (field.required && !value) message = status.getAttribute('data-required');
      else if (field.type === 'email' && value && !EMAIL.test(value)) message = status.getAttribute('data-email');
      setError(field, message);
      if (message) problems.push({ field: field, message: message });
    });
    return problems;
  }

  function showSummary(form, problems) {
    var box = form.querySelector('.form-errors');
    if (!box) return;
    if (!problems.length) {
      box.hidden = true;
      box.innerHTML = '';
      return;
    }
    var heading = document.createElement('h3');
    heading.textContent = box.getAttribute('data-title');
    var list = document.createElement('ul');
    problems.forEach(function (p) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + p.field.id;
      a.textContent = labelText(p.field) + ': ' + p.message;
      a.addEventListener('click', function (event) {
        event.preventDefault();
        p.field.focus();
      });
      li.appendChild(a);
      list.appendChild(li);
    });
    box.innerHTML = '';
    box.appendChild(heading);
    box.appendChild(list);
    box.hidden = false;
    box.focus();
  }

  function setStatus(status, text, kind, linkEmail) {
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
    status.textContent = text;
    if (linkEmail) {
      var a = document.createElement('a');
      a.href = 'mailto:' + linkEmail;
      a.textContent = linkEmail;
      status.appendChild(document.createTextNode(' '));
      status.appendChild(a);
      status.appendChild(document.createTextNode('.'));
    }
  }

  function summary(form) {
    var lines = [];
    var fields = form.querySelectorAll('input:not([name="website"]), select, textarea');
    Array.prototype.forEach.call(fields, function (field) {
      var value = field.tagName === 'SELECT' && field.selectedIndex > 0 ? field.options[field.selectedIndex].text : field.value.trim();
      if (value) lines.push(labelText(field) + ': ' + value);
    });
    return lines.join('\n');
  }

  Array.prototype.forEach.call(document.querySelectorAll('form.form'), function (form) {
    var status = form.querySelector('.form-status');
    if (!status) return;
    form.noValidate = true;
    var mailto = form.getAttribute('data-mailto');
    var usesEndpoint = form.getAttribute('action').indexOf('mailto:') !== 0;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var problems = validate(form, status);
      showSummary(form, problems);
      if (problems.length) return;

      var trap = form.querySelector('[name="website"]');
      if (trap && trap.value) return; // Bot – silently ignore.

      if (!usesEndpoint) {
        var url =
          'mailto:' + mailto +
          '?subject=' + encodeURIComponent(form.getAttribute('data-subject')) +
          '&body=' + encodeURIComponent(summary(form));
        setStatus(status, status.getAttribute('data-mailto-text'), '', mailto);
        window.location.href = url;
        return;
      }

      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      setStatus(status, status.getAttribute('data-sending'));
      var data = new FormData(form);
      data.append('_subject', form.getAttribute('data-subject'));
      data.append('_page', window.location.pathname);
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (response) {
          if (!response.ok) throw new Error(String(response.status));
          form.reset();
          setStatus(status, status.getAttribute('data-sent'), 'success');
        })
        .catch(function () {
          setStatus(status, status.getAttribute('data-failed'), 'error', mailto);
        })
        .then(function () {
          if (button) button.disabled = false;
        });
    });
  });
})();
