# 15. Security

## 1. Security Goals

- Protect user identity and verification data.
- Prevent unauthorized order, payment, and refund actions.
- Preserve auditability for regulated workflows.

## 2. Controls

- Token-based auth with refresh and revocation support.
- Role-based access control for store, rider, and admin surfaces.
- Server-side validation for compliance-critical rules.
- Encryption in transit and at rest.
- Restricted access to document storage.

## 3. Privacy Rules

- Collect only what is needed for legality and operations.
- Never expose raw ID document details in analytics.
- Keep retention and deletion policies documented.
