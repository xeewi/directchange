# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

People who read prices in a currency that isn't their own, while they're on the page deciding:

- **Trip planners** booking hotels, flights and activities abroad (the README's lead story: a ¥24,000 ryokan night in Kyoto).
- **Cross-border shoppers** buying from foreign online shops who want the real cost at home.
- **Expats and nomads** living between currencies and reading foreign prices daily.
- **Remote workers and freelancers** reading rates, invoices and SaaS prices in other currencies.

Their job: know what a foreign price means in their own money without leaving the page or opening a calculator.

## Product Purpose

DirectChange is a browser extension that shows every foreign price on a web page in the user's own currency, at today's live rate, as a small pill right after the price. A popup shows the site's currency and converts any amount into it. Success: the user never has to stop and convert a price by hand.

## Positioning

- **Knows the site's currency.** Ambiguous symbols (`$`, `¥`, `kr`, `Rs`) are resolved from the page's product markup, its country domain and its language, not assumed to be USD. Explicit symbols and ISO codes are never reinterpreted.
- **Private.** No account, no tracking. Page text is read locally; the only network requests are anonymous rate fetches.
- **Blends into any page.** The badge lives in a Shadow DOM, adapts to light and dark sites, and can't be broken by the site's CSS.
- **Free and open source.** MIT licensed, no dependencies, no build step, community translations.

## Operating Context

- Used in Chromium browsers (Chrome, Edge, Brave, Arc) while browsing booking sites, shops and other pages with prices.
- Three surfaces: the inline badge (`<dc-price>`, `content.js`), the toolbar popup (`popup.html`/`popup.js`: site-currency banner, quick converter, settings), and the website at `docs/` (landing page and privacy policy, served at https://directchange.xeewi.cool/).
- Store assets live in `store/` (screenshots, promo tiles, promo video, in English and French).

## Capabilities and Constraints

- Live rates from Coinbase's public API, refreshed every 10 minutes, with open.er-api.com (daily) as fallback. 150+ currencies.
- Parses prices as people write them (`¥24,000`, `1.234,56 €`, `MX$2,490`, `USD 45`, `14 000 bahts`), including prices split across HTML tags; handles dynamic pages via `MutationObserver`.
- Settings in `chrome.storage.sync`: badges on/off, reference currency, interface language.
- 36 interface languages, including right-to-left (Arabic, Hebrew, Persian).
- Manifest V3, only `storage` permission plus the two rate APIs.
- No dependencies, no build step; `node test.js` is the only tooling.
- **Free forever.** No paid tier, upsell or premium plan; never design one.
- **Distribution:** Chrome Web Store listing is pending; store CTAs say "coming soon" until it's live. Install from source works today. Firefox and Safari are planned, so copy should not frame the product as permanently Chromium-only.

## Brand Commitments

- Name: **DirectChange**. Tagline: "Every price on the web, in your own currency, at today's live rate."
- Logo/icons in `icons/` (`icon.svg`, PNG sizes 16–128).
- Voice (from README and site): plain, concrete, example-led ("Is that a lot? DirectChange answers right there on the page"). Real prices and real currencies over abstractions.

## Evidence on Hand

- Demo screenshots: `docs/assets/demo.png` (trip wishlist in 6 currencies), `docs/assets/popup.png`.
- Store screenshots and promo tiles in `store/out/`, promo video in `store/video/`.
- Open-source code and tests are the proof of the privacy claim.
- **Absent, never fabricate:** user counts, ratings, reviews, testimonials, press, store badges implying a live listing.

## Product Principles

1. **Answer in place.** The conversion appears where the price is; the user never leaves the page.
2. **Right currency or no claim.** Resolve ambiguity from evidence on the page; when unsure, fall back predictably and let explicit symbols win.
3. **Stay out of the way.** The badge serves the host page; it never competes with or breaks it.
4. **Earn trust by having nothing to hide.** No data collected, no account, open code; say so plainly.
5. **Speak the user's language.** Every surface works in all supported languages, including right-to-left.

## Accessibility & Inclusion

- Full right-to-left support in the popup and any localized surface.
- Badges must stay legible on both light and dark host pages.
