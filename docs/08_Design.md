# 08. Design Specification

## 1. Customer App Screen Set

- Onboarding: brand hero, benefit statement, CTA, social proof, age warning.
- Login and signup: OTP-first flow, password only if needed for fallback.
- Age verification: explicit legal gate, document upload, success and retry states.
- Home: location, search, featured banner, categories, top picks, reorder entry points.
- Category and search: filters, sort, availability labels, quick add.
- Product detail: bottle hero, pricing, variants, stock, delivery promise, add to cart.
- Cart and checkout: item summary, delivery fee, coupon, address, instructions, final CTA.
- Payment: method picker, status feedback, retry handling.
- Tracking: timeline, partner location, ETA, contact/support actions.
- Orders and profile: history, ratings, wallet, legal account settings.

## 2. Store Panel Screen Set

- Dashboard with today summary.
- Incoming orders queue.
- Inventory and pricing editor.
- Catalog exceptions and out-of-stock controls.
- Payout and performance views.

## 3. Delivery Partner Screen Set

- Online/offline state.
- Offer cards.
- Pickup confirmation.
- Route and map view.
- Doorstep verification.
- Earnings and settlement history.

## 4. Admin Screen Set

- Operational dashboard.
- Store onboarding and compliance review.
- Serviceability map and rule editor.
- Orders, refunds, and support.
- Analytics and report exports.

## 5. UI Behavior

- Loading states must use skeletons.
- Empty states must explain what to do next.
- Error states must be specific and recoverable.
- Critical actions must be confirmed.
