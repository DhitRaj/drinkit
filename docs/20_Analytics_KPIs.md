# 20. Analytics & KPIs — Measurement Plan

**Product:** Drinkit — Hyperlocal Liquor Delivery (India)
**Version:** 1.0 | **Owner:** Product & Data | **Status:** Approved for build
**Related docs:** `docs/21_Task.md`, `docs/20_Test_Cases.md`, `docs/22_Roadmap.md`

---

## 1. Measurement Philosophy

Drinkit operates a regulated, three-sided marketplace (customers, stores, delivery partners) in a category with strict compliance requirements. Our measurement plan therefore tracks four things with equal seriousness:

1. **Growth** — are we acquiring and retaining verified adult customers?
2. **Marketplace health** — are stores and delivery partners supplied, utilized, and earning?
3. **Unit economics** — does each delivered order contribute margin?
4. **Compliance** — are age verification, dry-state geofencing, and permitted-hours rules working at 100%?

Every event and KPI below maps to one of these pillars. Compliance metrics are **non-negotiable guardrails**: no experiment or growth initiative may degrade them.

---

## 2. North Star Metric

> **Weekly Delivered Orders (WDO)** — count of orders with status `DELIVERED` in a rolling 7-day window, deduplicated per order ID, excluding test/internal orders.

**Why WDO:** it requires every part of the system to work — a verified customer, in-stock catalog, a store that accepted and packed, a partner who delivered with successful doorstep ID check, and a completed payment. It correlates directly with GMV, retention, and partner earnings, and is resistant to vanity inflation (installs, sessions, GMV from cancelled orders all fail to move it).

**Supporting definition rules:**
- Counted at delivery timestamp (Asia/Kolkata), not order-placed timestamp.
- Orders refunded in full within 24h of delivery are still counted in WDO but flagged in a companion metric, **Quality-Adjusted WDO** = WDO − full refunds.
- Target trajectory (see `docs/22_Roadmap.md`): 500 WDO at MVP exit, 2,500 at V1.1 exit, 15,000 at V2 exit.

---

## 3. KPI Tree

```
Weekly Delivered Orders (North Star)
├── Acquisition
│   ├── Installs (by channel)
│   ├── Install → Signup conversion
│   ├── Signup → Age-verification pass rate
│   └── CAC (blended & by channel)
├── Activation
│   ├── First-order conversion (verified user → 1st delivered order, 7d)
│   ├── Time to first order (median hours from verification)
│   └── First-session catalog engagement (viewed ≥3 PDPs)
├── Retention
│   ├── Repeat rate (2nd order within 30d of 1st)
│   ├── Monthly cohort retention (M1, M2, M3)
│   ├── Order frequency (orders/active customer/month)
│   └── Churn (no order in 60d among prior purchasers)
├── Monetization
│   ├── GMV (delivered)
│   ├── AOV
│   ├── Take rate (commission + delivery fee + ad revenue as % GMV)
│   ├── Contribution margin per order
│   └── Wallet/coupon burn as % GMV
├── Ops Quality
│   ├── Store order acceptance rate
│   ├── Delivery time p50 / p90 (placed → delivered)
│   ├── Cancellation rate (by actor: customer / store / partner / system)
│   ├── Refund rate & refund TAT
│   └── Doorstep ID-verification failure rate (compliance guardrail)
├── Delivery Partner
│   ├── Utilization (% online time on active task)
│   ├── Earnings per hour (median)
│   ├── Orders per partner per shift
│   └── Weekly active partner retention
└── Store
    ├── Acceptance SLA compliance (% accepted < 2 min)
    ├── Stock-out rate (% PDP views on OOS items; % orders with item removed)
    ├── Pack time p50 / p90
    └── Catalog accuracy (price/label mismatch complaints per 1k orders)
```

---

## 4. KPI Definitions, Targets & Owners

### 4.1 Acquisition

