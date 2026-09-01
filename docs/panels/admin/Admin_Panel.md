# Admin Panel PRD

## 1. Product Summary

The Admin Panel is the operational control room for Drinkit. It is used by internal teams to manage users, stores, delivery partners, orders, compliance, coupons, analytics, reports, and support escalation. The panel must make exceptions visible, actions auditable, and regulated changes traceable.

## 2. Product Goals

- Give ops, compliance, and support teams a single source of truth.
- Make escalations and exceptions obvious enough to act on quickly.
- Keep every regulated action logged and attributable.
- Enable safe intervention without creating inconsistent states.
- Provide reporting that supports business, compliance, and finance decisions.

## 3. Product Principles

- Speed matters, but auditability is non-negotiable.
- High-risk actions must always be explicit and confirmable.
- Admin data should be authoritative over client-side assumptions.
- Exceptions should surface before they become failures.
- Every action needs a reason, timestamp, and actor identity.

## 4. Primary Users

- Operations manager
- Compliance manager
- Support agent
- Finance or reconciliation analyst
- Super admin

## 5. Information Architecture

- Overview dashboard
- Users
- Stores
- Orders
- Delivery partners
- Compliance
- Coupons
- Analytics
- Reports
- Support
- Settings and role management

## 6. Global Rules

- Access must be role-based.
- Sensitive actions require elevated permissions.
- All changes must be logged with before/after state.
- Compliance blocks must not be bypassed from admin unless an explicit override policy exists.
- Reports and exports should respect data access permissions.

## 7. Screen-by-Screen PRD

### 7.1 Overview Dashboard

**Purpose:** Provide a live business and operations snapshot.

**Key UI elements:** Order volume, active trips, SLA breaches, compliance alerts, store readiness, payout backlog, refunds, support queue, and system health cards.

**States:**
- Normal
- Alert heavy
- Data delayed
- Empty environment

**Validation rules:**
- Summary tiles must match authoritative backend counts.
- Alert severity should be ordered by impact and urgency.

**Acceptance criteria:**
- Admin should understand the health of the network in one glance.
- Critical risks must be visible without drilling into reports.

**Analytics:**
- `admin_dashboard_viewed`
- `admin_alert_clicked`

### 7.2 Users

**Purpose:** Review customer accounts, verification state, support issues, and account actions.

**Key UI elements:** User list, status chips, verification state, order count, refund history, account actions, search, filters.

**Actions:**
- View profile
- Review verification status
- Suspend or restore account when policy allows
- Inspect order history and issue history

**Validation rules:**
- Sensitive account actions must be permission-gated.
- Account changes must be logged with reason codes.

**States:**
- Active
- Verification pending
- Blocked
- Suspended
- Under review

**Acceptance criteria:**
- Admin can find a user and understand their risk or support status quickly.

### 7.3 Stores

**Purpose:** Manage store onboarding, verification, licenses, status, and serviceability.

**Key UI elements:** Store list, license status, jurisdiction, onboarding stage, operational hours, compliance status, action menu.

**Actions:**
- Approve or reject onboarding
- Review license documents
- Pause or resume store availability
- Inspect order performance and incident history

**Validation rules:**
- No store can be activated without valid compliance data.
- Expired licenses should clearly block fulfillment.

**States:**
- Pending onboarding
- Active
- Paused
- Suspended
- Expired license

**Acceptance criteria:**
- Compliance and operations teams should be able to resolve store issues without digging through multiple systems.

### 7.4 Orders

**Purpose:** Monitor and intervene in active and historical order flows.

**Key UI elements:** Order search, order detail drawer, status timeline, store info, partner info, payment state, refund state, issue log.

**Actions:**
- View order state
- Reassign or escalate when policy allows
- Trigger cancellation or refund flow
- Inspect exception reason

**Validation rules:**
- Order state transitions must follow the backend state machine.
- Manual actions should never produce inconsistent payment or delivery states.

**States:**
- Pending
- Accepted
- Packed
- Picked up
- Delivered
- Cancelled
- Refunded
- Disputed

**Acceptance criteria:**
- Admin should be able to understand and intervene in a problematic order without guessing.

**Analytics:**
- `admin_order_viewed`
- `admin_order_intervened`

### 7.5 Delivery Partners

**Purpose:** Manage partner onboarding, document review, duty status, performance, and incidents.

**Key UI elements:** Partner list, approval status, document expiry, online state, trip stats, earnings summary, incident markers.

**Actions:**
- Approve or suspend partner
- Review documents
- Inspect trip performance
- View complaint or incident history

**Validation rules:**
- Incomplete or expired documents should block active duty where required.
- Any compliance issue should be visible in the partner profile.

**States:**
- Pending review
- Active
- Offline
- Suspended
- Blocked

