# 14. Backend Architecture

This is the product-facing summary of the backend plan. The detailed architecture note lives in [docs/backend/13_Backend_Architecture.md](docs/backend/13_Backend_Architecture.md).

## 1. Shape of the System

- Modular monolith first.
- Clear domain boundaries.
- Background workers for async tasks.
- WebSocket layer for live tracking and order updates.

## 2. Required Domains

- Auth
- Users
- Catalog
- Stores
- Inventory
- Cart
- Orders
- Payments
- Dispatch
- Notifications
- Compliance
- Coupons
- Wallet
- Analytics

## 3. Architecture Rule

- Compliance must remain a hard dependency for any order-affecting operation.