| KPI | Definition | Formula | MVP Target | Owner |
|---|---|---|---|---|
| Installs | First app opens (attributed) | Count of `app_first_open` | 10k/month in launch city | Growth |
| Signup conversion | Installs completing OTP signup | `signup_completed` / `app_first_open` | ≥ 45% | Growth |
| **Age-verification pass rate** | Verified adults among attempted verifications | `age_verification_passed` / `age_verification_submitted` | 80–90% (watch both tails*) | Product + Compliance |
| Verification drop-off | Users who abandon mid-verification | 1 − (`submitted` / `started`) | ≤ 20% | Product |
| CAC | Marketing spend / new verified customers | Spend / new `age_verification_passed` | ≤ ₹350 | Growth |

*A pass rate near 100% suggests verification is too weak; below 70% suggests UX friction or OCR issues. Investigate both directions.

### 4.2 Activation

| KPI | Definition | MVP Target | Owner |
|---|---|---|---|
| First-order conversion (7d) | % of verified users placing a delivered order within 7 days | ≥ 35% | Product |
| Time to first order | Median hours, verification → first delivered order | ≤ 48h | Product |
| First-session depth | % of first sessions with ≥3 `product_viewed` | ≥ 60% | Product |
| Serviceability hit rate | % of location checks inside a serviceable zone | ≥ 85% (in-city marketing) | Ops |

### 4.3 Retention

| KPI | Definition | MVP Target | Owner |
|---|---|---|---|
| Repeat rate (30d) | % of first-order customers with a 2nd delivered order in 30d | ≥ 40% | Product |
| M1 cohort retention | % of a signup-month cohort ordering in month+1 | ≥ 30% | Product |
| M3 cohort retention | Same, month+3 | ≥ 20% | Product |
| Order frequency | Delivered orders / monthly active customer | ≥ 2.2 | Product |
| Reactivation rate | Churned users (60d) who order after win-back campaign | ≥ 8% | CRM |

Cohorts are cut by **first-order month**, and secondarily by acquisition channel, store zone, and first-category purchased (beer / whisky / wine / etc.). Category-of-first-purchase is a leading indicator worth watching — frequency profiles differ sharply.

### 4.4 Monetization & Unit Economics

| KPI | Definition | MVP Target | Owner |
|---|---|---|---|
| GMV (delivered) | Σ item value + fees of delivered orders, pre-discount | ₹ tracked weekly | Finance |
| AOV | GMV / delivered orders | ₹1,100–1,400 | Product |
| Take rate | (store commission + delivery fee + surge + ad revenue) / GMV | ≥ 14% | Finance |
| Contribution margin / order | Take − (partner payout + payment gateway fee + refunds + support cost + packaging) | ≥ ₹0 by Sprint 8; ≥ ₹25 by V1.1 | Finance |
| Discount burn | (coupons + wallet promo credits) / GMV | ≤ 8% | Growth |
| Payment success rate | `payment_succeeded` / `payment_attempted` | ≥ 92% (UPI), ≥ 85% (cards) | Payments eng |

### 4.5 Ops Quality

| KPI | Definition | MVP Target | Owner |
|---|---|---|---|
| Store acceptance rate | Orders accepted / orders routed to store | ≥ 95% | Ops |
| Delivery time p50 | Median, `order_placed` → `order_delivered` | ≤ 35 min | Ops |
| Delivery time p90 | 90th percentile, same | ≤ 55 min | Ops |
| Cancellation rate | Cancelled / placed, split by actor | ≤ 5% total; ≤ 2% store-initiated | Ops |
| Refund rate | Orders with any refund / delivered orders | ≤ 3% | Support |
| Refund TAT | Median hours, refund approved → credited | ≤ 24h (wallet), ≤ 120h (source) | Payments |
| **Doorstep ID failure rate** | Deliveries aborted at doorstep for failed/refused ID check | Tracked, expected < 1%; **100% of failures must result in return-to-store, zero handovers** | Compliance |
| Order accuracy | Orders without item complaint / delivered | ≥ 98% | Ops |

