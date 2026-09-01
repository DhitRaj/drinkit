# Drinkit Design System

**Document:** 06_Design_System.md
**Version:** 1.0
**Last updated:** 2026-08-05
**Owner:** Design Systems
**Applies to:** Drinkit Customer App (iOS + Android), mobile web

---

## 1. Principles

1. **Premium dark.** The entire product ships dark-only in v1. Every surface, component, and illustration is designed for near-black backgrounds. Bottle photography is the hero; the UI recedes.
2. **One accent.** Gold/amber (`#F5B301`) is the only brand accent. It is reserved for primary actions, selection states, and price/offer emphasis. Never use it decoratively at large scale.
3. **Responsible by design.** Age gates, legal copy, and "Drink Responsibly" messaging are first-class components, not afterthoughts.
4. **Fast and legible.** 30–45 minute delivery is the promise; the UI must feel equally quick — skeletons over spinners, optimistic add-to-cart, 150–250 ms motion.
5. **Token-first.** No raw hex, px, or ms values in specs or code. Every value below has a token name; reference tokens everywhere.

---

## 2. Color Tokens

### 2.1 Core palette (raw values — never referenced directly in UI)

| Raw name | Hex |
|---|---|
| `black.950` | `#0D0D0D` |
| `black.900` | `#121212` |
| `black.850` | `#1A1A1A` |
| `black.800` | `#1E1E1E` |
| `black.700` | `#2A2A2A` |
| `black.600` | `#3A3A3A` |
| `gold.500` | `#F5B301` |
| `gold.600` | `#E0A200` |
| `gold.700` | `#B98600` |
| `gold.100` | `#FFF3CC` |
| `white.1000` | `#FFFFFF` |
| `grey.400` | `#A0A0A0` |
| `grey.500` | `#8A8A8A` |
| `grey.600` | `#6B6B6B` |
| `green.500` | `#22C55E` |
| `green.900` | `#0E2A1A` |
| `red.500` | `#EF4444` |
| `red.900` | `#2A1212` |
| `amber.500` | `#F59E0B` |
| `blue.500` | `#3B82F6` |

### 2.2 Semantic tokens (use these)