**Acceptance criteria:**
- Ops should be able to assess partner readiness and risk at a glance.

### 7.6 Compliance

**Purpose:** Enforce and review legal and operational rules.

**Key UI elements:** Rule list, age-gate logs, dry-day calendar, sale-hour configuration, geofence map, blocked orders, audit log viewer.

**Actions:**
- Configure state rules
- Review blocked deliveries
- Audit KYC and doorstep verification records
- Export compliance reports

**Validation rules:**
- All changes to rules must be versioned.
- Rule edits should not break already-completed orders.

**States:**
- Active rule
- Pending change
- Disabled rule
- Under review

**Acceptance criteria:**
- Compliance team can prove why an order was blocked or allowed.

**Analytics:**
- `admin_compliance_rule_updated`
- `admin_compliance_report_exported`

### 7.7 Coupons

**Purpose:** Create and manage promotions while controlling abuse.

**Key UI elements:** Coupon list, eligibility rules, usage counts, expiry, minimum order value, geographic scope, status.

**Actions:**
- Create coupon
- Pause coupon
- Edit limits if policy allows
- Review redemptions and abuse signals

**Validation rules:**
- Coupon rules must be validated server-side.
- Expired or exhausted coupons should not be redeemable.

**States:**
- Draft
- Active
- Paused
- Expired
- Exhausted

**Acceptance criteria:**
- Marketing and ops should be able to control coupons without creating checkout issues.

### 7.8 Analytics

**Purpose:** Provide operational, product, and business metrics.

**Key UI elements:** KPI charts, trend tables, cohort summaries, geography views, funnel analysis, export controls.

**Validation rules:**
- Metrics must be sourced from agreed analytics definitions.
- System health should not be confused with business health.

**States:**
- Data loaded
- Partial data
- No data for range
- Export processing

**Acceptance criteria:**
- Admin should be able to inspect growth, funnel, and ops health from one panel.

**Analytics:**
- `admin_analytics_viewed`

### 7.9 Reports

**Purpose:** Generate structured operational and financial reports.

**Key UI elements:** Report templates, filters, date range, export button, scheduler, download history.

**Report types:**
- Sales
- Order operations
- Refunds
- Partner payouts
- Store settlements
- Compliance logs

**Validation rules:**
- Exports must honor role permissions.
- Generated reports should be traceable and reproducible.

**States:**
- Template ready
- Generating
- Ready
- Failed

**Acceptance criteria:**
- Finance and ops can export the same report repeatedly and get consistent output.

### 7.10 Support

**Purpose:** Resolve customer, store, and partner issues.

**Key UI elements:** Ticket list, priority, SLA, linked order/user/store, internal notes, resolution status, refund action, escalation path.

**Actions:**
- View ticket context
- Add internal notes
- Trigger refund or escalation where allowed
- Close or reopen ticket

**Validation rules:**
- Support actions must log agent identity.
- Refunds and cancellations should follow policy and permissions.

**States:**
- Open
- Waiting on user
- Waiting on store
- Resolved
- Escalated
- Closed

**Acceptance criteria:**
- Support should be able to resolve issues without switching systems.

**Analytics:**
- `admin_ticket_viewed`
- `admin_ticket_resolved`

### 7.11 Settings and Role Management

**Purpose:** Manage access control, permissions, and internal configuration.

**Key UI elements:** Role list, permission matrix, user access list, audit log, notification settings.

**Validation rules:**
- Permission changes must be restricted to super admins.
- Changes should be audited and reversible where policy permits.

**States:**
- View only
- Editable
- Restricted

**Acceptance criteria:**
- Admin access should be explainable and maintainable.

## 8. Cross-Cutting Requirements

### 8.1 Control and Auditability

- Every action must produce an audit event.
- Before/after values should be stored for regulated actions.
- High-risk actions require confirmation and reason text.

### 8.2 Exception Handling

- Exceptions should surface on dashboard and in context.
- Manual intervention must not bypass compliance without policy support.

### 8.3 Reliability

- Dashboard counts and operational states must remain current.
- Changes must be traceable even during partial system outages.

### 8.4 Accessibility

- Dense information must remain readable.
- Severity colors should always have labels or icons.

## 9. Non-Functional Requirements

- Fast load times for desktop-first usage.
- Strong permissioning and session security.
- Full traceability for all legal, financial, and operational changes.
- Export and reporting features must scale with data volume.

## 10. Launch Acceptance Criteria

- Admin can monitor the business, intervene in orders, and manage support safely.
- Compliance settings are configurable and auditable.
- Store, partner, coupon, and user actions are visible and permissioned.
- Reports and analytics are usable by internal teams.
- No critical admin action can happen without logging and authorization.