### 4.6 Delivery Partner

| KPI | Definition | MVP Target | Owner |
|---|---|---|---|
| Utilization | Active-task minutes / online minutes | 45–65% (band, not max) | Ops |
| Earnings per hour | Median payout incl. incentives / online hour | ≥ ₹120 | Ops |
| Orders per shift | Delivered orders / partner shift | ≥ 2.5 | Ops |
| Partner weekly retention | Partners active this week who were active last week | ≥ 80% | Ops |
| Assignment acceptance | Offers accepted / offers sent (partner) | ≥ 85% | Ops |

### 4.7 Store

| KPI | Definition | MVP Target | Owner |
|---|---|---|---|
| Acceptance SLA | % orders accepted within 2 min of routing | ≥ 90% | Ops |
| Stock-out rate (demand-weighted) | % PDP views landing on OOS items | ≤ 6% | Catalog |
| Mid-order stock-out | % orders with ≥1 item removed after acceptance | ≤ 2% | Catalog |
| Pack time p50 / p90 | Accept → marked-packed | ≤ 6 / ≤ 12 min | Ops |
| Catalog accuracy | Price/label mismatch tickets per 1,000 orders | ≤ 5 | Catalog |

---

## 5. Event Taxonomy

**Conventions**
- Event names: `snake_case`, `object_verb` past tense (`order_placed`, not `place_order`).
- All events carry **standard properties**: `user_id` (hashed), `session_id`, `platform` (`ios`/`android`/`web`), `app_version`, `city_id`, `zone_id`, `timestamp` (UTC, displayed IST), `experiment_flags`.
- Server-side events are source of truth for money and order-state; client events are for funnel/UX. Never compute revenue from client events.
- PII rule: never log raw ID-document numbers, images, DOB, or phone numbers in analytics — only booleans/enums (`verification_method`, `verification_result`).

### 5.1 Customer App — Acquisition & Onboarding

| Event | Trigger | Key Properties | Platform / Source |
|---|---|---|---|
| `app_first_open` | First launch after install | `attribution_source`, `campaign`, `device_model` | Client |
| `app_opened` | Any launch / foreground | `launch_type` (cold/warm/push), `push_campaign_id` | Client |
| `signup_started` | Phone entry screen shown | `entry_point` | Client |
| `otp_requested` | User taps "Send OTP" | `attempt_number` | Client + Server |
| `otp_verified` | OTP accepted | `attempts_used`, `auto_read` (bool) | Server |
| `signup_completed` | Account created | `referral_code_used` (bool) | Server |
| `age_verification_started` | Verification screen shown | `method` (dob_declaration/id_upload/digilocker) | Client |
| `age_verification_submitted` | Docs/DOB submitted | `method` | Server |
| `age_verification_passed` | Verification approved | `method`, `latency_ms`, `manual_review` (bool) | Server |
| `age_verification_failed` | Rejected | `reason` (underage/doc_unreadable/mismatch/expired_doc) | Server |
| `location_permission_result` | OS permission dialog resolved | `granted` (bool) | Client |
| `serviceability_checked` | Address/pin resolved to zone | `serviceable` (bool), `reason_if_not` (dry_state/out_of_zone/outside_hours) | Server |
| `dry_state_blocked` | User location in prohibited state | `state_code` | Server |

### 5.2 Customer App — Catalog, Search, Cart

