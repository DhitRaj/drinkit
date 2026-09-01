# Customer App PRD

## 1. Product Summary

The Customer App is the consumer-facing mobile experience for verified adults ordering legally permitted alcohol products from nearby licensed stores. It must feel premium, fast, and obvious to use, while enforcing age, location, sale-hours, and dry-state compliance without relying on the user to understand the regulatory model.

## 2. Product Goals

- Convert new visitors into verified adult customers with the least possible friction.
- Make browse-to-buy feel as fast and polished as a top quick-commerce app.
- Present only serviceable, legal, and in-stock options.
- Support repeat ordering, tracking, and support without forcing users back to operations.
- Build trust with clear pricing, delivery promises, and compliance messaging.

## 3. Product Principles

- Compliance is enforced server-side and echoed clearly in the UI.
- The default state is dark, premium, and bottle-first.
- Every screen needs loading, empty, success, and error states.
- A user should always know what to do next.
- Reorder, add-to-cart, and payment confirmations should be immediate and legible.

## 4. Information Architecture

Primary bottom navigation:

- Home
- Categories
- Orders
- Profile

Secondary surfaces:

- Search
- Product detail
- Cart
- Checkout
- Payment
- Notifications
- Wallet and refunds
- Support

## 5. Global Rules

- Age verification is required before browsing or ordering restricted inventory.
- Serviceability must be checked using location and address before checkout.
- Sale-hours and dry-day blocking must happen before final order placement.
- Users must never see unqualified legal claims or ambiguous copy.
- All prices, delivery fees, discounts, and totals must be transparent before payment.

## 6. Screen-by-Screen PRD

### 6.1 Onboarding

**Purpose:** Introduce Drinkit, set expectations, and push the user into signup.

**Entry points:** First app open, logged-out app relaunch, deep link from campaign.

**Key UI elements:** Brand mark, hero image, value proposition, CTA, login link, compliance microcopy.

**Content requirements:**
- Explain the app in one short sentence.
- Show fast delivery promise and legal-age requirement.
- Keep the CTA clear: Get Started.

**States:**
- Default
- Loading assets
- No internet
- Legal unavailable in region

**Acceptance criteria:**
- User can proceed to signup in one tap.
- Onboarding must not contain clutter or extra choices.

**Analytics:**
- `onboarding_viewed`
- `onboarding_cta_tapped`

### 6.2 Login and Signup

**Purpose:** Create or restore a user account using a mobile number-first flow.

**Entry points:** Onboarding, login link, session expiry.

**Key UI elements:** Mobile number input, OTP send CTA, alternate login hint, terms link.

**Validation rules:**
- Phone number must be valid for the selected country format.
- OTP should only be requested for valid mobile input.
- Rate limiting must be visible and enforced.

**States:**
- Empty
- Filled
- Invalid number
- OTP requested
- OTP send failed
- Resend cooldown

**Acceptance criteria:**
- Signup must complete through OTP without unnecessary branching.
- Login and signup should feel like one flow, not two separate products.

**Analytics:**
- `signup_started`
- `otp_requested`
- `signup_completed`

### 6.3 OTP Verification

**Purpose:** Verify the phone number and bind the session.

**Entry points:** Successful OTP send.

**Key UI elements:** OTP boxes, resend timer, edit number action, submit button, auto-read support.

**Validation rules:**
- OTP length and numeric format must be fixed.
- Wrong OTP attempts should be limited.
- Auto-submit only after all digits are entered.

**States:**
- Idle
- Typing
- Auto-read complete
- Wrong OTP
- Too many attempts
- Resend available
- Verification loading
- Verified

**Edge cases:**
- OTP arrives after user edits number.
- Network drops during verification.
- Resend clicked before cooldown ends.

**Analytics:**
- `otp_verified`
- `otp_failed`

### 6.4 Age Verification

**Purpose:** Ensure the user is legally eligible to browse and order alcohol.

**Entry points:** Post-login gate, settings re-check, age-rule change, KYC review retry.

**Key UI elements:** Age statement, document method selector, upload or verification action, success state, retry CTA.

**Validation rules:**
- Age must be validated against the applicable state rule.
- The user must not reach shopping screens until verification passes.
- Rejected documents must display a reason and retry path.

**States:**
- Pre-check
- Method selection
- Upload/submit
- Under review
- Approved
- Rejected
- Needs retry

**Acceptance criteria:**
- A failed verification blocks progression and explains why.
- Approved users should continue immediately to serviceability.

**Analytics:**
- `age_verification_started`
- `age_verification_submitted`
- `age_verification_passed`
- `age_verification_failed`

### 6.5 Location Permission and Serviceability

**Purpose:** Confirm whether the user is in a deliverable legal zone.

**Entry points:** After verification, on app open, before checkout, address selection.

