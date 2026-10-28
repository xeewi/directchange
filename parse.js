// Price detection + conversion. Pure functions, shared by content.js and test.js.
const SYMBOLS = {
  'US$': 'USD', 'C$': 'CAD', 'CA$': 'CAD', 'A$': 'AUD', 'AU$': 'AUD', 'NZ$': 'NZD', 'HK$': 'HKD', 'S$': 'SGD',
  'NT$': 'TWD', 'MX$': 'MXN', 'R$': 'BRL', '$': 'USD', '€': 'EUR', '£': 'GBP', '¥': 'JPY', '￥': 'JPY',
  '₹': 'INR', '₩': 'KRW', '₫': 'VND', '₱': 'PHP', '฿': 'THB', '₺': 'TRY', '₽': 'RUB', '₪': 'ILS', '₴': 'UAH',
  '₦': 'NGN', '₭': 'LAK', '៛': 'KHR', '₮': 'MNT', '₸': 'KZT', '₾': 'GEL', 'zł': 'PLN', 'Kč': 'CZK', 'Ft': 'HUF',
  'RM': 'MYR', 'Rp': 'IDR', 'Rs': 'INR', 'Rs.': 'INR', 'kr': 'SEK', 'lei': 'RON', 'RMB': 'CNY', 'Fr.': 'CHF',
};
const WORDS = {
  baht: 'THB', bahts: 'THB', euro: 'EUR', euros: 'EUR', dollar: 'USD', dollars: 'USD', yen: 'JPY', yuan: 'CNY',
  rupee: 'INR', rupees: 'INR', roupie: 'INR', roupies: 'INR', dong: 'VND', ringgit: 'MYR', rupiah: 'IDR',
  pound: 'GBP', pounds: 'GBP', livre: 'GBP', livres: 'GBP', franc: 'CHF', francs: 'CHF', dirham: 'AED',
  dirhams: 'AED', lira: 'TRY', peso: 'MXN', pesos: 'MXN', kip: 'LAK', riel: 'KHR', zloty: 'PLN',
};
// Country (ccTLD or ISO region) -> currency. Used to resolve "$", "¥", "kr", "Rs", "dollars", "pesos"...
const COUNTRY = Object.fromEntries(`
at be cy de ee es fi fr gr hr ie it lt lu lv mt nl pt si sk bg ad mc sm va me re gp mq gf yt pm eu:EUR
us ec sv pr:USD ch li:CHF uk gb im je:GBP
ae:AED af:AFN al:ALL am:AMD ao:AOA ar:ARS au:AUD az:AZN ba:BAM bd:BDT bh:BHD bn:BND bo:BOB br:BRL bs:BSD bw:BWP
by:BYN bz:BZD ca:CAD cl:CLP cn:CNY co:COP cr:CRC cv:CVE cz:CZK dk:DKK do:DOP dz:DZD eg:EGP et:ETB fj:FJD ge:GEL
gh:GHS gt:GTQ hk:HKD hn:HNL hu:HUF id:IDR il:ILS in:INR iq:IQD is:ISK jm:JMD jo:JOD jp:JPY ke:KES kg:KGS kh:KHR
kr:KRW kw:KWD kz:KZT la:LAK lb:LBP lk:LKR ly:LYD ma:MAD md:MDL mg:MGA mk:MKD mm:MMK mn:MNT mo:MOP mu:MUR mv:MVR
mw:MWK mx:MXN my:MYR mz:MZN na:NAD ng:NGN ni:NIO no:NOK np:NPR nz:NZD om:OMR pa:PAB pe:PEN pg:PGK ph:PHP pk:PKR
pl:PLN py:PYG qa:QAR ro:RON rs:RSD ru:RUB rw:RWF sa:SAR sd:SDG se:SEK sg:SGD th:THB tn:TND tr:TRY tt:TTD tw:TWD
tz:TZS ua:UAH ug:UGX uy:UYU uz:UZS ve:VES vn:VND za:ZAR zm:ZMW sn ci ml bf ne tg bj:XOF cm ga cg td cf:XAF nc pf:XPF`
  .trim().split(/\s+/).reduce((acc, t) => { // "a b c:CUR" -> a, b, c all map to CUR
    const [cc, cur] = t.split(':'); acc.pending.push(cc);
    if (cur) { acc.pending.forEach(c => acc.out.push([c, cur])); acc.pending = []; }
    return acc;
  }, { pending: [], out: [] }).out);
// ccTLDs mostly used as generic domains (startup.co, app.io...): only trusted as "com.co", "org.ai"...
const HACKED_TLDS = new Set(['co', 'io', 'ai', 'tv', 'me', 'ly', 'to', 'fm', 'sh', 'gg', 'so', 'cc', 'ws', 'la', 'im', 'ac']);