| Event | Trigger | Key Properties | Platform / Source |
|---|---|---|---|
| `home_viewed` | Home screen rendered | `store_id`, `eta_shown_min`, `banners_shown[]` | Client |
| `category_viewed` | Category listing opened | `category_id`, `sort`, `filters{}` | Client |
| `search_performed` | Query submitted / debounced | `query`, `results_count`, `zero_results` (bool) | Client + Server |
| `search_result_clicked` | Tap on result | `query`, `product_id`, `position` | Client |
| `product_viewed` | PDP rendered | `product_id`, `brand`, `category`, `price`, `in_stock`, `source` (search/category/banner/reorder) | Client |
| `product_added_to_cart` | Add-to-cart tap | `product_id`, `qty`, `price`, `source` | Client |
| `product_removed_from_cart` | Remove/decrement to 0 | `product_id`, `reason` (user/oos/price_change) | Client + Server |
| `cart_viewed` | Cart screen opened | `item_count`, `cart_value`, `oos_items_count` | Client |
| `cart_price_changed` | Server repriced cart item | `product_id`, `old_price`, `new_price` | Server |
| `coupon_applied` | Coupon accepted | `coupon_code`, `discount_amount` | Server |
| `coupon_rejected` | Coupon invalid | `coupon_code`, `reason` (expired/min_order/usage_limit/user_ineligible) | Server |

### 5.3 Customer App — Checkout, Payment, Order

| Event | Trigger | Key Properties | Platform / Source |
|---|---|---|---|
| `checkout_started` | Checkout screen opened | `cart_value`, `item_count`, `eta_min` | Client |
| `address_selected` | Delivery address confirmed | `address_type`, `distance_from_store_km` | Client |
| `payment_method_selected` | Method chosen | `method` (upi/card/netbanking/wallet/cod_disallowed) | Client |
| `payment_attempted` | Payment initiated with gateway | `method`, `amount`, `gateway`, `order_id` | Server |
| `payment_succeeded` | Gateway webhook confirmed | `method`, `amount`, `latency_ms`, `retry_count` | Server |
| `payment_failed` | Gateway failure/timeout | `method`, `failure_code`, `is_timeout` (bool) | Server |
| `order_placed` | Order created post-payment | `order_id`, `store_id`, `gmv`, `items[]`, `delivery_fee`, `discount`, `surge` (bool) | Server |
| `order_accepted` | Store accepted | `order_id`, `accept_latency_s` | Server |
| `order_packed` | Store marked packed | `order_id`, `pack_time_s`, `items_removed_count` | Server |
| `order_picked_up` | Partner picked up | `order_id`, `partner_id`, `wait_at_store_s` | Server |
| `order_delivered` | Doorstep handover complete | `order_id`, `total_time_s`, `id_check_result` | Server |
| `order_cancelled` | Any cancellation | `order_id`, `actor` (customer/store/partner/system), `stage`, `reason` | Server |
| `order_tracking_viewed` | Tracking screen opened | `order_id`, `order_status`, `map_shown` (bool) | Client |
| `refund_initiated` | Refund created | `order_id`, `amount`, `destination` (wallet/source), `reason` | Server |
| `refund_completed` | Refund settled | `order_id`, `tat_hours` | Server |
| `order_rated` | Rating submitted | `order_id`, `stars`, `tags[]` | Client |
| `reorder_tapped` | Reorder from history | `source_order_id` | Client |

### 5.4 Customer App — Wallet, Referral, Notifications

| Event | Trigger | Key Properties | Platform / Source |
|---|---|---|---|
| `wallet_viewed` | Wallet screen opened | `balance` | Client |
| `wallet_topped_up` | Top-up succeeded | `amount`, `method` | Server |
| `wallet_debited` | Wallet used in order | `amount`, `order_id` | Server |
| `referral_shared` | Share sheet invoked | `channel` | Client |
| `referral_converted` | Referee's first delivered order | `referrer_id`, `reward_amount` | Server |
| `push_received` / `push_opened` | Notification delivered/opened | `campaign_id`, `type` (transactional/promo) | Client |
| `notification_optout_changed` | Preference toggled | `channel`, `new_state` | Client |

### 5.5 Store Panel

