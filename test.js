// node test.js
const assert = require('assert');
const { findPrices, dominantCurrency, localCurrency, defaultCurrency, parseNumber, convert } = require('./parse.js');
const one = (t, host, lang, declared) => { const p = findPrices(t, localCurrency({ host, lang, declared })); return p.length && [p[0].amount, p[0].currency]; };

assert.deepStrictEqual(one('Prix : 14 000 bahts'), [14000, 'THB']);
assert.deepStrictEqual(one('฿14,000'), [14000, 'THB']);
assert.deepStrictEqual(one('$1,234.56'), [1234.56, 'USD']);
assert.deepStrictEqual(one('1.234,56 €'), [1234.56, 'EUR']);
assert.deepStrictEqual(one('9,99€'), [9.99, 'EUR']);
assert.deepStrictEqual(one('USD 45'), [45, 'USD']);
assert.deepStrictEqual(one('2500 THB'), [2500, 'THB']);
assert.deepStrictEqual(one('C$20'), [20, 'CAD']);
assert.deepStrictEqual(one('$20', 'shop.ca'), [20, 'CAD']);
assert.deepStrictEqual(one('¥500', 'taobao.cn'), [500, 'CNY']);
assert.deepStrictEqual(one('¥500'), [500, 'JPY']);
assert.deepStrictEqual(one('199 kr', 'x.no'), [199, 'NOK']);
assert.strictEqual(findPrices('Chambre 12, 3 nuits, 2024').length, 0);
assert.strictEqual(findPrices('from ฿1,200 to ฿3,500').length, 2);
assert.strictEqual(findPrices('ABC123 hello', '', new Set(['USD', 'EUR'])).length, 0);
assert.strictEqual(parseNumber('1.234.567'), 1234567);
assert.strictEqual(parseNumber('3,5'), 3.5);
assert.strictEqual(convert(100, 'THB', 'EUR', { USD: 1, THB: 36, EUR: 0.9 }), 2.5);
// site location
assert.deepStrictEqual(one('$49.99', 'quigj.ca'), [49.99, 'CAD']);
assert.deepStrictEqual(one('49 dollars', 'quigj.ca'), [49, 'CAD']);
assert.deepStrictEqual(one('€30', 'quigj.ca'), [30, 'EUR']);
assert.deepStrictEqual(one('C$20', 'shop.com.au'), [20, 'CAD']);
assert.deepStrictEqual(one('$20', 'shop.com.au'), [20, 'AUD']);
assert.deepStrictEqual(one('$20', 'www.amazon.co.uk'), [20, 'USD']);
assert.deepStrictEqual(one('£20', 'www.amazon.co.uk'), [20, 'GBP']);
assert.deepStrictEqual(one('$5', 'startup.co'), [5, 'USD']);
assert.deepStrictEqual(one('$5000', 'tienda.com.co'), [5000, 'COP']);
assert.deepStrictEqual(one('$20', 'shop.com', 'en-AU'), [20, 'AUD']);
assert.deepStrictEqual(one('$20', 'shop.com', 'en-US', 'CAD'), [20, 'CAD']);
assert.deepStrictEqual(one('50 pesos', 'tindahan.ph'), [50, 'PHP']);
assert.deepStrictEqual(one('Rs 900', 'daraz.pk'), [900, 'PKR']);
assert.deepStrictEqual(one('199 kr', 'elkjop.dk'), [199, 'DKK']);
assert.deepStrictEqual(one('USD 45', 'quigj.ca'), [45, 'USD']);
assert.strictEqual(defaultCurrency('fr-FR'), 'EUR');
assert.strictEqual(defaultCurrency('en-CA'), 'CAD');
assert.strictEqual(defaultCurrency('en'), 'USD');
// page currency = most frequent among displayed prices
assert.strictEqual(dominantCurrency('Rooms from ฿1,200 · ฿3,500 · free cancel · US$20 tour'), 'THB');
assert.strictEqual(dominantCurrency('$10 · $20 · €5', 'CAD'), 'CAD');
assert.strictEqual(dominantCurrency('no prices here'), null);

// every locale has the same keys/placeholders as English, and the popup lists exactly these folders
const fs = require('fs');
const en = JSON.parse(fs.readFileSync('_locales/en/messages.json'));
const dirs = fs.readdirSync('_locales').sort();
for (const d of dirs) {
  const m = JSON.parse(fs.readFileSync(`_locales/${d}/messages.json`));
  assert.deepStrictEqual(Object.keys(m).sort(), Object.keys(en).sort(), d);
  for (const k in en) for (const p of Object.keys(en[k].placeholders ?? {}))
    assert(m[k].message.includes(`$${p.toUpperCase()}$`), `${d}.${k} misses $${p.toUpperCase()}$`);
}
const langs = eval(fs.readFileSync('popup.js', 'utf8').match(/const LANGS = (\[[\s\S]*?\]);/)[1]);
assert.deepStrictEqual([...langs].sort(), dirs);
console.log('all good');