// Best guess of the site's own currency. Order: what the page declares > domain > <html lang="en-CA">.
function localCurrency({ host = '', lang = '', declared = '' } = {}) {
  if (/^[A-Z]{3}$/.test(declared)) return declared;
  const [tld, sld] = host.toLowerCase().split('.').reverse();
  if (COUNTRY[tld] && (!HACKED_TLDS.has(tld) || /^(com|net|org|gov|edu|ac|co)$/.test(sld))) return COUNTRY[tld];
  return COUNTRY[lang.split(/[-_]/)[1]?.toLowerCase()] ?? null;
}

// Until the user picks one: currency of the browser's region (fr-FR -> EUR, en-CA -> CAD), else USD.
const defaultCurrency = (lang = globalThis.navigator?.language ?? '') => COUNTRY[lang.split(/[-_]/)[1]?.toLowerCase()] ?? 'USD';

// UI language setting ('auto' or a _locales folder name) -> BCP 47 locale for Intl.
const toLocale = lang => !lang || lang === 'auto' ? undefined : lang.replace('_', '-');

const EN_NAMES = new Intl.DisplayNames('en', { type: 'currency' });
const narrowCache = {};
const narrow = c => narrowCache[c] ??= new Intl.NumberFormat('en', { style: 'currency', currency: c, currencyDisplay: 'narrowSymbol' })
  .formatToParts(0).find(p => p.type === 'currency').value;

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const cap = w => w[0].toUpperCase() + w.slice(1);
const tokens = [...Object.keys(SYMBOLS), ...Object.keys(WORDS).flatMap(w => [w, cap(w)])]
  .sort((a, b) => b.length - a.length).map(esc);
const CUR = `(?<![A-Za-z])(?:${tokens.join('|')}|[A-Z]{3})(?![A-Za-z])`;
const SP = '[\\s\\u00a0\\u202f\\u2009]';
const NUM = `\\d{1,3}(?:[,.'\\u00a0\\u202f\\u2009 ]\\d{3})+(?:[.,]\\d{1,2})?|\\d+(?:[.,]\\d{1,2})?`;
const RE = new RegExp(`(${CUR})${SP}?(?<![\\d.,])(${NUM})(?!\\d)|(?<![\\d.,])(${NUM})${SP}?(${CUR})`, 'g');

function parseNumber(s) {
  s = s.replace(/[\s   ']/g, '');
  const dot = s.lastIndexOf('.'), comma = s.lastIndexOf(',');
  if (dot >= 0 && comma >= 0) {
    const dec = dot > comma ? '.' : ',';
    return parseFloat(s.split(dec === '.' ? ',' : '.').join('').replace(dec, '.'));
  }
  const sep = dot >= 0 ? '.' : comma >= 0 ? ',' : null;
  if (!sep) return parseFloat(s);
  const parts = s.split(sep);
  // "14,000" / "1.234.567" = thousands; "3,5" / "9.99" = decimals
  return parseFloat(parts.length > 2 || parts.at(-1).length === 3 ? parts.join('') : parts.join('.'));
}

// Generic token -> local currency when it fits: "$" on a .ca site = CAD, "dollars" too; "€" or "C$" never change.
function resolve(token, local) {
  if (token === '￥') token = '¥';
  const word = WORDS[token.toLowerCase()];
  const code = SYMBOLS[token] ?? word ?? token;
  if (local && local !== code && (word
    ? EN_NAMES.of(local).toLowerCase().includes(EN_NAMES.of(word).toLowerCase().split(' ').pop())
    : token.replace(/\.$/, '') === narrow(local))) return local;
  return /^[A-Z]{3}$/.test(code) ? code : null;
}

// -> [{ index, end, amount, currency }]
// `local` = the site's currency (localCurrency()), `known` = Set of codes we have rates for.
function findPrices(text, local = null, known = null) {
  const out = [];
  for (const m of text.matchAll(RE)) {
    const currency = resolve(m[1] ?? m[4], local);
    const amount = parseNumber(m[2] ?? m[3]);
    if (!currency || !(amount > 0) || (known && !known.has(currency))) continue;
    out.push({ index: m.index, end: m.index + m[0].length, amount, currency });
  }
  return out;
}

const convert = (amount, from, to, rates) => amount / rates[from] * rates[to]; // rates are USD-based

function formatMoney(amount, currency, locale, currencyDisplay = 'symbol') {
  const digits = Math.abs(amount) >= 100 ? 0 : 2;
  return new Intl.NumberFormat(locale, {
    style: 'currency', currency, currencyDisplay, minimumFractionDigits: digits, maximumFractionDigits: digits,
  }).format(amount);
}

if (typeof module !== 'undefined') module.exports = { findPrices, localCurrency, defaultCurrency, toLocale, parseNumber, convert, formatMoney };
