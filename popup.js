const $ = id => document.getElementById(id);
// = folders in _locales/ (test.js checks they match)
const LANGS = ['ar', 'bg', 'bn', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'fa', 'fi', 'fr', 'he', 'hi', 'hu', 'id', 'it',
  'ja', 'ko', 'ms', 'nl', 'no', 'pl', 'pt_BR', 'pt_PT', 'ro', 'ru', 'sk', 'sv', 'th', 'tr', 'uk', 'vi', 'zh_CN', 'zh_TW'];
const RTL = ['ar', 'he', 'fa'];

// chrome.i18n always follows the browser, so a chosen language loads its messages.json directly.
async function translator(lang) {
  if (lang === 'auto') return (key, ...args) => chrome.i18n.getMessage(key, args.map(String));
  const msgs = await (await fetch(`_locales/${lang}/messages.json`)).json();
  return (key, ...args) => {
    let s = msgs[key]?.message ?? '';
    for (const [name, ph] of Object.entries(msgs[key]?.placeholders ?? {}))
      s = s.replaceAll(`$${name.toUpperCase()}$`, ph.content.replace(/\$(\d)/g, (_, i) => args[i - 1]));
    return s;
  };
}

(async () => {
  const s = await chrome.storage.sync.get({ target: defaultCurrency(), enabled: true, lang: 'auto' });
  const t = await translator(s.lang);
  const loc = toLocale(s.lang);
  document.documentElement.lang = loc ?? chrome.i18n.getUILanguage();
  document.documentElement.dir = s.lang === 'auto' ? chrome.i18n.getMessage('@@bidi_dir') : RTL.includes(s.lang) ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $('enabled').setAttribute('aria-label', t('enable'));

  $('lang').add(new Option(t('languageAuto'), 'auto'));
  LANGS.map(l => { // each language in its own name: "English", "Français", "日本語"...
    const name = new Intl.DisplayNames([toLocale(l)], { type: 'language' }).of(toLocale(l));
    return [name[0].toUpperCase() + name.slice(1), l];
  }).sort(([a], [b]) => a.localeCompare(b)).forEach(([name, l]) => $('lang').add(new Option(name, l)));
  $('lang').value = s.lang;

  const r = await chrome.runtime.sendMessage('rates');
  const names = new Intl.DisplayNames([loc ?? navigator.language], { type: 'currency' });
  const codes = Object.keys(r.rates ?? { EUR: 1 }).sort();
  for (const c of codes) $('target').add(new Option(`${c} — ${names.of(c)}`, c, false, c === s.target));
  $('enabled').checked = s.enabled;
  $('info').textContent = r.error ? t('ratesError', r.error)
    : t('ratesInfo', codes.length, new Date(r.time).toLocaleString(loc, { dateStyle: 'short', timeStyle: 'short' }), r.source);

  $('target').onchange = e => chrome.storage.sync.set({ target: e.target.value });
  $('enabled').onchange = e => chrome.storage.sync.set({ enabled: e.target.checked });
  $('lang').onchange = async e => { await chrome.storage.sync.set({ lang: e.target.value }); location.reload(); };
})();