**Key UI elements:** Location banner, address selector, serviceability result, blocked state message, next-open-time if applicable.

**Validation rules:**
- The app must distinguish between permission denied and genuine serviceability failure.
- Dry-state, out-of-zone, and outside-hours states must be different.

**States:**
- Permission prompt
- Permission granted
- Permission denied
- Serviceable
- Not serviceable
- Dry state blocked
- Outside sale hours

**Acceptance criteria:**
- User always sees a reason for blockage.
- The app must not allow checkout when blocked.

**Analytics:**
- `location_permission_result`
- `serviceability_checked`
- `dry_state_blocked`

### 6.6 Home and Dashboard

**Purpose:** Act as the main discovery and repeat-purchase surface.

**Entry points:** Successful login, app reopen, category back-navigation, reorder entry.

**Key UI elements:** Location header, search bar, hero banner, category rail, top picks, reorder cards, offers, support shortcut.

**Content requirements:**
- Show the current serviceable zone and ETA promise.
- Highlight categories and fast access to recent purchases.
- Use one primary CTA style consistently.

**States:**
- Loading skeleton
- Ready
- Empty catalog
- No serviceable stores
- Maintenance message

**Acceptance criteria:**
- Home should let users start shopping without extra navigation.
- Reorder entry should be obvious and one-tap reachable.

**Analytics:**
- `home_viewed`
- `banner_clicked`
- `category_clicked`
- `reorder_tapped`

### 6.7 Categories

**Purpose:** Let users browse by alcohol type and quickly narrow the catalog.

**Entry points:** Bottom nav, home category rail, search filters.

**Key UI elements:** Category cards, product counts, filters, sort trigger, availability labels.

**Validation rules:**
- Category content must reflect state rules and store inventory.
- Restricted categories should be hidden or blocked when not legal.

**States:**
- Category loading
- Product list loaded
- Zero products
- All items out of stock

**Acceptance criteria:**
- User can move from category to PDP in at most two taps.

**Analytics:**
- `category_viewed`
- `category_filter_applied`

### 6.8 Search Results

**Purpose:** Support brand-led and intent-led discovery.

**Entry points:** Home search, category search, no-result recovery.

**Key UI elements:** Search input, suggestions, filters, sort, result list, recent searches.

**Validation rules:**
- Search should ignore obviously invalid queries.
- Results must respect compliance, serviceability, and stock.

**States:**
- Typing suggestions
- Results found
- No results
- Search error

**Edge cases:**
- Typo-heavy queries.
- A product exists but is unavailable in current zone.
- Zero-result fallback needs recovery actions.

**Analytics:**
- `search_performed`
- `search_result_clicked`

### 6.9 Product Detail

**Purpose:** Convince the user to add a product to cart with clear pricing and product information.

**Entry points:** Category, search, banner, reorder, wishlist, recommendation.

**Key UI elements:** Bottle hero, name, price, MRP, discounts, ABV, volume, description, stock, delivery promise, qty stepper, add-to-cart CTA, related products.

**Validation rules:**
- Price must match current store price.
- Stock state must be current.
- Restricted products must display any legal limitations.

**States:**
- Available
- Low stock
- Out of stock
- Price changed
- Restricted

**Acceptance criteria:**
- Price and stock information should be unambiguous.
- Add-to-cart should not require a separate confirmation screen.

**Analytics:**
- `product_viewed`
- `product_added_to_cart`
- `product_removed_from_cart`

### 6.10 Cart

**Purpose:** Let the user review items, quantity, fees, and discounts before checkout.

**Entry points:** Add-to-cart, mini cart, product page, reorder.

**Key UI elements:** Item list, quantity controls, price summary, coupon entry, delivery fee, subtotal, total, checkout CTA.

**Validation rules:**
- Cart must reprice on stock or fee changes.
- The user must see removed or changed items immediately.
- Coupon eligibility must be validated server-side.

**States:**
- Full cart
- Empty cart
- Repriced cart
- Coupon applied
- Coupon rejected

**Edge cases:**
- Item goes out of stock after adding.
- Delivery fee changes with distance or surge.
- Min order value not met.

**Analytics:**
- `cart_viewed`
- `coupon_applied`
- `coupon_rejected`

### 6.11 Checkout

**Purpose:** Collect address, instructions, and final order confirmation.

**Entry points:** Cart CTA.

**Key UI elements:** Delivery address, address edit, delivery instructions, order summary, fee breakdown, legal reminder, place order CTA.

**Validation rules:**
- Address must be serviceable.
- Checkout must re-check sale hours and dry-day compliance.
- The final payable amount must be exact before payment.

**States:**
- Address selected
- Address missing
- Address invalid
- Compliance blocked
- Ready to pay

**Acceptance criteria:**
- The user should never be surprised by a hidden fee after checkout.

