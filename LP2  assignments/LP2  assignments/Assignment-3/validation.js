// Minimal form validator (short & easy to remember)
const form = document.getElementById('regForm');
const cfg = {
  name: { p: /^[a-zA-Z\s]{2,}$/, m: 'Name: letters only' },
  email: { p: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, m: 'Enter a valid email' },
  mobile: { p: /^[6-9]\d{9}$/, m: '10-digit mobile (6-9 start)' },
  event: { p: /.+/, m: 'Please choose an event' },
  terms: { check: true, m: 'Please accept terms' }
};

const $ = id => document.getElementById(id);

function hideAll() {
  Object.keys(cfg).forEach(k => {
    const err = $(k + 'Err');
    const ok = $(k + 'Ok');
    if (err) err.classList.add('hidden');
    if (ok) ok.classList.add('hidden');
    const el = $(k); if (el) el.classList.remove('valid', 'invalid');
  });
}

function validate(k) {
  const conf = cfg[k];
  const el = $(k);
  const err = $(k + 'Err');
  const ok = $(k + 'Ok');
  if (!conf || !el) return true;
  const v = (el.value || '').trim();
  const okState = conf.check ? el.checked : conf.p.test(v);
  el.classList.toggle('valid', okState);
  el.classList.toggle('invalid', !okState);
  if (ok) ok.classList.toggle('hidden', !okState);
  if (err) { err.classList.toggle('hidden', okState); if (!okState) err.textContent = conf.m; }
  return okState;
}

function attach() {
  Object.keys(cfg).forEach(k => {
    const el = $(k); if (!el) return;
    el.addEventListener('input', () => validate(k));
    el.addEventListener('blur', () => validate(k));
    if (k === 'event' || k === 'terms') el.addEventListener('change', () => validate(k));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => { hideAll(); attach(); });
} else { hideAll(); attach(); }

form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = Object.keys(cfg).every(k => validate(k));
  if (!ok) return;
  const msg = $('successMsg');
  const text = $('successText');
  text.innerHTML = `Thank you, <strong>${$('name').value}</strong> — registered for <strong>${$('event').selectedOptions[0].text}</strong>.`;
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 4000);
  form.reset();
  hideAll();
});
