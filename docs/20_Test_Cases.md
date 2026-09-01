# 20. Test Cases

## 1. Purpose

This document defines the minimum QA and validation matrix for Drinkit across customer, store, delivery partner, and admin surfaces. The goal is to prove that core commerce, compliance, and operational flows work reliably before release and remain stable after changes.

## 2. Test Strategy

- Test the full happy path for each user role.
- Test every compliance gate as a hard stop.
- Test every money-moving action with success, failure, timeout, and retry cases.
- Test state recovery after app reopen, network loss, and partial backend failures.
- Test both client-visible behavior and server-state transitions.

## 3. Test Coverage Matrix

### 3.1 Customer App

| Area | Must Cover |
|---|---|
| Onboarding | brand screen, CTA, permission prompts, deep links |
| Login and OTP | valid OTP, wrong OTP, resend timer, rate limit, session restore |
| Age verification | approval, rejection, retry, document unreadable, underage blocked |
| Location gating | permission granted/denied, dry state, out of zone, sale hours blocked |
| Home and discovery | banners, categories, reorder, search, zero results, OOS states |
| PDP | price, MRP strike, stock, low stock, restricted item messaging |
| Cart and checkout | repricing, coupon apply/reject, minimum order, fee updates |
| Payment | success, failure, timeout, reopen app, gateway webhook delay |
| Tracking | accepted, packed, picked up, delivered, cancelled, delayed, return flow |
| Orders and refunds | receipt, history, reorder, refund states, wallet vs source refund |

### 3.2 Store Panel

| Area | Must Cover |
|---|---|
| Dashboard | live stats, alerting, empty day, data delay |
| Incoming orders | accept, reject, pack, partial stock, order cancellation |
| Inventory | mark in stock, mark out of stock, bulk update, sync failure |
| Pricing | valid change, invalid change, MRP guardrail, audit log |
| Store hours | open, closed, holiday, emergency pause, rule conflict |
| Payouts | pending, paid, adjustment, dispute, export |

### 3.3 Delivery Partner App

| Area | Must Cover |
|---|---|
| Login | OTP login, blocked account, session restore |
| Duty toggle | online, offline, forced offline, active-trip lock |
| Assignment offers | accept, decline, timeout, reassign, payout display |
| Pickup | arrival, wait state, handoff, partial readiness |
| Navigation | map load, GPS weak, route recalculation, app background |
| Doorstep verification | valid ID, invalid ID, refusal, intoxication, unreadable document |
| Earnings | trip earnings, daily total, weekly settlement, payout delay |

### 3.4 Admin Panel

| Area | Must Cover |
|---|---|
| Dashboard | operational health, alert severity, data freshness |
| Users | lookup, review, suspension, restore, audit trail |
| Stores | onboarding, approval, suspension, license expiry |
| Orders | intervention, refund, cancellation, state mismatch |
| Delivery partners | onboarding, suspension, document expiry, incident review |
| Compliance | rule changes, dry-day calendar, geofence, audit export |
| Coupons | create, pause, expiry, exhaustion, abuse checks |
| Reports | date filters, exports, permissions, reproducibility |
| Support | ticket assignment, notes, escalation, resolution, reopen |

## 4. Critical Test Scenarios

### 4.1 Authentication and Session

1. User enters valid number and receives OTP.
2. User enters wrong OTP three times and sees retry restriction.
3. User kills app after OTP request and returns with session intact or gracefully reset.
4. User tries to access restricted screens without login.
5. Partner account is blocked and cannot access active duty.

### 4.2 Age Verification and Compliance

1. User passes age verification and proceeds to store browsing.
2. User submits unreadable document and receives retry feedback.
3. User is under legal drinking age for the state and is blocked.
4. User is in a dry state and the app blocks serviceability.
5. Sale hours expire while the user is in checkout and order placement is blocked.
6. Doorstep ID verification fails and delivery cannot be completed.

### 4.3 Discovery and Cart

1. User loads home screen with serviceable store and featured content.
2. User searches a valid brand and sees ranked results.
3. User searches a non-existent brand and receives zero-result recovery.
4. User adds an in-stock product to cart and quantity updates correctly.
5. Product goes out of stock after being added and cart reflects the change.
6. Price changes before checkout and the cart is repriced before payment.

### 4.4 Checkout and Payment

1. User reaches checkout with a valid serviceable address.
2. User tries checkout with an invalid or missing address.
3. Coupon applies successfully and total recalculates.
4. Coupon is rejected for usage limit or minimum order mismatch.
5. Payment succeeds and order is created once only.
6. Payment times out and user can safely retry without duplicate order creation.
7. Payment success webhook arrives late and backend reconciliation still closes correctly.

### 4.5 Order Fulfillment

