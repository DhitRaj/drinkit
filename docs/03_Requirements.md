# 03. Requirements

## 1. Functional Requirements

- Users must create an account using mobile OTP.
- Users must complete age verification before browsing restricted inventory.
- The app must hide or block serviceability when the state, zone, sale hours, or dry-day rules disallow delivery.
- Cart and checkout must validate live inventory and pricing.
- Payment must be captured before order confirmation unless the business rule explicitly allows another method.
- Store acceptance, partner pickup, doorstep ID check, and delivery confirmation must be recorded as state transitions.
- Admin must be able to review compliance events and override only when policy allows.

## 2. Non-Functional Requirements

- The app should load core screens quickly on low-end Android devices.
- The system must be resilient to intermittent network conditions.
- All regulated actions must be auditable.
- Data handling must be secure and privacy-aware.
- APIs must be versioned and backward compatible.

## 3. Compliance Requirements

- Age and identity verification is mandatory.
- Delivery must only occur in permitted jurisdictions.
- Sale-hour and dry-day enforcement must happen server-side.
- KYC documents, logs, and audit records must be stored securely.
- Delivery handover must require a second verification step at the doorstep.

## 4. Operational Requirements

- Store SLAs, partner availability, and dispatch logic must be configurable by city.
- Payment, refund, and settlement flows must be reconcilable.
- Support teams need searchable order, user, and issue history.