| Event | Trigger | Key Properties | Platform / Source |
|---|---|---|---|
| `store_session_started` | Staff login | `store_id`, `role` | Server |
| `store_order_received` | New order alert shown | `order_id`, `alert_channel` (screen/sound) | Client (web) |
| `store_order_accepted` | Accept tapped | `order_id`, `latency_s` | Server |
| `store_order_rejected` | Reject tapped | `order_id`, `reason` (oos/closing/overloaded) | Server |
| `store_item_marked_oos` | Item toggled out-of-stock | `product_id`, `context` (proactive/during_order) | Server |
| `store_item_substituted_removed` | Item removed from live order | `order_id`, `product_id` | Server |
| `store_order_packed` | Packed confirmed | `order_id`, `pack_time_s` | Server |
| `store_inventory_updated` | Bulk stock/price edit | `items_changed`, `method` (csv/manual/api) | Server |
| `store_hours_changed` | Open hours or holiday toggled | `store_id`, `change_type` | Server |
| `store_payout_viewed` | Earnings/settlement screen opened | `store_id`, `period` | Client (web) |

### 5.6 Delivery Partner App

| Event | Trigger | Key Properties | Platform / Source |
|---|---|---|---|
| `partner_online` / `partner_offline` | Duty toggle | `partner_id`, `zone_id`, `shift_id` | Server |
| `assignment_offered` | Order offered to partner | `order_id`, `distance_to_store_km`, `payout_shown` | Server |
| `assignment_accepted` / `assignment_declined` | Response or timeout | `order_id`, `response_latency_s`, `decline_reason` | Server |
| `partner_arrived_store` | Geofence entry / manual tap | `order_id`, `travel_time_s` | Client + Server |
| `pickup_confirmed` | Order handover scan/OTP at store | `order_id` | Server |
| `partner_arrived_customer` | Geofence entry / manual tap | `order_id` | Client + Server |
| `id_check_started` | Doorstep verification opened | `order_id`, `method` (scan/manual_dob) | Client |
| `id_check_passed` | Customer ID verified at door | `order_id`, `method` | Server |
| `id_check_failed` | ID refused/underage/mismatch | `order_id`, `reason` (refused/underage/mismatch/intoxicated) | Server |
| `delivery_completed` | Handover confirmed (OTP) | `order_id`, `distance_km`, `payout` | Server |
| `return_to_store_started` / `return_completed` | Failed delivery return flow | `order_id`, `reason` | Server |
| `partner_earnings_viewed` | Earnings screen opened | `period` | Client |
| `partner_payout_processed` | Weekly payout settled | `amount`, `orders_count` | Server |

### 5.7 Admin Panel (audit-grade, server-side only)

| Event | Trigger | Key Properties |
|---|---|---|
| `admin_action_performed` | Any mutating admin action | `admin_id`, `action`, `entity_type`, `entity_id`, `before/after` (in audit log, not analytics) |
| `manual_verification_reviewed` | Age-doc manual review decision | `reviewer_id`, `decision`, `queue_wait_min` |
| `refund_approved` / `refund_denied` | Support decision | `ticket_id`, `order_id`, `amount` |
| `store_onboarded` / `store_suspended` | Lifecycle change | `store_id`, `reason` |
| `partner_onboarded` / `partner_suspended` | Lifecycle change | `partner_id`, `reason` |

---

## 6. Dashboard Specifications

### 6.1 Executive Dashboard (weekly review; Metabase)

- **Headline tiles:** WDO (+WoW%), Quality-Adjusted WDO, GMV, AOV, contribution margin/order, verified customer count.
- **Trends (13 weeks):** WDO, GMV, new verified customers, repeat rate.
- **Cohort grid:** monthly retention M0–M6.
- **Guardrail strip (red/green):** age-verification pass rate, doorstep ID failure handovers (must be 0), dry-state block correctness, cancellation rate, refund rate.
- Filters: city, zone. Refresh: daily 6:00 IST; reviewed Mondays.

