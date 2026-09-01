# 13. Database

## 1. Core Storage Model

- PostgreSQL is the primary transactional database.
- PostGIS is required for serviceability and geofence logic.
- Redis is used for session, cache, and live dispatch state.
- Object storage holds documents, images, and exports.

## 2. Primary Entities

- users
- user_verifications
- addresses
- stores
- store_documents
- products
- store_inventory
- carts
- orders
- order_items
- payments
- refunds
- delivery_partners
- trips
- notifications
- coupons
- wallet_transactions
- audit_logs

## 3. Data Rules

- Sensitive data should be minimized and encrypted where applicable.
- Order and payment records must be auditable.
- Compliance logs must be immutable or append-only.
