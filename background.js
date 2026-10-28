// Fetches USD-based rates, caches them 10 min. Coinbase is near real-time; er-api (daily) is the fallback.
const TTL = 10 * 60 * 1000;
const ISO = new Set(Intl.supportedValuesOf('currency')); // drops the crypto tickers Coinbase mixes in
const SOURCES = [
  { url: 'https://api.coinbase.com/v2/exchange-rates?currency=USD', pick: j => j.data.rates },
  { url: 'https://open.er-api.com/v6/latest/USD', pick: j => j.rates },
];
let inflight = null;

async function fetchRates() {
  for (const s of SOURCES) {
    try {
      const raw = s.pick(await (await fetch(s.url)).json());
      const rates = {};
      for (const [k, v] of Object.entries(raw)) if (ISO.has(k) && +v > 0) rates[k] = +v;
      if (rates.EUR) return { rates, time: Date.now(), source: new URL(s.url).hostname };
    } catch (e) { console.warn('DirectChange: source failed', s.url, e); }
  }
  throw new Error('all rate sources failed');
}

async function getRates() {
  const { cache } = await chrome.storage.local.get('cache');
  if (cache && Date.now() - cache.time < TTL) return cache;
  inflight ??= fetchRates()
    .then(async fresh => { await chrome.storage.local.set({ cache: fresh }); return fresh; })
    .catch(e => { if (cache) return cache; throw e; }) // stale beats nothing
    .finally(() => { inflight = null; });
  return inflight;
}

chrome.runtime.onMessage.addListener((msg, _sender, reply) => {
  if (msg !== 'rates') return;
  getRates().then(reply, e => reply({ error: String(e) }));
  return true;
});
