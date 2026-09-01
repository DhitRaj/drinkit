# Drinkit TASK Tracker

Living execution log. Updated after every completed task.  
Product phases also in `docs/21_Task.md` / `docs/22_Roadmap.md`.

---

## Sprint 0 — Architecture

**Status:** COMPLETE

### Done

- [x] Monorepo, Nest shells, Prisma skeleton, Docker compose, tooling
- [x] Architecture lock doc

### Blockers / TODOs (do not invent)

- [ ] **TODO:** Author `docs/backend/14_API_Specification.md`
- [ ] **TODO:** Author `docs/backend/15_Database_Schema.md`
- [ ] **TODO:** Author `docs/backend/16_Security.md`
- [ ] **TODO:** Author `docs/backend/17_Payments_Wallet_Refunds.md`
- [ ] **TODO:** Author `docs/backend/18_Notifications.md`
- [ ] **TODO:** Author `docs/19_Compliance_Legal.md`

---

## Sprint 1–3 — Design system + UI (mockup-aligned)

**Status:** Customer 14-screen mockup flow shipped

### Done

- [x] Mockup flow: Onboarding → Login/Signup tabs → 4-digit OTP → Age 18+ → Home → Categories list → Listing+Sort → PDP+Add sheet → Cart → Checkout → Payment → Tracking → Order history tabs
- [x] Bottom nav 5 tabs: Home, Categories, Search, Cart, Orders
- [x] Store / Admin / Delivery premium shells
- [x] npm workspaces + RUN.md (alag folder se `npm run dev`)

---

## Sprint 4 — Auth

- [ ] OTP send/verify (blocked on API + Security docs)
- [ ] JWT access + refresh + Redis session/deny list

---

## Sprint 5+ — Full feature wiring

Customer remaining screens + API integration · Store · Delivery · Admin · Testing
