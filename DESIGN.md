---
name: DirectChange
description: Every price on the web, in your own currency, at today's live rate.
colors:
  marigold-rate: "#e0701c"
  roasted-ink: "#3b220d"
  cream: "#fff7ec"
  ember-dark: "#a8430d"
  ember: "#c2540f"
  symbol-highlight: "#ffc36b"
  surface-white: "#ffffff"
  cream-paper: "#fffaf3"
  toffee-soft: "#7a5a40"
  biscuit-line: "#f1dcc2"
  field-edge: "#a8784c"
  pill-ink: "#7a3b0c"
  pill-bottom: "#ffe8c9"
  pill-ring: "#f2c287"
  night-paper: "#1c130b"
  night-surface: "#26190e"
  night-ink: "#ffe9cf"
  night-soft: "#c9a07a"
  night-line: "#3d2a19"
  night-edge: "#8a6446"
  marigold-night: "#ff9a3d"
  night-pill-ink: "#ffdcae"
typography:
  display:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "clamp(52px, 8.6vw, 124px)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.045em"
  headline-hero:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "clamp(26px, 2.8vw, 40px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "clamp(30px, 4vw, 46px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "64px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 700
    lineHeight: 1
  figure:
    fontFamily: "ui-rounded, 'SF Pro Rounded', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: 1.35
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  focus: "4px"
  field: "10px"
  card-sm: "14px"
  frame: "16px"
  pill: "999px"
  tag: "0.42em"
  tag-hero: "0.3em"
spacing:
  xs: "8px"
  sm: "12px"
  md: "18px"
  lg: "28px"
  xl: "44px"
  column: "48px"
  section: "96px"
  gutter: "28px"
  container: "1180px"
components:
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.roasted-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "54px"
  button-outline:
    backgroundColor: "{colors.marigold-rate}"
    textColor: "{colors.roasted-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 28px"
    height: "54px"
  price-tag:
    backgroundColor: "{colors.pill-bottom}"
    textColor: "{colors.pill-ink}"
    rounded: "{rounded.tag}"
    padding: "0.12em 0.55em 0.12em 0.12em"
  price-tag-hero:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.roasted-ink}"
    typography: "{typography.display}"
    rounded: "{rounded.tag-hero}"
    padding: "0.1em 0.3em 0.1em 0.1em"
  chip:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.roasted-ink}"
    rounded: "{rounded.card-sm}"
    padding: "9px 14px"
  tag-language:
    backgroundColor: "{colors.cream-paper}"
    textColor: "{colors.roasted-ink}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  select-on-orange:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.roasted-ink}"
    rounded: "{rounded.field}"
    padding: "10px 12px"
  input-popup:
    backgroundColor: "{colors.surface-white}"
    textColor: "{colors.roasted-ink}"
    rounded: "{rounded.field}"
    padding: "8px 10px"
  popup-header:
    backgroundColor: "{colors.marigold-rate}"
    textColor: "{colors.roasted-ink}"
    padding: "16px 18px 14px"
---

# Design System: DirectChange

## Overview

**Creative North Star: "Orange Drench"**

The brand orange is no longer an accent; it is the ground. The website opens and closes on solid orange bands, the popup opens on a flat orange header, and the privacy page carries an orange top edge. On the orange, everything is dark roasted ink, and the one cream object is the price tag: on the landing page a single converted price ("¥24,000 ≈ €137") set enormous is the headline itself. Between the orange edges, the page sits on plain white (night paper in dark mode) and breathes: rules and text instead of boxes.

The register is simple and close to standard. One warm family (orange, cream, roasted brown, toffee), the system rounded face for headings and figures, the system sans for reading, no web fonts. The signature is the price tag: a cream rounded tag led by the app mark (an orange square holding two cream ≈ waves), shared exactly across website, store art and inline badge.

The inline badge appears on pages DirectChange doesn't own, so it stays small and polite (0.82em of the host text, 1px hover lift). The website is where the orange gets to drench.

**Key Characteristics:**
- Orange as a ground at the edges of every surface, never as mid-page panels.
- Dark ink on orange, always; cream is the only object color on orange.
- White (or night paper) between the bands, structured by 1.5px rules and type, not same-size cards.
- The price tag led by the app mark, identical on every surface; the ≈ is the mark's SVG waves, never a glyph.
- Capsules for actions, rounded rectangles for information, circles only for round things.
- Rounded type for headings, figures and buttons; system sans for reading.

