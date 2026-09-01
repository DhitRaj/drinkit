# Drinkit Architecture — Sprint 0 Lock

**Status:** Pending approval before Sprint 1  
**Date:** 2026-08-05  
**Source of truth:** `docs/00`–`docs/14` + `docs/backend/13_Backend_Architecture.md`  
**Conflict rule:** PRD wins

---

## 1. Sprint 0 decisions (locked)

| Decision | Choice | Rationale |
|---|---|---|
| Language | **TypeScript (strict)** everywhere | Shared types across 4 clients + API; India hiring pool; matches existing docs |
| Mobile | **React Native + Expo** (Customer + Delivery as separate apps) | OTA for compliance fixes; Expo Router; Reanimated; separate binaries for partner data-safety |
| Web | **Next.js App Router** (Store :3001, Admin :3002) | SSR for weak store networks; role-gated layouts |
| Backend | **NestJS modular monolith** | Domain modules, DI, guards, Swagger, WS gateway; extract services only on scale triggers |
| ORM | **Prisma** + raw SQL for PostGIS | Typed migrations; PostGIS via raw queries when needed |
| DB | **PostgreSQL 16 + PostGIS** | ACID + geofences |
| Cache / queues | **Redis 7** (+ BullMQ in later sprint) | Sessions, OTP, geo, rate limits, pub/sub |
| Monorepo | **pnpm workspaces + Turborepo** | Shared packages, parallel pipelines |
| Region | **AWS ap-south-1** ready | DPDP data residency |

---

## 2. Repository layout

```text
apps/
  customer/     # Expo RN — Customer App
  delivery/     # Expo RN — Delivery Partner App
  store/        # Next.js — Store Panel
  admin/        # Next.js — Admin Panel
  backend/      # NestJS API + workers (APP_ROLE)
packages/
  design-system/  # Tokens from docs/design/06_Design_System.md
  ui/             # Shared components (Sprint 3)
  types/          # Shared domain types
  api/            # Typed HTTP client shell
  utils/          # Pure helpers (INR format, etc.)
  config/         # Shared tsconfig presets
infra/
  docker/         # Local Postgres+PostGIS + Redis
docs/             # Product + engineering docs (unchanged authority)
```

Legacy root folders (`backend/`, `customer-app/`, `delivery-app/`, `store-panel/`, `admin-panel/`) are **deprecated** (see each folder’s `DEPRECATED.md`). They are not pnpm workspace members; do not extend them.

---

## 3. Backend module map

Modules match `docs/backend/13_Backend_Architecture.md`:

Auth · Users · Catalog · Stores · Inventory · Cart · Orders · Payments · Dispatch · Notifications · Compliance · Coupons · Wallet · Analytics · Health

**Golden rule:** every order-affecting write path must call **Compliance** before commit.

Process roles via `APP_ROLE`: `api` | `ws` | `worker` (worker/WS implementation in later sprints).

---

## 4. Design system

Tokens live in `@drinkit/design-system` and mirror `docs/design/06_Design_System.md`:

- Background `#0D0D0D`, accent `#F5B301`
- 4pt spacing grid
- Inter typeface (per design system doc)
- No raw hex in feature screens

---

## 5. Documentation blockers (do not invent)

Referenced but **missing** — stop and author before implementing those areas:

| Missing doc | Blocks |
|---|---|
| `docs/backend/14_API_Specification.md` (detailed endpoints/payloads) | Auth DTOs, cart/checkout contracts, client API methods |
| `docs/backend/15_Database_Schema.md` (columns, FKs, indexes) | Full Prisma models beyond entity list |
| `docs/backend/16_Security.md` | Secrets, KYC encryption, RBAC matrix details |
| `docs/backend/17_Payments_Wallet_Refunds.md` | Payment/refund state machines |
| `docs/backend/18_Notifications.md` | Template catalog |
| `docs/19_Compliance_Legal.md` | Per-state legal constants (must be admin-configurable, not hardcoded) |

Prisma Sprint 0 schema creates **only** tables named in `docs/13_Database.md`, with `id` + timestamps only. Business columns wait for schema doc.

---

## 6. Sprint sequence (approved workflow)

1. Sprint 0 — Architecture (this)  
2. Sprint 1 — Design system package completeness  
3. Sprint 2 — *(workflow Phase 2 = design system; Phase 3 = components)*  
4. Sprint 3 — Reusable UI components  
5. Sprint 4 — Authentication  
6. Sprint 5 — Customer App  
7. Sprint 6 — Backend APIs  
8. Sprint 7 — Store Panel  
9. Sprint 8 — Delivery App  
10. Sprint 9 — Admin Panel  
11. Sprint 10 — Testing  

---

## 7. Local bootstrap (after approval)

```bash
pnpm install
pnpm docker:up
cp apps/backend/.env.example apps/backend/.env
pnpm db:generate
pnpm --filter @drinkit/backend dev
```

API health: `GET /api/v1/health`  
Swagger: `/docs`
