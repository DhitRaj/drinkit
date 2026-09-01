# Store Panel PRD

## 1. Product Summary

The Store Panel is the operational control surface for licensed liquor stores fulfilling Drinkit orders. It must make order acceptance, stock updates, pricing control, and compliance review fast and unambiguous for store owners and staff.

## 2. Product Goals

- Reduce acceptance time for routed orders.
- Keep inventory and pricing accurate enough for reliable customer checkout.
- Make store hours, license status, and operational readiness easy to monitor.
- Give store staff a clear view of payouts, reports, and exceptions.
- Prevent fulfillment mistakes caused by stale data or unclear workflows.

## 3. Product Principles

- The interface should optimize for speed, not discovery.
- High-frequency actions must take one or two taps maximum.
- Compliance and licensing must be visible at all times.
- Operational status should be obvious without reading dense text.
- Any destructive action must require confirmation.

## 4. Primary Users

- Store owner
- Store manager
- Counter staff / packer
- Operations supervisor

## 5. Information Architecture

- Dashboard
- Incoming orders
- Inventory
- Products
- Pricing
- Store hours
- Store details
- Payouts
- Reports
- Settings

## 6. Global Rules

- Only authorized store users can access the panel.
- Orders can only be accepted while the store is legally open and serviceable.
- Inventory, price, and store-hours changes must be audit logged.
- Store data must remain synchronized with the customer app and admin panel.

## 7. Screen-by-Screen PRD

### 7.1 Dashboard

**Purpose:** Give the store a fast read on today’s operational state.

**Key UI elements:** Today summary cards, open orders count, SLA timers, low-stock alerts, paused/open status, payout snapshot, recent activity.

**States:**
- Loading
- Normal operating mode
- Store paused
- No orders yet
- Attention required

**Validation rules:**
- Summary values must match live backend counts.
- Alert cards must be prioritized by urgency.

**Acceptance criteria:**
- Staff should know within seconds whether the store is ready to accept orders.
- Critical issues like low stock or closing hours should be visible without scrolling.

**Analytics:**
- `store_dashboard_viewed`
- `store_alert_clicked`

### 7.2 Incoming Orders

**Purpose:** Let staff accept, reject, pack, and prepare orders quickly.

**Key UI elements:** Order card, timer, item summary, accept/reject CTA, reason selector, pack status, handoff status.

**Workflow:**
1. New order lands in the queue.
2. Staff reviews items, instructions, and SLA countdown.
3. Staff accepts or rejects.
4. Accepted orders move to packing.
5. Packed orders move to pickup handoff.

**Validation rules:**
- Reject reasons must be structured.
- Acceptance must be recorded before preparation begins.
- The store cannot mark an order packed before accepting it.

**States:**
- New
- Accepted
- Rejected
- Packing
- Packed
- Picked up
- Cancelled

**Edge cases:**
- Partial item availability.
- Order receives update after acceptance.
- Store closes while order is in queue.

**Acceptance criteria:**
- A staff member can accept or reject an order in one primary action.
- Accepted orders should show a clear next step.

**Analytics:**
- `store_order_received`
- `store_order_accepted`
- `store_order_rejected`
- `store_order_packed`

### 7.3 Inventory

**Purpose:** Manage store-level stock availability for Drinkit fulfillment.

**Key UI elements:** Search, category filters, stock quantity, availability toggle, bulk actions, low-stock flags, update history.

**Validation rules:**
- Stock quantity must never go below zero.
- Inventory updates must trigger cache refresh or sync events.
- Out-of-stock status must be reflected in customer-facing inventory.

**States:**
- Fully stocked
- Low stock
- Out of stock
- Sync pending
- Bulk update in progress

**Acceptance criteria:**
- Staff should be able to mark stock changes quickly and confidently.
- Changes must propagate to the ordering layer without manual follow-up.

**Analytics:**
- `store_inventory_updated`
- `store_item_marked_oos`

### 7.4 Products

**Purpose:** View and manage the product catalog available through the store.

**Key UI elements:** Product list, category tags, product detail drawer, image, ABV, pack size, status, edit controls.

**Validation rules:**
- Product metadata must match the central catalog where applicable.
- Store-level overrides should be clearly labeled.