## Colors

One warm family: a saturated orange ground, cream objects, roasted-brown ink, and toffee for quiet text.

### Primary
- **Marigold Rate** (#e0701c): the drench. Ground of the landing page's top and closing bands, the popup header, the privacy page's 10px top border, the switch's on state, the app mark's square, and the giant step numerals (64px, the only place it is used as text on white). It stays the same in dark mode.
- **Roasted Ink** (#3b220d): the only text color on orange (4.6:1), and body text on light grounds. Rules on orange are this ink at 25% alpha.
- **Cream** (#fff7ec): the objects that sit on orange: the hero price tag, the primary button, the currency select. Also the mark's waves and the top of the price tag gradient.
- **Ember Dark** (#a8430d): accent text on light grounds: fact titles, list icons, links on the privacy page, the popup's result and site-currency code (6:1 on white).
- **Ember** (#c2540f): the focus ring on light grounds. On orange the ring switches to Roasted Ink.
- **Symbol Highlight** (#ffc36b): the lit spot of the popup's round currency-symbol disc, a radial gradient to Marigold Rate.

### Neutral
- **Surface White** (#ffffff): the website's page ground between the bands; popup field fill.
- **Cream Paper** (#fffaf3): chips and language tags on the website; page ground of the popup and privacy page.
- **Toffee Soft** (#7a5a40): leads, descriptions, notes and footers on light grounds.
- **Biscuit Line** (#f1dcc2): rules above facts, borders on chips, tags, screenshot frames and the popup converter card.
- **Field Edge** (#a8784c): the 1px edge of popup inputs, selects and the swap button, dark enough to read as a control (3.9:1 on white).

### Price Tag
- **Pill Ink** (#7a3b0c) on a vertical gradient from Cream to **Pill Bottom** (#ffe8c9), ringed by **Pill Ring** (#f2c287). Used only for the converted-price tag.

### Night
- **Night Paper** (#1c130b) page ground, **Night Surface** (#26190e) chips and fields, **Night Ink** (#ffe9cf), **Night Soft** (#c9a07a), **Night Line** (#3d2a19), **Night Edge** (#8a6446) for popup control edges, **Marigold Night** (#ff9a3d) for accent text and focus rings, **Night Pill Ink** (#ffdcae) on a tag running from #4b2b12 to #3a200b, ringed by #8c5a2a. The orange bands and the popup header keep Marigold Rate with Roasted Ink in dark mode.

### Named Rules
**The Ink On Orange Rule.** Text, outlines, rules and focus rings on Marigold Rate are Roasted Ink. Never white: white on this orange is 3.2:1.

**The Orange At The Edges Rule.** Marigold Rate is a ground for the opening and closing of a surface (top band, closing band, popup header, top border). Content between sits on white or night paper.

**The Dark Accent Text Rule.** Orange-family text on a light ground is Ember Dark (#a8430d), or Marigold Night in dark mode. Marigold Rate appears as text only at display size (the 64px step numerals).

**The One Family Rule.** Every color is a warm orange, cream or brown. No blue, no neutral grey, including disabled and secondary states.

## Typography

**Display Font:** ui-rounded (with SF Pro Rounded, system-ui, sans-serif)
**Body Font:** system-ui (with -apple-system, Segoe UI, sans-serif)

**Character:** The rounded face gives headings, numbers and buttons their softness; the system sans keeps reading text native and fast. No web fonts load.

### Hierarchy
- **Display** (800, clamp(52px, 8.6vw, 124px), 1, -0.045em): the converted-price headline in the hero only; the cream tag inside it is set at the same size.
- **Headline Hero** (700, clamp(26px, 2.8vw, 40px), 1.15, -0.015em): the sentence under the price, max 18em wide.
- **Headline** (700, clamp(30px, 4vw, 46px), 1.15, -0.02em): section titles, max 16em wide. The closing band enlarges it to clamp(34px, 5vw, 60px).
- **Title** (700, 21px, 1.15): fact and step titles.
- **Numeral** (800, 64px, 1, -0.04em): step numbers in Marigold Rate.
- **Lead** (400, 18px, 1.6): the paragraph under a headline, max 38em, Toffee Soft on light grounds, ink on orange.
- **Body** (400, 17px, 1.6): website reading text. The popup uses 14px/1.4; the privacy page 17px/1.65.
- **Button** (700, 17px, 1, rounded): website buttons.
- **Figure** (600, 18px, 1.35, rounded): amounts and results in the popup converter. Price tags use the rounded face at 600.
- **Label** (600, 12px): the popup converter heading; field labels use the same size at regular weight in Toffee Soft. Never uppercase.

### Named Rules
**The Rounded Numbers Rule.** Prices, amounts and currency symbols are always set in the rounded face.

**The One Giant Price Rule.** The display size belongs to the converted price. Sentences never take the display size.

## Layout

The website is a single column, at most 1180px wide with 28px gutters (20px at 820px and below). The hero band fills the viewport (up to 900px): nav on top, the giant price and its sentence centered vertically, and a meta strip at the bottom above a 1.5px ink rule. Sections below are left-aligned and spaced 96px apart (72px on small screens), each opening with a headline and a lead.

Below the hero, content is grouped by rules and type: facts in a three-column grid (48px column gap) where each item sits under a 1.5px Biscuit Line rule; steps in three columns led by a giant numeral; a 1.2fr / 1fr split pairing a list with the popup screenshot. Screenshots run full width under their section. At 820px and below every grid collapses to one column and nav links marked `hide-sm` hide. The closing band starts 110px after the last section and holds the privacy promise, the install button and the footer.

The popup is a fixed 290px column: the flat orange header (16px 18px 14px), then the site banner, converter card, switch row and labelled selects, spaced 12–16px apart. The privacy page is a single 700px reading column.

## Elevation & Depth

Mostly flat. Depth comes from the orange-to-white change of ground and from rules, not from shadows. Shadows are reserved for two things: product imagery on white, and cream objects lifted off the orange. They are tinted warm brown in light mode and neutral black at higher opacity in dark mode.

### Shadow Vocabulary
- **Lifted frame** (`box-shadow: 0 18px 50px rgba(110,55,10,.16)`; dark `rgba(0,0,0,.45)`): screenshots on the website.
- **Cream lift** (`box-shadow: 0 10px 30px rgba(90,40,5,.25)` on the hero tag, `0 6px 18px rgba(90,40,5,.25)` on the cream button): cream objects on orange.
- **Pill ring** (`box-shadow: inset 0 0 0 1px #f2c287, 0 1px 2px rgba(122,59,12,.12)`): the price tag; on hover `inset 0 0 0 1px #e9a55c, 0 3px 8px rgba(122,59,12,.18)`.
- **Hover card** (`box-shadow: 0 10px 30px rgba(90,45,10,.22), inset 0 3px 0 <orange>`): the badge's rate card, with an orange top edge.

### Named Rules
**The Rules Not Cards Rule.** Below the hero, group content with 1.5px top rules and type, not same-size bordered cards. Chips and language tags are the only boxed items on the page.

## Shapes

Soft corners everywhere, and the shape says what a thing is. Buttons, the meta pause button and the switch are full capsules (999px). The price tag, chips, language tags, cards, screenshot frames, fields and the app mark are rounded rectangles: tag 0.42em (hero 0.3em), frames 16px, chips and popup cards 14px, fields and language tags 10px, mark 30/128, focus rings 4px. Circles are kept for the popup's currency-symbol disc and the swap button. Rules are straight 1.5px lines.

### Named Rules
**The Shape Means Role Rule.** Capsule = action, rounded rectangle = information, circle = only things that are genuinely round.

**The Concentric Corner Rule.** A frame around the mark takes the mark's corner radius plus the inset (badge: 1.2em mark, .12em inset, .42em corner; hero: .74em mark, .1em inset, .3em corner).

## Components

### Buttons
- **Shape:** full capsule (999px), 54px tall, 0 28px padding, rounded face at 700/17px.
- **Cream (primary):** Roasted Ink on Cream with the cream lift shadow. Lives on orange.
- **Outline:** transparent on orange, Roasted Ink text and a 2px Roasted Ink border.
- **Hover / Focus:** rises 2px (`transform .15s`, off with reduced motion). Focus is a 3px outline offset 3px: Ember on light grounds, Roasted Ink on orange.
- **Small outline:** the hero's pause button, 600/14px, 1.5px ink border, 6px 12px.

### Price Tag (signature)
The converted price, placed right after the original price on any page and as the headline on the website.
- **Style:** a rounded tag (.42em corners, .12em .55em .12em .12em padding) with the Cream-to-Pill-Bottom gradient and Pill Ring, Pill Ink text in the rounded face at 600, 0.82em of the host text (0.8em on the website's chips), led by the app mark at 1.2em.
- **Hero variant:** flat Cream with Roasted Ink, set at display size (text 1em) on the orange band, .3em corners, .1em .3em .1em .1em padding, mark at .74em, with the cream lift shadow. The two sides of the price cross-fade every 3s (0.3s, paused by the meta button or reduced motion).
- **Hover (badge):** rises 1px and the ring deepens; a hover card shows the source price, the converted figure (20px, 700) and a meta line under a dashed rule.
- **Dark host pages:** switches to the night tag when the host text is light.
- **Isolation:** rendered in a closed Shadow DOM with `all: initial`.

### Currency Symbol Disc
The popup's site banner: a 34px circle with a radial gradient from Symbol Highlight to Marigold Rate, lit at 35%/30%, holding the site's currency symbol in Roasted Ink (rounded 700/15px).

### Icons
Line icons on a 24px grid (1.8 stroke, round caps and joins), drawn bare at 22px in Ember Dark next to fact titles and list items, with no well or background. They live in one inline SVG sprite in `docs/index.html`.

### Chips and Tags
- **Currency chip:** Cream Paper, 14px corners, 9px 14px padding, bold, 1px Biscuit Line border, holding a source price and its price tag. Chips scroll in two opposing marquee rows that pause on hover or via the pause button; with reduced motion they become a static wrapped grid.
- **Language tag:** a Cream Paper rounded rectangle (10px) with 5px 12px padding, 15px text and a 1px border.

### Inputs / Fields
- **Select on orange:** Cream fill, no border, 10px corners, 600/16px ink text.
- **Popup fields:** 1px Field Edge border (Night Edge in dark), 10px corners, white or night-surface fill.
- **Focus:** a 2px Ember outline in the popup (Marigold Night in dark), a 3px outline on the website.
- **Switch:** a 40×23 capsule track in Toffee Soft that fills with Marigold Rate when on; the white knob mirrors in right-to-left layouts.

### Popup Header
Flat Marigold Rate with Roasted Ink: a 24px icon and the name (rounded 700/17px), a 12px tagline under it. No gradient.

### Navigation
On the orange band: the brand (32px icon, rounded 700/20px) left; links (600/15px, 26px gap) right, in ink, underlining on hover. No bar or border. The footer repeats the links under a 1.5px ink rule inside the closing band.

### Brand mark
The app icon and the price tag's lead: a Marigold Rate rounded square (30/128 corner, inset 4/128) holding two Cream ≈ waves, stroke 13/128 with round caps so it stays legible at 16px (`icons/icon.svg`, PNGs at 16/32/48/128; inline as a sprite symbol on the website). On orange grounds use the inverted mark: cream square, orange waves (popup header, site nav, store art). Never place the orange mark on orange.

## Do's and Don'ts

### Do:
- **Do** put Roasted Ink (#3b220d) on every orange ground, including focus rings and rules (see The Ink On Orange Rule).
- **Do** keep orange at the edges of a surface and white or night paper between (see The Orange At The Edges Rule).
- **Do** use Ember Dark (#a8430d) for accent text on light grounds and Marigold Night (#ff9a3d) in dark mode.
- **Do** show converted values in a price tag led by the app mark, with corners concentric to the mark, and set every figure in the rounded face.
- **Do** use capsules only for actions, rounded rectangles for information, circles only for round things.
- **Do** group content below the hero with 1.5px rules and type; reserve shadows for screenshots and cream objects on orange.
- **Do** define both the light and night value for each new surface, and honor `prefers-reduced-motion` and right-to-left layouts.

### Don't:
- **Don't** put white text on Marigold Rate; it fails contrast (3.2:1).
- **Don't** set the ≈ as a text glyph; it is the mark's SVG waves.
- **Don't** put the orange mark on an orange ground.
- **Don't** introduce grey, blue or any cool hue, including for disabled states.
- **Don't** build sections out of rows of same-size bordered cards.
- **Don't** let the inline badge grow beyond 0.82em of the host text or add motion beyond its 1px hover lift.
- **Don't** add web fonts; the system rounded and sans stacks are the type system.