### 6.2 Ops Dashboard (real-time; Metabase + live ops board)

- **Live tiles (5-min refresh):** orders in-flight by state, delivery time p50/p90 today, store acceptance SLA today, partners online vs. demand forecast, unassigned orders > 5 min (alert), stock-out rate top-20 SKUs.
- **Store table:** per-store acceptance rate, pack time, rejection reasons, OOS count.
- **Partner table:** utilization, EPH, declines, active incidents.
- **Exception queues:** payment success but no order (orphaned payments), webhook delays > 2 min, orders stuck in a state > SLA, failed doorstep ID checks pending return.
- Alerting: PagerDuty/Slack for unassigned > 10 min, payment success rate < 85% (30-min window), any handover after `id_check_failed`.

### 6.3 Growth Dashboard (daily; Mixpanel/Amplitude + Metabase)

- **Funnel:** install → signup → verification pass → serviceable → first cart → first payment → first delivered order, with step conversion and 7-day windows, split by channel and platform.
- **Verification deep dive:** pass rate by method, failure reasons, manual-review queue time, drop-off screen.
- **Search & catalog:** zero-result rate, top queries, PDP→cart rate, OOS-view rate.
- **Campaign panel:** CAC by channel, referral K-factor, coupon burn vs. incremental orders, push open→order rate.
- **Experiments:** active tests, exposure counts, primary metric deltas with confidence intervals.

---

## 7. Tooling

| Layer | Recommendation | Notes |
|---|---|---|
| Product analytics | **Mixpanel** (or Amplitude) | Client + server events via SDK/HTTP API. Mixpanel's India pricing and funnel tooling fit MVP; either is acceptable — pick one, do not run both. |
| Event pipeline | Segment or **Rudderstack (self-hosted)** | Single instrumentation point fanning out to Mixpanel, warehouse, and marketing tools. Rudderstack self-hosted keeps PII residency in-region. |
| Warehouse | Postgres read-replica (MVP) → BigQuery/ClickHouse (V2) | Money/order truth comes from OLTP replica, not the analytics SDK. |
| BI | **Metabase** (self-hosted) | Exec/ops dashboards on warehouse; cheap, SQL-native. |
| Attribution | AppsFlyer or Branch | Required for install attribution; mind alcohol-category ad policy constraints per network. |
| Crash/perf | Sentry + Firebase Crashlytics/Performance | Crash-free sessions ≥ 99.5% is a release gate (see `docs/21_Testing_QA.md`). |
| Feature flags & experiments | GrowthBook (self-hosted) or Firebase Remote Config (MVP) | GrowthBook reads assignments from the warehouse — pairs well with Metabase. |

---

## 8. Measurement Governance

### 8.1 Metric Ownership

Every KPI must have a single accountable owner and a secondary reviewer.

| Metric family | Primary owner | Secondary reviewer |
|---|---|---|
| Acquisition and activation | Growth / Product | Data |
| Retention and CRM | Product / CRM | Data |
| Monetization and unit economics | Finance | Product |
| Ops quality and fulfillment | Operations | Support |
| Compliance guardrails | Compliance | Ops |
| Delivery partner metrics | Ops | Fleet lead |
| Store metrics | Ops | Catalog / Store success |

### 8.2 Reporting Cadence

- **Daily:** ops dashboard, payment failures, SLA breaches, compliance blocks.
- **Weekly:** WDO, GMV, AOV, contribution margin, repeat rate, partner utilization, store acceptance.
- **Monthly:** cohort retention, CAC, discount burn, partner retention, store accuracy.
- **Quarterly:** roadmap review, benchmark reset, experiment learnings, market expansion readiness.

### 8.3 Source of Truth Rules

- Order, payment, refund, and partner payout metrics must come from server-side events or database truth tables.
- Client events are only for funnel shape, UX behavior, and attribution support.
- If a client event and a server event disagree, the server event wins.
- Analytics dashboards must not be used to override compliance or finance ledgers.

