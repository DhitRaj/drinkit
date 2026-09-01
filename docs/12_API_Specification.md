# 12. API Specification

## 1. API Style

- REST for standard CRUD and checkout flows.
- WebSocket for tracking and live order updates.
- Server events as source of truth for order state and payments.

## 2. Core Domains

- Auth and session management.
- User profile and verification.
- Catalog and search.
- Store inventory and pricing.
- Cart and checkout.
- Orders and delivery.
- Payments and refunds.
- Notifications.
- Compliance.
- Analytics ingestion.

## 3. Contract Requirements

- Version all endpoints.
- Return machine-readable error codes.
- Include timestamps, IDs, and status enums consistently.
- Never expose sensitive document data in public responses.
