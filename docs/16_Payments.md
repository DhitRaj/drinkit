# 16. Payments

## 1. Payment Goals

- Support fast checkout with low failure rates.
- Keep payment state reconciliation-safe.
- Make refunds traceable and policy-driven.

## 2. Payment Flows

- Payment initialization at checkout.
- Gateway confirmation via webhook.
- Order confirmation only after successful payment.
- Refund initiation from support or system policy.
- Settlement and reconciliation for stores and partners.

## 3. Rules

- Payment events must be server-authored.
- Refunds must map to an order reason.
- Payment status must always be visible in support and admin panels.