### 8.4 Data Quality Guardrails

- Track event coverage for every critical flow.
- Server-to-client event mismatch must be investigated weekly.
- Missing `city_id`, `zone_id`, or `order_id` in money-related events is a data incident.
- Duplicated order or payment events must be deduplicated by idempotency key.

## 9. Instrumentation Standards

### 9.1 Standard Event Fields

All events should carry the following common fields where relevant:

- `event_id`
- `event_name`
- `timestamp`
- `user_id` or `partner_id` or `store_id`
- `session_id`
- `platform`
- `app_version`
- `city_id`
- `zone_id`
- `order_id` when order-related
- `experiment_flags`
- `source` (`client` / `server` / `admin`)

### 9.2 Naming Conventions

- Use `snake_case` for event names.
- Use past-tense events for completed actions.
- Use nouns for entities and verbs for outcomes.
- Never reuse an event name for a different semantic meaning.

### 9.3 Sensitive Data Policy

- Never store raw ID numbers, document images, DOB, bank details, or phone numbers in analytics tools.
- Hash user identifiers where possible.
- Restrict PII to operational systems of record.
- Audit access to dashboards that contain customer, partner, or store-level drilldowns.

## 10. Funnel Definitions

### 10.1 Customer Acquisition Funnel

1. `app_first_open`
2. `signup_started`
3. `otp_verified`
4. `signup_completed`
5. `age_verification_submitted`
6. `age_verification_passed`
7. `serviceability_checked` and serviceable = true
8. `product_viewed`
9. `product_added_to_cart`
10. `checkout_started`
11. `payment_succeeded`
12. `order_placed`
13. `order_delivered`

### 10.2 First-Order Funnel Quality Checks

- First-order conversion should be tracked by channel, platform, city, zone, and first-category purchased.
- Users who pass verification but never browse should be segmented separately from those who browse but never cart.
- Checkout abandonment should be split by compliance block, price surprise, stock-out, and payment failure.

### 10.3 Partner Funnel

1. Partner login
2. Partner online
3. Assignment offered
4. Assignment accepted
5. Pickup confirmed
6. ID check passed
7. Delivery completed

### 10.4 Store Funnel

1. Store onboarding approved
2. Store online/open
3. Order received
4. Order accepted
5. Order packed
6. Partner pickup confirmed

## 11. Experimentation Framework

### 11.1 Experiment Guardrails

- No experiment may reduce age-verification pass quality.
- No experiment may increase doorstep ID failure handovers.
- No experiment may degrade refund rate beyond agreed thresholds.
- No experiment may change legal or compliance flows without policy approval.

### 11.2 Primary Experiment Metrics

- Conversion rate to first delivered order.
- Time to first order.
- AOV and contribution margin per order.
- Repeat rate within 30 days.
- Partner acceptance and store acceptance rates.

### 11.3 Experiment Logging

- Every experiment must carry a stable `experiment_flag`.
- Exposure counts and assignment logic must be logged server-side.
- Results must be sliced by platform and city before launch decisions are made.

## 12. Alerting and Thresholds

### 12.1 Critical Alerts

- Doorstep ID handover after failed verification: zero tolerance.
- Payment success rate below threshold for 30 minutes.
- Store acceptance SLA below threshold for a city.
- Orders stuck in a single state beyond SLA.
- Compliance rule failures or blocked-order anomalies.

### 12.2 Warning Alerts

- Zero-result search spike.
- Stock-out rate above target.
- Partner utilization below target band.
- CAC trending above target.
- Refund TAT above target.

### 12.3 Alert Destinations

- Ops incidents to Slack or PagerDuty.
- Finance deviations to finance channel.
- Compliance deviations to compliance channel.
- Growth deviations to growth channel.

## 13. KPI Review Rituals

