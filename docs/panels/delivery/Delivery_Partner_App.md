# Delivery Partner App PRD

## 1. Product Summary

The Delivery Partner App is the trip execution surface for verified riders who pick up orders from licensed stores and complete doorstep delivery after a valid identity check. It must optimize for speed, clarity, and low-friction execution while preserving a strict compliance trail.

## 2. Product Goals

- Make it easy for partners to go online and receive assignments.
- Keep pickup, navigation, and delivery steps obvious and fast.
- Enforce doorstep ID verification before marking an order delivered.
- Reduce confusion during delays, reassignments, or failed handoffs.
- Give partners transparent visibility into earnings, incentives, and trip history.

## 3. Product Principles

- Trips should be operable with minimal taps.
- The active order state must always be obvious.
- Compliance steps cannot be skipped.
- Location and task progress should feel trustworthy and live.
- Earnings information should be easy to understand without admin help.

## 4. Primary Users

- Verified delivery partner
- Fleet supervisor
- Ops support, via escalation paths only

## 5. Information Architecture

- Login
- Online/offline toggle
- Assignment offers
- Active trip
- Pickup
- Navigation
- Doorstep verification
- Earnings
- Trip history
- Profile

## 6. Global Rules

- Only verified and approved partners can go online.
- Partners can only accept assignments while on duty.
- Doorstep ID verification is mandatory before final delivery completion.
- Every trip must have a traceable state history.
- Offline, app background, and poor connectivity states must preserve trip context.

## 7. Screen-by-Screen PRD

### 7.1 Login

**Purpose:** Authenticate the partner and bind the device.

**Key UI elements:** Mobile number or partner ID, OTP, device binding prompt, forgot access path.

**Validation rules:**
- Only registered partner accounts can log in.
- OTP attempts must be rate limited.
- Suspended or unapproved partners must be blocked.

**States:**
- Empty
- OTP requested
- OTP sent failed
- OTP verified
- Account blocked
- Verification required

**Acceptance criteria:**
- A verified partner should be able to get into the app with minimal friction.

**Analytics:**
- `partner_login_started`
- `partner_login_completed`

### 7.2 Online / Offline Toggle

**Purpose:** Let partners control their availability for assignments.

**Key UI elements:** Duty toggle, zone indicator, battery or connectivity hints, active trip blocker, shift timer.

**Validation rules:**
- Partners cannot go online if required profile or compliance checks are incomplete.
- The app should not allow offline while an active trip is in progress unless recovery rules apply.

**States:**
- Offline
- Going online
- Online
- Busy on trip
- Forced offline
- Restricted zone

**Acceptance criteria:**
- A partner should always know whether they are available for orders.
- The toggle should reflect actual backend duty state.

**Analytics:**
- `partner_online`
- `partner_offline`

### 7.3 Assignment Offers

**Purpose:** Present delivery opportunities clearly and allow quick accept/decline actions.

**Key UI elements:** Order summary, pickup distance, payout estimate, deadline timer, accept button, decline button, reason list.

**Workflow:**
1. Partner receives an offer.
2. App shows store, customer area, payout, and ETA pressure.
3. Partner accepts or declines.
4. Accepted assignment becomes active trip.

**Validation rules:**
- Offer expiry must be enforced.
- Decline reasons should be structured.
- The same offer cannot be accepted twice.

**States:**
- Incoming offer
- Accepted
- Declined
- Expired
- Reassigned

**Acceptance criteria:**
- The partner should understand payout and distance before accepting.
- No offer should disappear without a state change message.

**Analytics:**
- `assignment_offered`
- `assignment_accepted`
- `assignment_declined`

### 7.4 Active Trip

**Purpose:** Provide a single source of truth for the current delivery task.

**Key UI elements:** Current order card, progress stepper, store/customer map, call/support buttons, time estimates, incident button.

**Validation rules:**
- Trip state must match backend state.
- The active trip must remain visible until completion or cancellation.

**States:**
- Heading to store
- Arrived at store
- Picked up
- Heading to customer
- Arrived at customer
- Delivery blocked
- Return to store

**Acceptance criteria:**
- The partner should not need to navigate between multiple screens to understand the trip.

### 7.5 Pickup

**Purpose:** Confirm the order handoff from the store.

**Key UI elements:** Order ID, pickup code or scan, item summary, packing verification, store contact, issue button.

**Validation rules:**
- Pickup confirmation must happen only after store acceptance and pack readiness.
- Handoff confirmation must be tied to the correct trip and store.