| Token | Value | Usage | Contrast note (WCAG AA) |
|---|---|---|---|
| `color.bg` | `#0D0D0D` | App background, scroll canvas, status bar area | Base layer; all text tokens below pass AA on it |
| `color.bg.alt` | `#121212` | Alternate page background (sheets' scrim base, tab content) | — |
| `color.surface` | `#1A1A1A` | Cards, list rows, app bar, bottom nav | — |
| `color.surface.elevated` | `#1E1E1E` | Bottom sheets, modals, dropdowns, elevated cards, toasts | — |
| `color.surface.pressed` | `#2A2A2A` | Pressed state overlay result for surfaces | — |
| `color.primary` | `#F5B301` | Primary CTA fill, selected states, active tab, links on dark, price emphasis, brand moments | On `#0D0D0D`: 10.7:1 ✅ (AA/AAA as large graphic + text) |
| `color.primary.hover` | `#E0A200` | Hover (web) / pressed tint for primary | 8.9:1 on `#0D0D0D` ✅ |
| `color.primary.pressed` | `#B98600` | Pressed state of primary fill | — |
| `color.primary.subtle` | `#F5B301` @ 12% on surface | Selected chip fill, badge backgrounds, focus tints | Pair only with `color.primary` text/icon |
| `color.on-primary` | `#0D0D0D` | Text/icons on `color.primary` fills (black on gold) | 10.7:1 ✅ AAA |
| `color.text.primary` | `#FFFFFF` | Headings, product names, prices, primary copy | 19.3:1 on `#0D0D0D` ✅ AAA |
| `color.text.secondary` | `#A0A0A0` | Supporting copy, meta (volume/ABV), timestamps, placeholder-adjacent labels | 7.4:1 on `#0D0D0D` ✅ AA/AAA; 6.6:1 on `#1E1E1E` ✅ |
| `color.text.tertiary` | `#6B6B6B` | Disabled text, strike-through MRP, decorative meta ONLY (fails AA — never for essential info) | 3.4:1 — decorative/disabled only |
| `color.text.link` | `#F5B301` | Inline links, "View all", "Change" | ✅ on all surfaces |
| `color.border` | `#2A2A2A` | Card outlines, dividers, input borders (rest) | Non-text; ≥3:1 not required for decorative dividers |
| `color.border.strong` | `#3A3A3A` | Input borders (hover), interactive component boundaries needing visibility | 1.9:1 vs surface — pair with fill difference |
| `color.border.focus` | `#F5B301` | Focused input border, keyboard focus ring | 10.7:1 ✅ (≥3:1 non-text requirement met) |
| `color.success` | `#22C55E` | Success text/icons, "Delivered", savings amount, veg-style OK states | 8.2:1 on `#0D0D0D` ✅ |
| `color.success.subtle` | `#22C55E` @ 12% on surface | Success banner/toast background | Pair with `color.success` fg |
| `color.warning` | `#F59E0B` | Warnings: low stock, store closing soon, price changed | 8.5:1 on `#0D0D0D` ✅ |
| `color.error` | `#EF4444` | Error text/icons, destructive actions, failed payment | 4.6:1 on `#0D0D0D` ✅ AA (normal text); 3.9:1 on `#1E1E1E` — on elevated surfaces use error text ≥18 px/semibold or add `color.error.subtle` container |
| `color.error.subtle` | `#EF4444` @ 12% on surface | Error banner background | Pair with `#FCA5A5` text if body-size on this fill |
| `color.info` | `#3B82F6` | Informational banners (rare), map route | 5.0:1 on `#0D0D0D` ✅ |
| `color.overlay.scrim` | `#000000` @ 60% | Behind modals/bottom sheets | — |
| `color.overlay.pressed` | `#FFFFFF` @ 8% | Pressed overlay on surfaces | — |
| `color.overlay.image` | Linear `#0D0D0D` 0% → 80% | Gradient over imagery for text legibility | Verify final text contrast ≥4.5:1 |
| `color.skeleton.base` | `#1E1E1E` | Skeleton block fill | — |
| `color.skeleton.highlight` | `#2A2A2A` | Skeleton shimmer sweep | — |
| `color.rating` | `#F5B301` | Filled rating stars | Same as primary |

### 2.3 Usage rules

- **Never place `#F5B301` text on `#FFFFFF`** or light imagery (2.0:1 — fails). Gold text lives on dark surfaces only.
- **Never use pure white fills** for surfaces; the darkest permitted "light" element is `color.primary`.
- Strike-through MRP uses `color.text.tertiary` and MUST always be accompanied by the discounted price in `color.text.primary` — the MRP is supplementary, never the only price shown.
- Success/error/warning colors are **status-only**. Do not use green for CTAs or red for emphasis.
- Two accent fills (`color.primary`) must never sit adjacent without ≥8 px of `color.bg`/`color.surface` between them.
- Elevation on dark is communicated by **lighter surface + shadow**, never by pure shadow alone (shadows are weak on near-black).

---

## 3. Typography

**Typeface:** Inter (primary). Fallback stack: `Inter, "Plus Jakarta Sans", system-ui, -apple-system, Roboto, sans-serif`. Use Inter's tabular numerals (`tnum`) for prices, OTP digits, timers, and quantities. Plus Jakarta Sans is the approved alternative if Inter licensing/bundle size is an issue — do not mix the two.

**Scale** (mobile; 1 sp = 1 dp scaled by user font setting; px values are @1x logical):

| Token | Size | Line height | Weight | Letter spacing | Usage |
|---|---|---|---|---|---|
| `type.display` | 32 px / 32 sp | 40 px | 700 Bold | −0.5 px | Onboarding headlines, age-gate headline, big empty-state titles |
| `type.h1` | 24 px / 24 sp | 32 px | 700 Bold | −0.25 px | Screen titles ("Your Cart"), section heroes |
| `type.h2` | 20 px / 20 sp | 28 px | 600 Semibold | −0.25 px | Section headers ("Top Picks"), product name on PDP |
| `type.h3` | 17 px / 17 sp | 24 px | 600 Semibold | 0 | Card titles, sheet titles, list row primaries |
| `type.body-lg` | 16 px / 16 sp | 24 px | 400 Regular | 0 | Long-form descriptions, dialogs, inputs |
| `type.body` | 14 px / 14 sp | 20 px | 400 Regular | 0 | Default UI copy, list secondary text |
| `type.body.strong` | 14 px / 14 sp | 20 px | 600 Semibold | 0 | Button labels, prices in cards, emphasized body |
| `type.caption` | 12 px / 12 sp | 16 px | 400 Regular | +0.1 px | Meta (volume, ABV), timestamps, helper/error text, legal footers |
| `type.caption.strong` | 12 px / 12 sp | 16 px | 600 Semibold | +0.1 px | Badges, discount %, tab labels, bottom-nav labels |
| `type.overline` | 11 px / 11 sp | 16 px | 600 Semibold | +1 px, UPPERCASE | Eyebrow labels ("WHISKY"), timeline step labels, section kickers |
| `type.price-lg` | 22 px / 22 sp | 28 px | 700 Bold, tabular | 0 | PDP price, cart grand total |

Rules:

- Minimum text size anywhere: 11 sp (`type.overline`); minimum for essential information: 12 sp.
- All sizes use **sp** on Android / Dynamic Type-relative on iOS — text must scale to at least 200% without truncating essential content (see 09_Accessibility.md §7).
- Max line length for descriptions: ~40 characters ≈ full width at 16 px on 375 frame; never exceed 2 columns of text.
- Product names truncate at 2 lines with ellipsis in cards; full name always available on PDP.
- Never use light (300) weights on dark backgrounds below 20 px — they shimmer and lose legibility.

---

## 4. Spacing

4-pt grid. Token = `space.N` where N is the px value.

| Token | Value | Usage |
|---|---|---|
| `space.4` | 4 px | Icon-to-label gaps, badge padding-y, tight inline gaps |
| `space.8` | 8 px | Chip padding-y, gaps inside cards, between related lines |
| `space.12` | 12 px | Card internal padding (compact), gap between grid cards |
| `space.16` | 16 px | **Default screen margin**, card internal padding, gap between list rows and sections' content |
| `space.24` | 24 px | Gap between sections, sheet top padding |
| `space.32` | 32 px | Major section separation, empty-state vertical rhythm |
| `space.48` | 48 px | Hero/onboarding vertical spacing, above bottom CTAs in long scroll |

Rules: screen horizontal margin is always `space.16`. Vertical rhythm between distinct home sections is `space.24`. Nothing off-grid; if a mock shows 10 px, snap to 8 or 12.

---

## 5. Radius

| Token | Value | Usage |
|---|---|---|
| `radius.xs` | 4 px | Skeleton lines, tiny badges |
| `radius.sm` | 8 px | Input fields, OTP boxes, small badges, thumbnails in list rows |
| `radius.md` | 12 px | Product cards, promo tiles, list cards, images |
| `radius.lg` | 16 px | Bottom sheets (top corners), modals, large promo banner, PDP image container |
| `radius.pill` | 999 px | All buttons, chips, search bar, qty stepper, filter/sort bar items |
| `radius.circle` | 50% | Category chips, avatars, icon buttons, age-gate badge, map pins |

---

## 6. Elevation & Shadow (dark theme)

On dark themes, elevation = surface lightening (primary cue) + soft shadow (secondary cue).

| Token | Surface | Shadow | Usage |
|---|---|---|---|
| `elevation.0` | `color.bg` | none | Page canvas |
| `elevation.1` | `color.surface` (#1A1A1A) | `0 1px 2px rgba(0,0,0,0.4)` | Cards, list rows, app bar, bottom nav |
| `elevation.2` | `color.surface.elevated` (#1E1E1E) | `0 4px 12px rgba(0,0,0,0.5)` | Dropdowns, sticky add-to-cart bar, floating cart pill |
| `elevation.3` | `color.surface.elevated` | `0 8px 24px rgba(0,0,0,0.6)` + scrim | Bottom sheets, modals, dialogs |
| `elevation.glow` | any | `0 0 0 4px rgba(245,179,1,0.24)` | Focus ring, celebratory highlight (order confirmed badge) |

Never use white-tinted shadows. Never stack more than one elevated surface tone (#1E1E1E is the ceiling; a card inside a sheet uses `color.border` outline instead of a lighter fill).

---

## 7. Iconography

- **Library:** Lucide (primary recommendation) — consistent 24 px grid, adjustable stroke. Phosphor (Regular weight) is the approved alternative. Do not mix libraries.
- Default size 24×24 px on a 24 px grid; small contexts (badges, meta rows) 16×16; bottom nav 24; hero/empty-state 48–64 (use `stroke 1.5`).
- Stroke: **1.75 px** at 24 px (acceptable range 1.5–2.0; pick one and lock it app-wide). Round caps and joins.
- Color: `color.text.primary` for active/interactive, `color.text.secondary` for inactive/decorative, `color.primary` for selected states.
- Touch target: every tappable icon sits in a ≥44×44 (iOS) / 48×48 dp (Android) hit area regardless of visual size.
- Category chips use custom filled glyphs (whisky glass, beer mug, wine glass, cocktail, bottle) drawn on the same 24 px grid, single color `color.primary` on `color.surface` circles — see §8.6.
- Never use emoji as UI icons. Payment brand marks (GPay, PhonePe, Paytm, BHIM, Visa, Mastercard, RuPay) use official full-color assets on `color.surface` at 24–32 px height, untinted.

---

## 8. Grid & Layout

- **Base frame:** 375 × 812 (design), fluid from 320 to 480 widths.
- **Margins:** 16 px both sides, all screens.
- **Gutters:** 12 px between grid columns.
- **Product grid:** 2 columns → card width = (375 − 16 − 16 − 12) / 2 = **165.5 px** (fluid). Cards stretch equally.
- **Safe areas:** respect notch/home-indicator insets; bottom CTAs sit `space.16` above the home indicator; bottom nav includes inset padding.
- **Sticky zones:** app bar (top, `elevation.1` once scrolled), bottom nav or bottom CTA bar (`elevation.2`). Content scrolls under with fade.
- **Status bar:** dark background (`color.bg`), light content (white icons/time).
- Horizontal carousels (Top Picks, banners): first item aligns to 16 px margin, peek of next item ≥24 px, 12 px inter-item gap, no trailing margin clipping.

---

## 9. Component Specs

Every component below lists anatomy, tokens, and all states. "Pressed" applies `color.overlay.pressed` (surfaces) or the pressed color token (fills) plus scale 0.98 over `motion.fast`.

### 9.1 Buttons

**Shared:** height 52 px (primary/secondary, `size.lg`), 44 px (`size.md`), 36 px (`size.sm`); `radius.pill`; label `type.body.strong` (15 px allowed at lg); horizontal padding 24 px (lg) / 20 (md) / 16 (sm); optional 20 px leading icon with 8 px gap; min touch 48 dp.

| Variant | Default | Pressed | Disabled | Loading |
|---|---|---|---|---|
| **Primary** | Fill `color.primary`, label/icon `color.on-primary` | Fill `color.primary.pressed`, scale 0.98 | Fill `color.primary` @ 32%, label `#0D0D0D` @ 60%, no elevation, not focusable-by-tap | Label hidden, 20 px spinner in `color.on-primary`, width locked, disabled to input |
| **Secondary** | Transparent fill, 1.5 px border `color.primary`, label `color.primary` | Fill `color.primary` @ 12% | Border & label @ 32% | Spinner `color.primary` |
| **Ghost/Tertiary** | Transparent, label `color.primary` (or `color.text.primary` for neutral ghost) | Fill `color.overlay.pressed` pill | Label `color.text.tertiary` | Spinner replaces label |
| **Destructive** | Transparent, 1.5 px border `color.error`, label `color.error` | Fill `color.error` @ 12% | @ 32% | Spinner `color.error` |
| **Icon button** | 44×44 circle, icon 24 `color.text.primary`, optional fill `color.surface` | Fill `color.surface.pressed` | Icon `color.text.tertiary` | 20 px spinner |
| **Add "+" (product card)** | 32×32 circle, fill `color.primary`, "+" 18 px `color.on-primary`, `elevation.1` | `color.primary.pressed`, scale 0.9→1 spring | Fill `color.border`, "+" `color.text.tertiary` (out of stock) | Morphs into qty stepper (see 9.13) |

Full-width primary CTAs (Add to Cart, Pay, Continue) span screen minus 16 px margins, pinned above safe area, on an `elevation.2` bar with 1 px top border `color.border`.

### 9.2 Text Input

Anatomy: optional label above (`type.caption`, `color.text.secondary`, 6 px gap) → field (height 52, `radius.sm` 8 px... **use 12 px `radius.md` for standalone fields**, fill `color.surface`, 1 px border `color.border`, text `type.body-lg` `color.text.primary`, placeholder `color.text.secondary`, 16 px horizontal padding, optional leading icon 20 px `color.text.secondary`, optional trailing action (clear ✕ / visibility)) → helper or error line below (`type.caption`, 6 px gap).

| State | Border | Fill | Notes |
|---|---|---|---|
| Default | `color.border` | `color.surface` | |
| Focused | 1.5 px `color.border.focus` + `elevation.glow` ring | `color.surface` | Label stays above (no floating animation) |
| Filled | `color.border` | `color.surface` | Trailing clear ✕ appears |
| Error | 1.5 px `color.error` | `color.surface` | Error text `color.error` + 16 px alert icon; announce via a11y live region |
| Disabled | `color.border` @ 50% | `color.surface` @ 50% | Text `color.text.tertiary` |
| Loading (async validate) | focused style | | 16 px spinner trailing |

### 9.3 OTP Input

6 boxes (or 4 per backend), each 48×56, `radius.sm`, fill `color.surface`, border 1 px `color.border`, digit `type.h1` tabular centered, 10 px gaps, row centered. Single hidden input drives all boxes (paste-friendly, SMS autofill: iOS `one-time-code`, Android SMS Retriever).
States: **empty** (border rest), **active** (current box border `color.border.focus` + blinking caret), **filled** (digit white, border rest), **error** (all borders `color.error`, shake ±8 px × 3 over 300 ms, then clear all + refocus first), **success** (borders `color.success` 200 ms, auto-submit on last digit), **disabled during verify** (50% opacity + inline spinner).
Below: resend line — "Resend code in 00:27" (`type.caption`, secondary, tabular timer) → becomes "Resend code" ghost link in `color.primary` at 0.

### 9.4 Search Bar

Height 48, `radius.pill`, fill `color.surface`, 1 px border `color.border`, leading search icon 20 `color.text.secondary`, placeholder `type.body` `color.text.secondary` (rotating hints: "Search 'whisky'", "Search 'Kingfisher'"), optional trailing mic icon. On Home it is a **tap-through** (opens Search screen); on Search screen it is a live input with clear ✕ and Cancel ghost button. Focused: border `color.border.focus`. Voice input optional trailing mic (Android).

### 9.5 Chips

**Filter/choice chip:** height 36, `radius.pill`, padding 16 h; default fill `color.surface` + border `color.border` + label `type.body` `color.text.secondary`; selected fill `color.primary.subtle` + border `color.primary` + label `color.primary` semibold + optional leading 16 px check; pressed overlay; disabled 40% opacity. With count: "Brand • 2". Dismissible variant adds trailing ✕ 16 px.
**Sort chip** opens sort bottom sheet (never inline dropdown).

### 9.6 Category Chip (circular)

72 px wide column: 64×64 circle (fill `color.surface`, 1 px border `color.border`, glyph 28 px `color.primary` OR category bottle image on dark) + label below (`type.caption`, `color.text.secondary`, 8 px gap, 1 line, max 9 chars else 2 lines 12/14).
Selected (on listing screens): circle border 2 px `color.primary`, label `color.text.primary` semibold. Pressed: scale 0.94. Row layout: horizontal scroll, 16 px leading margin, 12 px gaps.

### 9.7 Product Card — Grid variant

Width fluid (~165), `radius.md`, fill `color.surface`, 1 px border `color.border`, padding 12.
Top→bottom: image area 1:1 (bottle PNG centered on transparent, subtle radial glow `#FFFFFF` @ 4%; discount badge top-left; wishlist heart top-right optional) → 8 px → name (`type.body.strong`… use `type.body` 14/20 semibold, `color.text.primary`, 2 lines max) → meta "750 ml • 42.8% ABV" (`type.caption`, secondary, 1 line) → rating row optional (star 12 `color.rating` + "4.2" caption) → 8 px → price row: "₹1,249" (`type.body.strong` white, tabular) + "₹1,499" strike (`type.caption` `color.text.tertiary`, 6 px gap) on left; **Add "+" button** 32 px (9.1) bottom-right, overlapping nothing.
States: **default**; **pressed** (overlay + scale 0.98 → opens PDP); **in cart** ("+" replaced by compact stepper 88×32, see 9.13); **out of stock** (image 40% opacity + grayscale, "Out of stock" `type.caption.strong` `color.text.secondary` replaces price row's button, card still tappable to PDP, "Notify me" on PDP); **loading** (skeleton 9.19); **low stock** (badge "Only 2 left" `color.warning`).

### 9.8 Product Card — List variant

Full-width row, `radius.md`, fill `color.surface`, padding 12, min height 104. Left: image 80×80 `radius.sm` on `#121212` tile. Middle (12 px gap): name (2 lines) → meta caption → price row (price + strike MRP + discount % text in `color.success`). Right: Add "+"/stepper vertically centered. Same states as grid. Used in Search results and "frequently bought" lists.

### 9.9 Bottom Navigation

Height 60 + safe-area inset, fill `color.surface`, top border 1 px `color.border`, `elevation.1`. 4 items: **Home, Categories, Orders, Profile** — icon 24 + label `type.caption.strong` 10–11 sp, 2 px gap.
Active: icon filled style + `color.primary`, label `color.primary`. Inactive: outline icon + label `color.text.secondary`. Pressed: overlay circle behind icon. Badge: red dot 8 px (notifications) or count pill on Orders (ongoing order). Cart is NOT in bottom nav — floating cart pill (9.22) instead. Re-tap active item scrolls to top.

### 9.10 App Bar

Height 56 + status inset, fill transparent over `color.bg` → gains `color.surface` fill + bottom border `color.border` after 8 px scroll (`motion.fast` fade).
Variants: **Home** (two-line location header: overline "DELIVER TO ▾" `color.primary` 11 sp + address line `type.h3` white truncated 1 line, chevron; right: notification bell icon-button with dot); **Titled** (back icon-button 44, centered or leading `type.h3` title, up to 2 trailing icon-buttons: search, share); **Contextual/PDP** (transparent over image, back + share in 40 px scrim circles `#0D0D0D` @ 60%).

### 9.11 Bottom Sheet

Fill `color.surface.elevated`, top `radius.lg` (16 px) corners, grabber 36×4 `color.border.strong` `radius.pill` centered 8 px from top, padding 16–24, `elevation.3` + scrim.
Behavior: enters `motion.entrance` slide-up 400 ms decel; drag-to-dismiss (velocity > 500 px/s or > 50% travel); scrim tap dismisses (except blocking sheets: age verify, payment processing — no scrim dismiss, no grabber). Detents: content-height (default), 60%, 90% (scrollable). Title row: `type.h3` + optional close icon-button right. Sheet CTAs pinned at sheet bottom above inset.
Used for: sort, filters, address picker, added-to-cart confirmation, offer details, delivery instructions, cancel order, rating.

### 9.12 Modal / Dialog

Centered card 328 max width (screen − 24 margins... use screen − 2×24), `radius.lg`, fill `color.surface.elevated`, `elevation.3`, padding 24. Optional 48 px icon top-center → title `type.h2` center → body `type.body` `color.text.secondary` center → 20 px → buttons: stacked full-width (primary top, ghost below) or side-by-side 50/50 with 12 px gap. Enter: fade + scale 0.95→1, 250 ms. Reserved for destructive confirms (remove item? cancel order? logout?) and blocking legal (age). Everything else uses sheets.

### 9.13 Quantity Stepper

Pill 100×36 (compact 88×32 in cards), fill `color.surface` (in cards: fill `color.primary.subtle`, border 1 px `color.primary`): "−" 24 hit-44 | count `type.body.strong` tabular `color.primary` min-width 24 center | "+" 24.
States: **default**; **min (qty 1)**: "−" becomes trash icon 18 px (in cart) or decrements to 0 collapsing back to "+" (in cards); **max (per-order legal limit reached)**: "+" disabled `color.text.tertiary` + toast "Limit: N per order for this item"; **updating**: count swaps with 12 px spinner ≤400 ms, optimistic UI (revert + error toast on failure); count change animates old-digit-up/new-digit-in 150 ms.

### 9.14 Order Status Timeline

Vertical (Order Tracking) — steps: Confirmed → Packed → Out for Delivery → Delivered.
Node: 24 px circle — **done**: fill `color.success`, white check 12; **active**: fill `color.primary`, pulsing halo `elevation.glow` 1.2 s loop; **pending**: 1.5 px border `color.border.strong`, transparent. Connector: 2 px line, `color.success` (done→done), animated fill to active, `color.border` pending; 32 px min segment.
Row content right of node (12 px gap): step label `type.body.strong` (white if done/active, `color.text.secondary` pending) + timestamp `type.caption` secondary ("2:41 PM") when reached + optional sub-copy. Cancelled/failed branch: node `color.error` with ✕, subsequent steps hidden, refund line appended.
Horizontal compact variant (Order History rows): 4 dots + connectors, 8 px, same colors.

### 9.15 Badges

Height 20 (18 min), `radius.xs` (rect) or `radius.pill` (count), padding 6 h, `type.caption.strong` 11 sp.
**Discount:** fill `color.primary`, text `color.on-primary`, "20% OFF", top-left of image, 8 px inset.
**Status pills** (Order History): Ongoing `color.primary.subtle`/`color.primary`; Delivered `color.success.subtle`/`color.success`; Cancelled `color.error.subtle`/`#FCA5A5`; Refunded `color.surface.pressed`/`color.text.secondary`.
**Info badges:** "BESTSELLER" gold-subtle; "NEW" gold-subtle; "Only 2 left" warning-subtle/`color.warning`; "18+" circular 20 px border `color.text.secondary`.
**Count dot:** 16 px circle `color.error`, white 10 sp number, max "9+".

### 9.16 Tabs

Underline style. Bar height 48, fill inherits, bottom border 1 px `color.border` full-width. Tab label `type.body.strong`: active `color.primary` + 2 px indicator `color.primary` (animated slide 250 ms), inactive `color.text.secondary`. Scrollable when >4 (Order History: All/Ongoing/Completed/Cancelled — fixed 4, equal width). Swipeable content panes. Optional count "All (12)".

### 9.17 Toast / Snackbar

Width screen − 32, `radius.md`, fill `color.surface.elevated`, `elevation.2`, padding 12–16, positioned 12 px above bottom nav/CTA. Row: leading status icon 20 (success/error/info color) + message `type.body` white max 2 lines + optional action ghost label `color.primary` ("UNDO", "RETRY", "VIEW CART").
Enter slide-up+fade 250 ms; auto-dismiss 3 s (5 s with action; errors 5 s); swipe-down dismiss; max 1 visible (queue). Never for blocking errors — those get inline banners or dialogs.

### 9.18 Banner (inline alert)

Full-bleed-within-margins card, `radius.md`, subtle status fill + 1 px status border @ 40%, padding 12, leading icon 20, text `type.body`, optional trailing action/✕. Used for: store closed, dry day notice, outside serviceable area, price-changed-in-cart, offline. Persistent until condition clears.

### 9.19 Skeleton Loaders

Blocks in `color.skeleton.base`, radii matching real components, shimmer sweep gradient to `color.skeleton.highlight` translating left→right 1.2 s linear loop (disabled under Reduce Motion → static 0.6→1.0 opacity pulse... use static base, no pulse).
Templates: **Home** (location line 120×16, banner 343×140 r12, 5 category circles 64, 2×2 product cards); **Product card** (image square r12, 2 text lines 100%/60% ×14, price line 48×16, circle 32); **PDP** (image 375×320, lines); **List row** (80 sq + 3 lines); **Tracking** (map block + timeline nodes). Show skeletons ≥ 300 ms up to 10 s → then error state. Never mix skeleton + spinner on one screen.

### 9.20 Empty States

Vertical center of content area: illustration/icon 96–120 px (line style, `color.text.secondary` strokes with single `color.primary` accent element) → 16 → title `type.h3` white center → 8 → body `type.body` `color.text.secondary` center max 260 px wide → 24 → primary or secondary CTA. One CTA max. Copy per screen in 08_Content_Guidelines.md §4.

### 9.21 Rating Stars

Display: 5 stars 16 px, filled `color.rating`, empty = outline `color.border.strong`, half supported; or compact "★ 4.2" + "(1.2k)" caption secondary. Input (review sheet): 5 stars 40 px, 8 px gaps, tap/drag to set, selected pop scale 1→1.2→1 150 ms, haptic tick per star; selected state colors 1–2 stars `color.error`, 3 `color.warning`, 4–5 `color.rating` (optional flourish; default all gold acceptable — pick one, ship one: **default all gold**).

### 9.22 Floating Cart Pill

Appears on Home/Listing/PDP/Search when cart > 0. Pinned 12 px above bottom nav, width screen − 32, height 52, `radius.pill`, fill `color.primary`, `elevation.2`.
Left: stacked mini bottle thumb 32 in dark circle + "3 items • ₹2,847" `type.body.strong` `color.on-primary` (tabular). Right: "View Cart →" strong. Enter: slide-up spring; on add-to-cart: brief scale bounce 1→1.04→1 + count/price crossfade. Tap → Cart.

### 9.23 Price Display

Pattern (always this order, left→right): **selling price** ("₹1,249", white, bold, tabular, `type.body.strong` in cards / `type.price-lg` on PDP & totals) → 6 px → **MRP strike** ("₹1,499", `type.caption`/`type.body`, `color.text.tertiary`, line-through) → 6 px → **discount** ("17% OFF" `type.caption.strong` `color.success` inline, or gold badge on imagery).
Rules: rupee symbol ₹ always, no space before digits, Indian digit grouping (₹1,04,999), no decimals unless paise exist. Strike/discount omitted entirely when price == MRP. Savings line in cart: "You save ₹250" `color.success`. Price changes animate old→new with 150 ms crossfade + one-time `color.warning` flash when changed server-side.

### 9.24 List Row (settings/profile)

Height 56, fill transparent on `color.bg` or grouped in `color.surface` card, padding 16 h: leading icon 24 secondary → label `type.body-lg` white → trailing value caption secondary and/or chevron-right 20 secondary. Divider 1 px `color.border` inset 56. Pressed overlay. Destructive rows (Logout, Delete account): label `color.error`.

---

## 10. Motion

| Token | Value | Usage |
|---|---|---|
| `motion.fast` | 150 ms | Pressed states, chip toggles, icon swaps, digit changes |
| `motion.base` | 250 ms | Sheet content, tab indicator, toasts, dialogs, crossfades |
| `motion.slow` | 400 ms | Bottom sheet entrance, page transitions, timeline fills, confetti-class moments |
| `ease.standard` | cubic-bezier(0.2, 0, 0, 1) | Default (decelerate-dominant) |
| `ease.exit` | cubic-bezier(0.4, 0, 1, 1) | Dismissals, exits |
| `ease.spring` | spring(damping 0.8, response 0.35) | Add-to-cart, stepper, cart pill bounce |

**Page transitions:** forward push = slide-in from right 400 ms `ease.standard` with 30% parallax on outgoing; back = reverse `ease.exit`; sheets slide-up; modals fade+scale; tab switches = 150 ms crossfade (no slide).
**Add-to-cart:** "+" tap → button springs 0.9→1 → bottle thumbnail 24 px clone arcs (quadratic bezier) from card to floating cart pill over 400 ms shrinking to 8 px + fade → pill bounces + count increments (digit slide-up 150 ms) → haptic light. Under Reduce Motion: skip the arc; pill count updates with fade only.
**Success checkmark** (order placed / payment success): 64 px circle `color.success` scales 0→1 spring, check path draws stroke over 250 ms starting at 150 ms, `elevation.glow` pulse once, haptic success. Total ≤ 700 ms before content settles.
**OTP error shake:** ±8 px, 3 cycles, 300 ms.
**Reduce Motion (system setting):** replace all slides/arcs/springs with ≤150 ms opacity fades; kill shimmer, pulse halos, parallax. See 09_Accessibility.md §6.

## 11. Haptics

| Event | iOS | Android |
|---|---|---|
| Add to cart, stepper tick, chip select, star select | Impact Light | EFFECT_TICK |
| Pull-to-refresh trigger, sheet detent snap | Impact Medium | EFFECT_CLICK |
| Order placed, payment success, OTP auto-verify | Notification Success | double EFFECT_HEAVY_CLICK pattern |
| Payment failure, OTP wrong, validation error | Notification Error | EFFECT_DOUBLE_CLICK |
| Long-press (address reorder) | Impact Heavy | EFFECT_HEAVY_CLICK |

Rules: haptics accompany state changes, never scrolling; respect system haptics-off setting; never more than one haptic per gesture.

---

## 12. Token JSON reference (excerpt for handoff)

```json
{
  "color": {
    "bg": "#0D0D0D", "bg-alt": "#121212",
    "surface": "#1A1A1A", "surface-elevated": "#1E1E1E", "surface-pressed": "#2A2A2A",
    "primary": "#F5B301", "primary-hover": "#E0A200", "primary-pressed": "#B98600",
    "on-primary": "#0D0D0D",
    "text-primary": "#FFFFFF", "text-secondary": "#A0A0A0", "text-tertiary": "#6B6B6B",
    "border": "#2A2A2A", "border-strong": "#3A3A3A", "border-focus": "#F5B301",
    "success": "#22C55E", "warning": "#F59E0B", "error": "#EF4444", "info": "#3B82F6"
  },
  "radius": { "xs": 4, "sm": 8, "md": 12, "lg": 16, "pill": 999 },
  "space": [4, 8, 12, 16, 24, 32, 48],
  "motion": { "fast": 150, "base": 250, "slow": 400 }
}
```

Cross-references: screen-by-screen usage → `07_Design_Customer_Screens.md`; copy → `08_Content_Guidelines.md`; contrast & a11y detail → `09_Accessibility.md`.

---

## 13. Figma-Ready Token Mapping

Use the following naming convention when creating Figma variables so the design system can be exported cleanly to code and shared across files:

| Figma collection | Variable group | Example variable |
|---|---|---|
| `Color` | `Brand` | `Brand/Primary` |
| `Color` | `Surface` | `Surface/Base` |
| `Color` | `Text` | `Text/Primary` |
| `Color` | `Border` | `Border/Focus` |
| `Color` | `Feedback` | `Feedback/Success` |
| `Spacing` | `Space` | `Space/16` |
| `Radius` | `Radius` | `Radius/MD` |
| `Typography` | `Type` | `Type/Body/Regular` |
| `Elevation` | `Elevation` | `Elevation/2` |
| `Motion` | `Duration` | `Duration/Base` |

### 13.1 Variable Modes

- `Default` for production UI.
- `Reduce Motion` for system accessibility mode.
- `iOS` and `Android` only when a component needs platform-specific layout or spacing.
- Do not create per-screen token overrides unless a screen is a genuine pattern exception.

### 13.2 Token Alias Rules

- Raw values should live only in the base token layer.
- Semantic tokens must be the only tokens used in UI components.
- Components should reference semantic tokens, not raw hex or direct pixel values.
- If a token changes, all components should inherit it automatically through aliases.

### 13.3 Figma Handoff Naming

- Layers should use clear semantic names: `App Bar / Home`, `Product Card / Grid`, `Bottom Sheet / Sort`.
- Auto-layout should be used for all list rows, cards, buttons, chips, and sheets.
- Component variants should be named with explicit states, for example: `Primary / Default`, `Primary / Loading`, `Primary / Disabled`.
- Icon slots should be separate from text nodes to make localization and swap states easier.

### 13.4 Token-to-Code Mapping

| Semantic token | Suggested Figma variable | Notes |
|---|---|---|
| `color.bg` | `Surface/Base` | Main canvas |
| `color.surface` | `Surface/Card` | Default card fill |
| `color.surface.elevated` | `Surface/Elevated` | Sheets and dialogs |
| `color.primary` | `Brand/Primary` | Gold accent |
| `color.text.primary` | `Text/Primary` | Main text |
| `color.text.secondary` | `Text/Secondary` | Support text |
| `color.border` | `Border/Default` | Standard outline |
| `color.border.focus` | `Border/Focus` | Focus state |
| `space.16` | `Space/16` | Default screen margin |
| `radius.md` | `Radius/MD` | Cards and fields |
| `motion.base` | `Duration/Base` | Tabs, toasts, dialogs |

## 14. Component Inventory

Use this inventory as the master list for Figma component creation and code implementation. Every component should be built as a reusable variant set with documented states.

| Component | Key variants | Core states | Main tokens | Notes |
|---|---|---|---|---|
| App Bar | Home, titled, contextual | default, scrolled, loading | `color.bg`, `color.surface`, `color.border` | Top-level navigation shell |
| Bottom Navigation | Home, Categories, Orders, Profile | active, inactive, badge | `color.surface`, `color.primary`, `color.text.secondary` | Fixed bottom shell |
| Search Bar | Tap-through, live input | default, focused, filled, error | `color.surface`, `color.border.focus` | Used on home and search |
| Chip | filter, sort, dismissible | default, selected, disabled | `color.surface`, `color.primary.subtle` | Used in filters and sort bar |
| Category Chip | circular image, circular icon | default, selected, pressed | `color.surface`, `color.primary` | Horizontal category rail |
| Product Card | grid, list | default, in cart, loading, OOS | `color.surface`, `color.primary`, `color.warning` | Primary commerce component |
| Quantity Stepper | compact, cart | default, min, max, updating | `color.surface`, `color.primary.subtle` | Shared by PDP, cart, listings |
| Product Price Row | card, PDP, cart summary | normal, discounted, changed | `color.primary`, `color.text.tertiary`, `color.success` | Keep the price order stable |
| Floating Cart Pill | default, bounce | visible, hidden, updating | `color.primary`, `color.on-primary` | Appears when cart > 0 |
| Bottom Sheet | content-height, 60%, 90% | open, dragging, blocking | `color.surface.elevated`, `color.border.strong` | Used for filters and actions |
| Dialog | confirm, blocking | default, destructive, loading | `color.surface.elevated`, `color.error` | For critical confirmations |
| Toast | success, error, info | visible, action, dismissing | `color.surface.elevated`, `color.success`, `color.error` | Brief feedback only |
| Inline Banner | info, warning, error | persistent, dismissible | status-specific fills and borders | For state-level notices |
| Skeleton Loader | home, card, PDP, list | shimmer, static reduced motion | `color.skeleton.base`, `color.skeleton.highlight` | Match final layout |
| Empty State | informational, action-led | default | `color.text.secondary`, `color.primary` | One CTA max |
| OTP Input | 4-digit, 6-digit | empty, active, filled, error, success | `color.surface`, `color.border.focus`, `color.error` | SMS autofill ready |
| Age Gate Module | pre-check, upload, approved | default, blocking, retry | `color.primary`, `color.error` | Compliance-critical |
| Timeline | tracking, history compact | pending, active, done, failed | `color.success`, `color.primary`, `color.border` | Order tracking core |
| Rating Stars | display, input | empty, half, filled, selected | `color.rating`, `color.border.strong` | Use consistent star treatment |
| List Row | settings, address, support | default, pressed, destructive | `color.text.primary`, `color.error` | Used in profile and admin-like lists |

### 14.1 Component Creation Priority

1. App Bar
2. Bottom Navigation
3. Buttons
4. Search Bar
5. Chips and Category Chips
6. Product Card and Quantity Stepper
7. Cart and Checkout modules
8. Bottom Sheet and Dialog
9. OTP Input and Age Gate
10. Timeline, Toast, Banner, Skeleton, Empty State

### 14.2 Required Variant Coverage

Every interactive component must include at minimum:

- Default
- Hover or pressed where applicable
- Disabled
- Loading or busy when async
- Error when validation or network fails
- Accessibility-safe focus state

### 14.3 Documentation Rule

- If a new screen requires a new pattern, add the pattern to this inventory before implementation.
- If a variant is reused in more than one place, it belongs in the design system, not inside a single screen file.
