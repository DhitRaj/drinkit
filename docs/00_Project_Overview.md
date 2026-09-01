# Drinkit — Project Overview

**Document:** 00_Project_Overview.md
**Version:** 1.0
**Last Updated:** 2026-08-05
**Owner:** Product Team
**Status:** Approved for build

---

## 1. What is Drinkit?

Drinkit is a **hyperlocal, on-demand alcohol delivery platform for India**. It connects licensed liquor retailers ("stores") with legal-drinking-age consumers and a fleet of trained delivery partners, delivering beer, wine, spirits, and liqueurs to the customer's doorstep in **30–45 minutes** — the Blinkit/Zepto quick-commerce experience, purpose-built for the regulated alcobev category.

Drinkit is a **marketplace, not an inventory owner**. Every order is fulfilled by a government-licensed retail liquor store operating within its excise jurisdiction. Drinkit provides the technology layer: discovery, ordering, payments, compliance (age and identity verification), logistics orchestration, and post-order support.

The platform consists of **four applications**:

| # | Application | Platform | Primary User |
|---|-------------|----------|--------------|
| 1 | **Customer App** | iOS + Android (mobile-first) | Legal-drinking-age consumers |
| 2 | **Store / Vendor Panel** | Responsive web + Android tablet app | Licensed liquor store owners and staff |
| 3 | **Delivery Partner App** | Android (primary), iOS | Verified delivery partners (riders) |
| 4 | **Admin Panel** | Web (desktop) | Drinkit operations, compliance, finance, and support teams |

---

## 2. The Problem

### 2.1 For consumers
- Buying alcohol in India means visiting a physical liquor store: queues, limited browsing, no price transparency, uncomfortable retail environments (especially for women and older customers), and stock uncertainty.
- Quick-commerce has trained urban India to expect groceries in 10–30 minutes, yet alcohol — a ₹4+ lakh crore category — has almost no organized, legal, convenient delivery option in most states.
- Discovery is broken: no reliable way to compare brands, check availability, read information about products, or find what's stocked nearby.

### 2.2 For retailers
- Liquor retail in India is fragmented, largely offline, and footfall-dependent. Stores have zero digital demand channel, no CRM, no data on what sells, and no way to reach customers beyond a ~1 km walk-in radius.
- Working-capital-heavy inventory sits unsold because demand and supply are never matched digitally.

### 2.3 For regulators (the structural problem)
- Alcohol is a **state subject** in India. Each state has its own excise laws, licensing regimes, legal drinking ages (18/21/25), dry days, permitted sale hours, and rules on home delivery. Several states (notably **Odisha, West Bengal, Maharashtra pilots, and others at various times**) have permitted or piloted home delivery, while **Gujarat, Bihar, Mizoram, Nagaland, and Lakshadweep** are dry.
- Regulators worry about underage sales and unaccounted transactions. A compliant digital channel with **KYC, verifiable age checks, geo-fencing, and complete audit trails** actually gives excise departments *more* control than cash-based offline retail — this is Drinkit's regulatory pitch.

---

## 3. The Solution

Drinkit delivers a legally compliant, delightful alcohol-buying experience:

1. **State-aware storefront.** The app detects the customer's location and shows only what is legal to sell there — correct legal drinking age gate (18/21/25 per state), permitted sale hours, dry-day blocking, and full blocking in dry states.
2. **Hard age & identity verification.** Mandatory government-ID KYC at signup (DigiLocker / Aadhaar-based verification or manual ID upload with review) plus **doorstep ID re-verification** by the delivery partner before handover. No verified ID, no delivery.
3. **Licensed-store marketplace.** Only stores with valid excise licenses are onboarded; license numbers, validity, and jurisdiction are recorded and displayed. Orders route only to stores licensed for the customer's delivery address.
4. **30–45 minute hyperlocal logistics.** Orders are assigned to the nearest eligible store with stock; a trained delivery partner picks up, and the customer tracks the rider live on a map.
5. **Compliance-grade audit trail.** Every order stores an immutable record: KYC status, age-gate result, delivery-time ID check result, store license, timestamps, and geolocations — exportable for excise reporting.