### 13.1 Weekly Business Review

- Review North Star, quality-adjusted WDO, GMV, contribution margin, and guardrails.
- Diagnose top funnel drop-off.
- Review city and zone-level performance.
- Assign owners for every deviation.

### 13.2 Monthly Performance Review

- Review cohort retention, CAC, channel quality, partner health, store health, and experiment outcomes.
- Decide if the current city is ready for expansion or needs operational correction.

### 13.3 Post-Incident Review

- For any severe ops or compliance incident, capture what happened, root cause, blast radius, and prevention plan.
- Incidents should update both metrics and test cases if needed.

## 14. Metric Definitions That Must Not Drift

### 14.1 Delivered Order

An order counts as delivered only when the backend order state reaches `DELIVERED` after successful doorstep verification.

### 14.2 Active Customer

A monthly active customer is a verified customer with at least one delivered order or one meaningful commerce session, depending on the dashboard. The dashboard must label which definition it uses.

### 14.3 Contribution Margin

Contribution margin must use a shared formula across finance and product dashboards. Any formula change requires versioning and communication.

### 14.4 Refund Rate

Refund rate must distinguish between partial and full refunds and must be tied to delivered orders, not merely payment attempts.

## 15. Implementation Notes

- Build analytics instrumentation alongside product flows, not after launch.
- Prefer server-side event emission for money and compliance actions.
- Keep a human-readable event dictionary for all tracked events.
- Version analytics tables and KPI definitions just like APIs.

## 16. Open Questions for Later Revision

- Whether to use Mixpanel or Amplitude as the final event analytics platform.
- Whether the warehouse should graduate to BigQuery or ClickHouse first.
- Whether partner and store dashboards need separate analytic workspaces.
- Whether to formalize a company-wide metric dictionary in a separate doc.

**Instrumentation QA:** every event ships with a tracking spec PR; events are validated in staging with an automated schema check (Rudderstack tracking plans) before release. Untracked or malformed events are a release blocker for funnel-critical screens.

---

## 8. Experimentation Framework

**Principles**
1. One primary metric per experiment, declared before launch; guardrails always include verification pass rate, cancellation rate, refund rate, and crash-free sessions.
2. **Compliance surfaces are not experimentable.** Age gate copy layout may be tested for clarity; verification strictness, dry-state blocking, permitted hours, and doorstep ID flow may not be weakened by any variant.
3. Randomization unit: customer (hashed user_id). For store/partner-side changes, randomize by zone or store with switchback designs to handle interference.
4. Minimum run: 2 full weeks (weekly seasonality in alcohol purchasing is strong — Fri/Sat peaks), and until pre-computed sample size is reached. No peeking-based stops; use sequential tests (GrowthBook supports) if early stopping is needed.
5. Practical significance threshold: define the minimum effect worth shipping (e.g., +2pp first-order conversion) before launch.

**Process:** hypothesis doc → tracking spec → power calculation → flag rollout 5% canary → 50/50 → decision memo archived in the experiments log. Ship/kill decisions in weekly growth review.

**MVP-stage caveat:** below ~1,000 weekly orders most A/B tests are underpowered. Prefer painted-door tests, sequential rollouts with holdouts, and qualitative funnels until volume supports formal testing.

---

## 9. Data Governance & Compliance Notes

- Analytics stores **no raw PII**: no ID images, document numbers, DOB, full addresses, or plain phone numbers. Use hashed IDs and coarse geo (zone_id).
- Age-verification artifacts live only in the compliance datastore with restricted access and retention per state excise rules; analytics receives outcomes only.
- DPDP Act 2023: honor account deletion by erasing/anonymizing the user's analytics profile within 30 days.
- All admin actions are audit-logged (immutable) separately from product analytics.
- Excise reporting: per-state delivered-order registers (order, invoice, permit details where applicable) generated from the OLTP warehouse, not from Mixpanel.
