// Finds prices on the page and inserts a "≈ 381 €" badge right after each one.
const SKIP = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION', 'DC-PRICE', 'SVG', 'TITLE']);
let settings, rates, known, local, ratesTime, ratesSource, done = new WeakSet();

// Badge = <dc-price> with a shadow root: page CSS can't reach in, ours can't leak out.
// ponytail: plain attachShadow, not customElements.define (the registry is null in content scripts).
const CSS = `
:host{all:initial;display:inline-block;margin:0 .3em;vertical-align:baseline;font-size:.82em}
.pill{display:inline-flex;align-items:center;gap:.3em;padding:.08em .6em .08em .45em;border-radius:999px;
  font:600 1em/1.45 ui-rounded,"SF Pro Rounded",system-ui,-apple-system,sans-serif;white-space:nowrap;cursor:default;
  color:#7a3b0c;background:linear-gradient(#fff7ec,#ffe8c9);
  box-shadow:inset 0 0 0 1px #f2c287,0 1px 2px rgba(122,59,12,.12);transition:transform .15s,box-shadow .15s}
.pill:hover{transform:translateY(-1px);box-shadow:inset 0 0 0 1px #e9a55c,0 3px 8px rgba(122,59,12,.18)}
.coin{display:inline-grid;place-items:center;width:1.15em;height:1.15em;border-radius:50%;font-size:.8em;
  color:#fff;background:radial-gradient(circle at 35% 30%,#ffc36b,#e8781c)}
:host([dark]) .pill{color:#ffdcae;background:linear-gradient(#4b2b12,#3a200b);box-shadow:inset 0 0 0 1px #8c5a2a}
.card{position:fixed;inset:auto;pointer-events:none;margin:0;padding:12px 14px;min-width:190px;border:0;border-radius:14px;
  font:13px/1.4 system-ui,-apple-system,sans-serif;color:#4a2a10;background:#fffaf3;
  box-shadow:0 10px 30px rgba(90,45,10,.22),inset 0 3px 0 #f0913a}
.from{font-size:12px;color:#9a6a42}
.to{font-size:20px;font-weight:700;color:#c25e10;margin:2px 0 6px}
.meta{font-size:11.5px;color:#9a6a42;border-top:1px dashed #f0d2ae;padding-top:6px}`;

let darkCache = new WeakMap();
function isDark(el) { // light text color => dark background
  if (!darkCache.has(el)) {
    const [r, g, b] = getComputedStyle(el).color.match(/\d+/g).map(Number);
    darkCache.set(el, 0.299 * r + 0.587 * g + 0.114 * b > 160);
  }
  return darkCache.get(el);
}

function badge(p, near) {
  const loc = toLocale(settings.lang);
  const host = document.createElement('dc-price');
  if (near && isDark(near)) host.setAttribute('dark', '');
  const root = host.attachShadow({ mode: 'closed' });
  const value = convert(p.amount, p.currency, settings.target, rates);
  const rate = convert(1, p.currency, settings.target, rates);
  const when = new Date(ratesTime).toLocaleString(loc, { dateStyle: 'short', timeStyle: 'short' });
  root.innerHTML = `<style>${CSS}</style>
    <span class="pill"><span class="coin">≈</span><span></span></span>
    <div class="card" popover="manual"><div class="from"></div><div class="to"></div><div class="meta"></div></div>`;
  const pill = root.querySelector('.pill'), card = root.querySelector('.card');
  pill.lastChild.textContent = formatMoney(value, settings.target, loc);
  card.querySelector('.from').textContent = `${p.amount.toLocaleString(loc)} ${p.currency}`;
  card.querySelector('.to').textContent = '≈ ' + formatMoney(value, settings.target, loc);
  card.querySelector('.meta').textContent =
    `1 ${p.currency} = ${rate.toLocaleString(loc, { maximumSignificantDigits: 4 })} ${settings.target} · ${when} · ${ratesSource}`;
  pill.onmouseenter = () => {
    card.showPopover();
    const r = pill.getBoundingClientRect(), h = card.offsetHeight, w = card.offsetWidth;
    card.style.top = (r.top - h - 8 < 0 ? r.bottom + 8 : r.top - h - 8) + 'px';
    card.style.left = Math.max(8, Math.min(r.left, innerWidth - w - 8)) + 'px';
  };
  pill.onmouseleave = () => card.hidePopover();
  return host;
}