---

## 4. Market

### 4.1 India alcobev market
- India is among the world's largest alcohol markets: roughly **₹4–5 lakh crore (~USD 50–60B)** in retail value, growing high single digits annually, with ~300+ million consumers of legal drinking age who drink at least occasionally.
- Category mix skews toward spirits (IMFL whisky dominates), with beer, wine, and premium/craft segments growing fastest in metros.
- **Premiumization** is the defining trend: urban consumers under 40 trading up to premium whisky, gin, craft beer, and wine — exactly the demographic that uses quick commerce.

### 4.2 Quick commerce
- Indian q-commerce (Blinkit, Zepto, Swiggy Instamart, BBNow) has scaled to a multi-billion-USD GMV market in under four years, proving consumer willingness to pay for sub-45-minute delivery of everyday goods.
- Alcohol is the largest high-AOV consumer category still substantially **offline**. Average liquor basket sizes (₹800–₹2,500) are 2–4× typical grocery q-commerce AOVs, supporting healthier unit economics per order.

### 4.3 Serviceable market (launch thesis)
- **Phase 1 states:** states where home delivery of alcohol is legally permitted or permissible via retailer-delivery models (e.g., Odisha, West Bengal; others as regulation evolves — Maharashtra, Karnataka, Delhi NCR monitored closely and entered as/when rules allow).
- **Phase 1 cities:** 2–3 metros/tier-1 cities in permitted states; expansion city-by-city, never state-blanket.
- Beachhead SAM estimate: even 5 permitted metro cities with ~8M LDA-eligible urban consumers each, 5% annual penetration, and ₹1,200 AOV × 1.5 orders/month yields a **₹4,000+ crore annual GMV** serviceable opportunity in early years.

> All market figures are directional planning estimates; the finance team maintains the authoritative model.

---

## 5. Business Model

Drinkit monetizes as a marketplace with layered revenue streams:

| Stream | Mechanics | Target Rate |
|--------|-----------|-------------|
| **Store commission** | % of item GMV per fulfilled order, invoiced to store, settled net in weekly payouts | 8–15% by category and city maturity |
| **Delivery fee** | Charged to customer per order; distance-slabbed; waived above free-delivery threshold or via subscription | ₹20–₹60/order |
| **Small-order fee** | Flat fee on carts below minimum order value | ₹30 below ₹500 cart |
| **Convenience / platform fee** | Flat per-order fee to customer | ₹5–₹15/order |
| **Advertising & brand monetization** | Sponsored product placements, category banners, brand pages, sampling-adjacent promotions (strictly within state advertising rules for alcobev — surrogate-free, in-app, age-gated audience only) | CPM/CPC + fixed placements |
| **Drinkit Plus (V2 subscription)** | Monthly/annual fee for free delivery, early access to limited releases, priority support | ₹99/month indicative |
| **Data & insights (V2)** | Anonymized, aggregated sell-through dashboards for brands and distributors | Enterprise contracts |

**Cost drivers:** delivery partner payouts (per-drop + incentives), payment gateway fees, KYC verification costs per user, customer acquisition, compliance/licensing overhead per state, support operations.

**Unit economics thesis:** high AOV (₹1,000+) means commission + fees per order (₹120–₹220) can exceed variable fulfillment cost (₹70–₹110) at moderate density, giving positive contribution margin earlier than grocery q-commerce.

---

## 6. The Four Applications at a Glance