**States:**
- Arrived
- Waiting
- Ready for pickup
- Picked up
- Pickup issue

**Edge cases:**
- Order partially packed.
- Store asks for more time.
- Partner arrives before pack completion.

**Acceptance criteria:**
- The partner must be able to confirm pickup without ambiguity.

**Analytics:**
- `partner_arrived_store`
- `pickup_confirmed`

### 7.6 Navigation

**Purpose:** Guide the partner from store to customer using live route guidance.

**Key UI elements:** Map, route line, ETA, traffic hint, navigation app shortcut, route refresh, customer address card.

**Validation rules:**
- Destination must match the active trip.
- Route changes must not confuse the partner about the active task.

**States:**
- Route ready
- Navigation active
- GPS weak
- Route recalculating
- Arrived at destination

**Acceptance criteria:**
- The partner should see a clear next turn or destination state at all times.

**Analytics:**
- `partner_arrived_customer`

### 7.7 Doorstep Verification

**Purpose:** Enforce identity verification before delivery completion.

**Key UI elements:** ID capture or scan, verification result, retry path, refusal reason, handover button, customer communication prompt.

**Validation rules:**
- Delivery cannot complete without a successful ID check.
- Verification outcomes must be recorded.
- If verification fails, the app must route the order to the correct failure path.

**States:**
- Awaiting verification
- Capturing ID
- Verified
- Verification failed
- Customer unavailable
- Handover blocked

**Edge cases:**
- ID not readable.
- Customer refuses to show ID.
- Customer appears ineligible.
- App loses camera or network during verification.

**Acceptance criteria:**
- The app must not allow a manual override that bypasses ID verification.

**Analytics:**
- `doorstep_id_check_started`
- `doorstep_id_check_passed`
- `doorstep_id_check_failed`

### 7.8 Earnings

**Purpose:** Help the partner understand pay, incentives, and settlement status.

**Key UI elements:** Today’s earnings, completed trips, bonuses, deductions, payout pending, weekly summary, earnings details.

**Validation rules:**
- Earnings data must align with completed trips and payout rules.
- Deductions must be explainable.

**States:**
- No earnings yet
- Active earnings
- Pending settlement
- Paid

**Acceptance criteria:**
- Partners should be able to see how trips affect earnings.

**Analytics:**
- `partner_earnings_viewed`

### 7.9 Trip History

**Purpose:** Show completed, failed, and cancelled trips for transparency.

**Key UI elements:** Trip list, earnings per trip, status chip, date, issue badge, receipt view.

**States:**
- Completed trips
- Cancelled trips
- Return to store trips
- Disputed trips

**Acceptance criteria:**
- Trip history should help partners understand past outcomes and pay.

### 7.10 Profile

**Purpose:** Manage partner identity, compliance, settings, and support access.

**Key UI elements:** Partner profile, compliance status, vehicle details, document status, notification settings, support, logout.

**Validation rules:**
- Incomplete or expired documents should block online mode.
- Sensitive profile fields should be editable only through approved flows.

**States:**
- Verified
- Pending review
- Expired document
- Suspended

**Acceptance criteria:**
- Partners should know what is required to stay active and compliant.

## 8. Cross-Cutting Requirements

### 8.1 Trip UX

- Active trip information must be persistent and visible.
- Reduce the need for nested navigation during a trip.
- Use large, clear actions for accept, arrive, pickup, and verify steps.

### 8.2 Compliance

- Doorstep verification is not optional.
- Trip outcomes must be recorded with reason codes.
- Failed deliveries should route into the correct return flow.

### 8.3 Reliability

- The app must survive weak mobile networks.
- State changes should sync once connectivity returns.
- Trip state should never be lost on background or restart.

### 8.4 Accessibility

- Large buttons and readable text are required under field conditions.
- Status must be obvious even in sunlight or low-light environments.

## 9. Non-Functional Requirements

- Fast loading on lower-end Android devices.
- Minimal battery and location overhead while on duty.
- Accurate live tracking without excessive polling.
- Strong audit logs for every compliance-related action.

## 10. Launch Acceptance Criteria

- A partner can login, go online, accept an offer, pickup an order, navigate, verify ID, and complete delivery.
- Doorstep verification failures are handled with a defined fallback.
- Earnings and trip history match the backend ledger.
- The app can handle weak connectivity without losing trip state.
- No delivery can be marked complete without verification.