**Analytics:**
- `checkout_started`
- `address_selected`

### 6.12 Payment

**Purpose:** Collect payment through supported methods and confirm order creation.

**Entry points:** Checkout.

**Key UI elements:** Amount due, payment methods, add card, UPI apps, retry surface, secure payment messaging.

**Validation rules:**
- Payment must be server-confirmed.
- Failed payment must not create a successful order state.
- Retry should preserve cart and checkout context.

**States:**
- Payment method selection
- Processing
- Success
- Failure
- Timeout

**Acceptance criteria:**
- Payment success should immediately transition the user to order confirmation or tracking.

**Analytics:**
- `payment_method_selected`
- `payment_attempted`
- `payment_succeeded`
- `payment_failed`

### 6.13 Order Confirmation and Tracking

**Purpose:** Show live order progress from acceptance to delivery.

**Entry points:** Successful payment, order history, notifications.

**Key UI elements:** Order ID, status timeline, ETA, map, store state, partner state, contact support, cancel rules if any.

**Validation rules:**
- Status changes must follow the backend order state machine.
- Tracking data must be current and not misleading.

**States:**
- Confirmed
- Accepted
- Packed
- Picked up
- Near you
- Delivered
- Cancelled

**Edge cases:**
- No GPS temporarily.
- Partner delayed.
- Customer unavailable.

**Analytics:**
- `order_placed`
- `order_accepted`
- `order_packed`
- `order_picked_up`
- `order_delivered`
- `order_cancelled`
- `order_tracking_viewed`

### 6.14 Order History

**Purpose:** Let users review past orders and reorder quickly.

**Entry points:** Bottom nav, profile, post-delivery CTA.

**Key UI elements:** Order cards, status chips, totals, reorder button, invoice/support links.

**States:**
- Empty history
- Completed orders list
- Cancelled orders list
- Refund pending

**Acceptance criteria:**
- Each order card should make reorder or support actions obvious.

**Analytics:**
- `reorder_tapped`
- `order_rated`

### 6.15 Wallet and Refunds

**Purpose:** Show credits, refunds, and payment adjustments.

**Entry points:** Order detail, profile, support, payment reversal.

**Key UI elements:** Balance, credit ledger, refund status, source/destination, explanation text.

**Validation rules:**
- Refund state must match payment backend state.
- Wallet credits and source refunds must be clearly differentiated.

**States:**
- No balance
- Active balance
- Refund initiated
- Refund completed
- Refund failed

**Analytics:**
- `wallet_viewed`
- `refund_initiated`
- `refund_completed`

### 6.16 Notifications

**Purpose:** Keep the user informed about order, payment, support, and account events.

**Entry points:** Push, in-app inbox, order flow.

**Key UI elements:** Notification list, filters, unread indicator, action links.

**States:**
- Empty inbox
- Transactional alert
- Promotional alert
- Read/unread

**Acceptance criteria:**
- Critical transactional alerts must be easy to recognize.

**Analytics:**
- `push_received`
- `push_opened`

### 6.17 Profile and Settings

**Purpose:** Let the user manage addresses, account details, preferences, and support access.

**Entry points:** Bottom nav, account menu, support links.

**Key UI elements:** Profile summary, saved addresses, verification status, settings, help, logout.

**Validation rules:**
- Users should not be allowed to edit legal identity fields without re-verification rules.

**States:**
- Signed in
- Verification pending
- Verification expired
- Logged out

**Acceptance criteria:**
- Support and account settings must be reachable without searching.

## 7. Cross-Cutting Requirements

### 7.1 UX and UI

- Premium dark visual language.
- High contrast for all primary actions.
- Clear hierarchy between price, product name, and action.
- Bottom nav must remain stable across all browsing states.

### 7.2 Compliance and Trust

- Show age-related warnings where relevant.
- Keep location and legal blocks explanatory, not punitive.
- Never imply delivery is possible where it is not.

### 7.3 Accessibility

- All actions need visible labels and large enough touch targets.
- Error states must be readable without relying only on color.

### 7.4 Analytics

- Every major screen should be measurable.
- Server-side events are source of truth for order and payment states.

### 7.5 Edge Case Handling

- App should survive weak network conditions.
- State changes must persist if the user backgrounds the app.
- Payment, order, and verification flows must be recoverable.

## 8. Non-Functional Requirements

- The app must feel responsive on low-end devices.
- Content should load progressively with skeletons.
- Errors must be actionable, not generic.
- Critical flows should not depend on speculative client state.

## 9. Launch Acceptance Criteria

- A verified user can complete signup, verification, browse, checkout, pay, and track a delivered order.
- Dry-state and sale-hour rules block orders correctly.
- Store and rider updates are reflected in the tracking UI.
- Refunds and support are visible in the account experience.
- No screen should ship without a defined empty and error state.