### 6.1 Customer App (iOS/Android)
Dark premium theme (near-black `#0D0D0D` backgrounds, gold/amber `#F5B301` accent). Core journey: Onboarding → Mobile OTP login (+ social) → Age & KYC verification → Location-gated Home (categories: Whisky, Rum, Vodka, Beer, Wine, Liqueurs; search; delivery banner; top picks) → Product listing/details → Cart → Checkout (address, instructions, summary) → Payment (UPI, cards, netbanking, wallet) → Live order tracking (timeline + map) → Order history, reorder, ratings, support.

### 6.2 Store / Vendor Panel
Order inbox with accept/reject and prep timers, live inventory and price management (with per-state MRP compliance), catalog requests, store hours aligned to legal sale hours, payout statements, performance dashboards, license document management.

### 6.3 Delivery Partner App
Onboarding & KYC (with mandatory alcohol-handling training module), go online/offline, order offers with earnings preview, pickup verification at store, navigation, **doorstep ID-check workflow (scan/verify customer ID + capture verification result)**, proof of delivery, earnings and payouts, incentives.

### 6.4 Admin Panel
Role-based web console: city/state configuration (legal age, sale hours, dry days, geo-fences), store onboarding & license verification, catalog master management, customer KYC review queue, order monitoring and intervention, delivery fleet management, pricing/fees/coupons, refunds, payouts, analytics & reports, **compliance log explorer and excise report exports**, support ticketing, CMS for banners.

---

## 7. Technology at a Glance

> Full architecture is specified separately; this is the orientation view. Stack choices below are the working defaults for the build.

| Layer | Choice |
|-------|--------|
| Mobile apps | React Native (single codebase for Customer + Delivery Partner apps) or Flutter — final call at Sprint 0; native modules for maps, camera/ID capture |
| Web panels | React + TypeScript (Store Panel responsive; Admin Panel desktop-first) |
| Backend | Node.js (NestJS) microservices — Auth, KYC, Catalog, Inventory, Order, Payment, Logistics, Notification, Compliance, Support |
| API style | REST + WebSocket (live tracking, order status); internal events on a message bus (Kafka/RabbitMQ) |
| Data stores | PostgreSQL (transactional), Redis (cache, sessions, geo-queries), Elasticsearch/OpenSearch (catalog search), S3-compatible object store (KYC docs, images) |
| Maps & geo | Google Maps Platform (geocoding, routing, live tracking); geo-fencing service for state/city/serviceability polygons |
| Payments | Razorpay/Cashfree aggregator: UPI, cards, netbanking, wallets; payouts API for stores and riders |
| KYC / age verification | DigiLocker + Aadhaar offline XML / SDK-based ID OCR + liveness (vendor: HyperVerge/Signzy class), manual review fallback |
| Notifications | FCM/APNs push, SMS (DLT-registered), WhatsApp Business API, email |
| Observability | Centralized logging, distributed tracing, metrics + alerting (Grafana stack or Datadog) |
| Compliance ledger | Append-only audit log store (WORM-configured) for order/KYC/ID-check events |
| Infra | AWS Mumbai (ap-south-1), containerized (EKS), IaC (Terraform), CI/CD (GitHub Actions) |

**Data residency:** all personal data stored in India. **PII handling:** DPDP Act 2023 compliant — consent capture, purpose limitation, encryption at rest and in transit, retention schedules.

---

## 8. Team Roles Needed

| Function | Roles (initial) |
|----------|-----------------|
| Product | 1 Head of Product, 2 PMs (Consumer; Supply & Logistics) |
| Design | 1 Design Lead, 2 Product Designers (mobile; web panels), 1 Brand/Visual Designer |
| Engineering | 1 Engineering Lead, 3 Mobile Engineers, 3 Backend Engineers, 2 Frontend (web panels), 1 QA Lead + 2 QA, 1 DevOps/SRE, 1 Data Engineer |
| Data & Analytics | 1 Analyst (growth + ops dashboards) |
| Compliance & Legal | 1 Head of Compliance (excise liaison), 1 Legal Counsel (retained), per-state compliance associates |
| Operations | 1 City Launch Lead per city, Store Onboarding Associates, Fleet Ops Manager, Support Team Lead + agents |
| Growth | 1 Growth/Marketing Lead, 1 Lifecycle/CRM Manager |
| Finance | 1 Finance Manager (settlements, reconciliations, taxes) |