**States:**
- Active product
- Hidden product
- Restricted product
- Pending review

**Acceptance criteria:**
- Product visibility should be understandable without admin intervention.

### 7.5 Pricing

**Purpose:** Let the store manage product prices within applicable policy.

**Key UI elements:** Selling price, MRP, margin, bulk edit, price change history, validation message.

**Validation rules:**
- Price edits must respect policy and legal limits.
- MRP must never be exceeded where regulations apply.
- All price changes must be timestamped and auditable.

**States:**
- Current price
- Pending approval
- Rejected change
- Price sync pending

**Acceptance criteria:**
- Staff can see the current selling price and recent history at a glance.
- Invalid price changes must fail with a clear reason.

**Analytics:**
- `store_price_updated`

### 7.6 Store Hours

**Purpose:** Control when the store is open for Drinkit order fulfillment.

**Key UI elements:** Weekly schedule, holiday toggle, special hours, closure reason, save changes.

**Validation rules:**
- Hours must not violate state or excise rules.
- Closing the store should trigger a clear operational status.

**States:**
- Open now
- Closed now
- Scheduled closure
- Holiday hours
- Emergency pause

**Acceptance criteria:**
- Staff should be able to update hours without breaking compliance.

**Analytics:**
- `store_hours_changed`

### 7.7 Store Details

**Purpose:** Manage identity, license, and operational profile details.

**Key UI elements:** Store name, address, jurisdiction, license number, license status, documents, contact details, service zone, verification status.

**Validation rules:**
- License data must be complete and current.
- Expired or pending licenses should visibly block eligible operations.

**States:**
- Verified
- Pending verification
- Expired license
- Suspended

**Acceptance criteria:**
- Compliance-critical data should be easy to review without opening multiple screens.

### 7.8 Payouts

**Purpose:** Show store earnings, commissions, settlements, and payout status.

**Key UI elements:** Current balance, settlement period, payout ledger, completed payouts, deductions, downloadable statement.

**Validation rules:**
- Payouts must reconcile with order and refund records.
- Deductions must be explainable.

**States:**
- Pending settlement
- Available for payout
- Paid
- Under review

**Acceptance criteria:**
- Store users should understand what has been earned and what is pending.

**Analytics:**
- `store_payout_viewed`

### 7.9 Reports

**Purpose:** Provide operational, sales, and inventory reporting.

**Key UI elements:** Date filters, export action, sales summary, acceptance rate, cancellation rate, stock-out metrics, top products, issue trends.

**Validation rules:**
- Report data must match authoritative backend aggregates.
- Exported data must honor role permissions.

**States:**
- Report loaded
- No data for range
- Export generating
- Export ready

**Acceptance criteria:**
- Staff should be able to review performance without needing admin help.

**Analytics:**
- `store_report_viewed`

### 7.10 Settings

**Purpose:** Manage store access, roles, notification preferences, and operational options.

**Key UI elements:** Staff list, role permissions, notification toggles, logout, language options, support contact.

**Validation rules:**
- Role changes must be restricted to authorized users.
- Sensitive changes must be logged.

**States:**
- Editable
- Read-only
- Permission denied

## 8. Cross-Cutting Requirements

### 8.1 Operational UX

- One primary action per row or card where possible.
- Keep table density high without sacrificing legibility.
- Use badges and timers to communicate urgency.

### 8.2 Compliance

- License, jurisdiction, and store-hours data must be visible and current.
- Blocked states must be explicit and recoverable.

### 8.3 Reliability

- Panel should tolerate intermittent store connectivity.
- Any async save should show pending and success/failure feedback.

### 8.4 Accessibility

- Staff should be able to use the panel under poor lighting and high workload.
- Important alerts must not depend on color alone.

## 9. Non-Functional Requirements

- Fast page loads on store tablets and mid-range phones.
- Low-friction bulk edits for inventory and pricing.
- Accurate synchronization with admin and customer surfaces.
- Strong auditability for all operational changes.

## 10. Launch Acceptance Criteria

- A store can receive, accept, pack, and hand over an order.
- Inventory and pricing changes update system state correctly.
- Store hours and license data are visible and enforceable.
- Payouts and reports are understandable to store staff.
- No critical workflow depends on unclear UI or hidden rules.