1. Store accepts order within SLA.
2. Store rejects order for stock-out or closing.
3. Store packs order and partner pickup becomes available.
4. Partner picks up order and tracking updates on customer app.
5. Partner reaches customer and completes valid ID check.
6. Partner fails ID check and order moves to return flow.
7. Order is cancelled by system due to store or partner failure and user sees correct reason.

### 4.6 Refunds and Reversals

1. Full refund is issued for cancelled paid order.
2. Partial refund is issued when applicable.
3. Refund is credited to source or wallet as selected by policy.
4. Refund status remains pending until payment backend confirms completion.
5. Refund failure is visible to support and admin.

### 4.7 Store Operations

1. Store opens dashboard and sees live order queue.
2. Store accepts, packs, and hands off an order.
3. Store marks item out of stock and customer-facing availability updates.
4. Store bulk-updates inventory and sync completes.
5. Store attempts invalid price update and receives a policy block.
6. Store closes for holiday and no new orders are accepted.

### 4.8 Delivery Partner Operations

1. Partner goes online only after required verification is complete.
2. Partner accepts a delivery offer within expiry window.
3. Partner declines and the system offers next candidate.
4. Partner navigates with weak GPS and the app remains usable.
5. Partner performs doorstep verification successfully.
6. Partner returns order to store after failed verification.

### 4.9 Admin Operations

1. Admin finds a user and reviews account history.
2. Admin reviews store license and pauses a suspended store.
3. Admin intervenes in a stuck order and sees audit logging.
4. Admin exports a compliance report within permissions.
5. Admin creates or pauses a coupon with proper validation.
6. Admin resolves a support ticket and closes it with reason.

## 5. Edge Cases

- App reopen during payment processing.
- Duplicate webhook delivery from payment gateway.
- Customer changes address after cart is built.
- Store inventory changes after order acceptance but before pickup.
- Partner app loses connectivity during pickup or ID verification.
- Order remains stuck in a state beyond SLA and should trigger alerting.
- User gets serviceability approval in one screen and blocked state in another because location changed.
- Admin action is attempted without sufficient role permissions.
- Coupon appears active in UI but is already exhausted server-side.
- Report export is requested by a user without permission.

## 6. Negative Test Cases

### 6.1 Security and Abuse

- Invalid login attempts are rate limited.
- Expired session cannot access protected routes.
- Role escalation is denied.
- Sensitive documents are not exposed in analytics or logs.
- Refund cannot be approved without ticket or policy context where required.

### 6.2 Compliance

- Dry-state user cannot bypass location gating.
- Underage user cannot proceed after age verification failure.
- Doorstep delivery cannot complete if ID check fails.
- Store cannot accept orders outside legal hours if blocked by rule engine.
- Admin cannot disable compliance checks without explicit policy support.

### 6.3 Data Integrity

- Order totals must match between checkout, payment, and order detail.
- Refund totals must match approved amount.
- Payout and settlement summaries must reconcile with completed orders.
- Event timestamps must remain monotonic enough to support audits.

## 7. Test Data Requirements

- Verified adult customer accounts.
- Underage or blocked customer fixtures.
- Serviceable and non-serviceable addresses.
- Dry-state and sale-hour blocked test fixtures.
- Stores with valid, expired, and suspended licenses.
- Partners in active, suspended, and blocked states.
- Orders in each state of the lifecycle.
- Coupon fixtures for valid, expired, exhausted, and ineligible scenarios.

## 8. Acceptance Criteria

- Every critical flow has at least one happy-path and one failure-path test.
- Every compliance gate is tested as a hard stop.
- Every payment and refund flow is reconciled to backend truth.
- Every order state transition is validated against the state machine.
- Every major role has end-to-end test coverage.

## 9. Release Gates

- No release without passing authentication, compliance, payment, and delivery critical tests.
- No release if doorstep ID failure can still hand over an order.
- No release if payment double-creation or duplicate order creation is possible.
- No release if admin permissions allow unsafe state changes.
- No release if analytics instrumentation is missing from critical flows.

## 10. QA Ownership

| Area | Owner |
|---|---|
| Customer app flows | QA + Product |
| Store panel flows | QA + Ops |
| Delivery partner flows | QA + Fleet/Ops |
| Admin flows | QA + Compliance |
| Payments and refunds | QA + Finance |
| Analytics instrumentation | QA + Data |

## 11. Automation Priority

1. Authentication and session recovery.
2. Age verification and compliance blocking.
3. Checkout, payment, and order creation.
4. Store acceptance and partner pickup.
5. Doorstep verification and return flow.
6. Refund and reversal flows.
7. Admin permissions and audit logging.

## 12. Notes

- Test cases should be mapped to automated suites where feasible.
- Manual QA should focus on visual state, timing, and device/network variability.
- Any production incident should result in new or updated test coverage.
