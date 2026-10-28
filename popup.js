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

// Currency of the site in the active tab, as the content script sees it (null on chrome:// pages etc.).
async function siteCurrency() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    return await chrome.tabs.sendMessage(tab.id, 'local', { frameId: 0 });
  } catch { return null; }
}

(async () => {
  const s = await chrome.storage.sync.get({ target: defaultCurrency(), enabled: true, lang: 'auto' });
  const t = await translator(s.lang);
  const loc = toLocale(s.lang);
  document.documentElement.lang = loc ?? chrome.i18n.getUILanguage();
  document.documentElement.dir = s.lang === 'auto' ? chrome.i18n.getMessage('@@bidi_dir') : RTL.includes(s.lang) ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  $('enabled').setAttribute('aria-label', t('enable'));
  $('amount').setAttribute('aria-label', t('amount'));
  $('swap').title = t('swapCurrencies');
  $('swap').setAttribute('aria-label', t('swapCurrencies'));

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

  // Converter: "my currency -> this site's currency" by default, e.g. a 1000 € budget on a Thai site.
  const saved = (await chrome.storage.local.get('conv')).conv ?? { amount: '1000', from: s.target };
  const site = await siteCurrency();
  for (const sel of ['from', 'to']) for (const c of codes) $(sel).add(Object.assign(new Option(c, c), { title: names.of(c) }));
  $('amount').value = saved.amount;
  $('from').value = codes.includes(saved.from) ? saved.from : s.target;
  $('to').value = site && site !== $('from').value && codes.includes(site) ? site
    : saved.to ?? ($('from').value === 'USD' ? 'EUR' : 'USD');
  const update = () => {
    const n = parseNumber($('amount').value.trim() || 'x');
    $('result').textContent = r.rates && Number.isFinite(n)
      ? formatMoney(convert(n, $('from').value, $('to').value, r.rates), $('to').value, loc, 'narrowSymbol') : '—';
    chrome.storage.local.set({ conv: { amount: $('amount').value, from: $('from').value, to: $('to').value } });
  };
  $('amount').oninput = $('from').onchange = $('to').onchange = update;
  $('swap').onclick = () => { [$('from').value, $('to').value] = [$('to').value, $('from').value]; update(); };
  update();
  $('info').textContent = r.error ? t('ratesError', r.error)
    : t('ratesInfo', codes.length, new Date(r.time).toLocaleString(loc, { dateStyle: 'short', timeStyle: 'short' }), r.source);

  $('target').onchange = e => chrome.storage.sync.set({ target: e.target.value });
  $('enabled').onchange = e => chrome.storage.sync.set({ enabled: e.target.checked });
  $('lang').onchange = async e => { await chrome.storage.sync.set({ lang: e.target.value }); location.reload(); };
})();