---

## 9. Glossary

| Term | Definition |
|------|------------|
| **AOV** | Average Order Value — mean GMV per completed order. |
| **Age Gate** | In-app screen requiring the user to confirm/prove they meet the legal drinking age (LDA) of their state before browsing. |
| **BWS** | Beer, Wine & Spirits — shorthand for the retail alcohol category. |
| **Dry Day** | Government-declared day on which alcohol sale is prohibited (e.g., Republic Day, Gandhi Jayanti, election days). |
| **Dry State** | State/UT with alcohol prohibition (Gujarat, Bihar, Mizoram, Nagaland, Lakshadweep). Drinkit does not operate there. |
| **DLT** | Distributed Ledger Technology registration mandated by TRAI for commercial SMS in India. |
| **DPDP Act** | Digital Personal Data Protection Act, 2023 — India's data protection law. |
| **Excise License** | State-issued license permitting retail sale of alcohol; each Drinkit store must hold a valid one. |
| **FSSAI** | Food Safety and Standards Authority of India (relevant for low-ABV/mixer items where applicable). |
| **Geo-fence** | Polygon defining a serviceable/legal area; used to gate catalog and checkout by state/city/zone. |
| **GMV** | Gross Merchandise Value — total value of items sold, before discounts/fees deductions. |
| **IMFL** | Indian-Made Foreign Liquor — domestically produced spirits (whisky, rum, vodka, gin, brandy). |
| **KYC** | Know Your Customer — government-ID-based identity and age verification. |
| **LDA** | Legal Drinking Age — varies by state: 18, 21, or 25 (e.g., 25 in Delhi historically for some categories, 21 in Maharashtra for beer vs 25 for spirits; configured per state in Admin). |
| **MOV** | Minimum Order Value — cart threshold below which a small-order fee applies. |
| **MRP** | Maximum Retail Price — state-regulated ceiling price for liquor SKUs; stores may not exceed it. |
| **OTP** | One-Time Password — SMS-based login verification code. |
| **POD** | Proof of Delivery — evidence captured at handover (ID-check result, OTP, photo where permitted). |
| **Rider / Delivery Partner** | Independent delivery personnel fulfilling last-mile delivery; used interchangeably in docs; "Delivery Partner" is the customer-facing term. |
| **Serviceability** | Whether a given address can be legally and operationally delivered to (state legal + geo-fence + store coverage + sale hours). |
| **SKU** | Stock Keeping Unit — a unique product variant (brand + expression + pack size, e.g., "XYZ Whisky 750ml"). |
| **SLA** | Service Level Agreement — internal targets, e.g., 45-min delivery promise. |
| **Sale Hours** | State-mandated hours during which alcohol may legally be sold (e.g., 10:00–22:00; configured per state). |
| **TSR** | Ticket Solve Rate — support metric. |
| **WORM** | Write Once Read Many — immutable storage mode used for the compliance ledger. |

---

## 10. Related Documents

- `README.md` — documentation index and reading order
- `01_Product_Vision.md` — vision, mission, positioning, 3-year plan
- `02_PRD.md` — master product requirements (authoritative feature spec)
- `03_User_Personas.md` — persona definitions
- `04_User_Flows.md` — end-to-end flows with diagrams
- `05_User_Flows.md` — end-to-end flows with diagrams
- `06_Information_Architecture.md` — sitemaps, navigation, deep links, gating rules
- `07_Design_System.md` — design system index and approved source of truth
- `08_Design.md` — screen-level design specification
- `21_Task.md` — implementation task breakdown
- `22_Roadmap.md` — phased delivery plan