// Currency the page itself declares (schema.org / Open Graph product markup), if any.
function declaredCurrency() {
  const m = document.querySelector('meta[property$="price:currency"], [itemprop="priceCurrency"]');
  const v = m?.getAttribute('content') || m?.textContent;
  if (v?.trim()) return v.trim().toUpperCase();
  for (const s of document.querySelectorAll('script[type="application/ld+json"]')) {
    const x = s.textContent.match(/"priceCurrency"\s*:\s*"([A-Za-z]{3})"/);
    if (x) return x[1].toUpperCase();
  }
  return '';
}

const siteCurrency = () => localCurrency({ host: location.hostname, lang: document.documentElement.lang, declared: declaredCurrency() });

const skipped = el => { for (; el; el = el.parentElement) if (SKIP.has(el.tagName.toUpperCase()) || el.isContentEditable) return true; return false; };
const prices = text => findPrices(text, local, known).filter(p => p.currency !== settings.target);

function processText(node) {
  done.add(node);
  const text = node.nodeValue;
  if (text.length > 3000 || !/\d/.test(text) || skipped(node.parentElement)) return;
  if (node.nextSibling?.tagName === 'DC-PRICE') return;
  for (const p of prices(text).reverse()) { // from the end so earlier indices stay valid
    const rest = node.splitText(p.end);
    done.add(rest);
    rest.before(badge(p, node.parentElement));
  }
}

// Prices split over several tags, e.g. <span>฿</span><span>14,000</span>.
function processSplit(root) {
  const els = [...root.querySelectorAll('*')].filter(el => el.childElementCount && el.textContent.length < 40);
  for (const el of els.reverse()) { // children before parents
    if (el.querySelector('dc-price') || el.nextSibling?.nodeName === 'DC-PRICE' || skipped(el)) continue;
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    const found = prices(text);
    if (found.length === 1 && found[0].index === 0 && found[0].end === text.length) el.after(badge(found[0], el));
  }
}

function scan(root) {
  if (!root.isConnected || skipped(root.nodeType === 1 ? root : root.parentElement)) return;
  if (root.nodeType === 3) { if (!done.has(root)) processText(root); return; }
  if (root.nodeType !== 1) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) if (!done.has(walker.currentNode)) nodes.push(walker.currentNode);
  nodes.forEach(processText);
  processSplit(root);
}

let pending = new Set(), timer;
const observer = new MutationObserver(muts => {
  for (const m of muts) for (const n of m.addedNodes) if (n.nodeName !== 'DC-PRICE') pending.add(n);
  clearTimeout(timer);
  timer = setTimeout(() => { const batch = pending; pending = new Set(); batch.forEach(scan); }, 300);
});

function reset() {
  observer.disconnect();
  document.querySelectorAll('dc-price').forEach(el => el.remove());
  done = new WeakSet();
}

async function start() {
  reset();
  settings = await chrome.storage.sync.get({ target: defaultCurrency(), enabled: true, lang: 'auto' });
  if (!settings.enabled || !document.body) return;
  const r = await chrome.runtime.sendMessage('rates');
  if (r?.error) return console.warn('DirectChange:', r.error);
  ({ rates, time: ratesTime, source: ratesSource } = r);
  known = new Set(Object.keys(rates));
  local = siteCurrency();
  if (!rates[settings.target]) return;
  scan(document.body);
  observer.observe(document.body, { childList: true, subtree: true });
}

// The popup's converter asks which currency this site uses.
chrome.runtime.onMessage.addListener((msg, _s, reply) => { if (msg === 'local') reply(siteCurrency()); });
chrome.storage.onChanged.addListener((_c, area) => { if (area === 'sync') start(); });
start();
