# Drinkit

Hyperlocal, compliant alcohol delivery platform for India.

**Architecture lock (Sprint 0):** [docs/architecture/00_Sprint0_Architecture.md](docs/architecture/00_Sprint0_Architecture.md)  
**Execution tracker:** [TASK.md](TASK.md)  
**Product docs:** [docs/](docs/) — read order in documentation index below.

## Stack (locked)

| Surface | Tech |
|---|---|
| Customer + Delivery | React Native + Expo (TypeScript) |
| Store + Admin | Next.js App Router (TypeScript) |
| API | NestJS modular monolith |
| Data | PostgreSQL + PostGIS, Redis, Prisma |
| Monorepo | pnpm + Turborepo |

## Workspace

```text
apps/customer | delivery | store | admin | backend
packages/design-system | ui | types | api | utils | config
infra/docker
```

## Quick start (npm — each app alag folder)

**One-time (repo root):**
```powershell
npm install
copy apps\backend\.env.example apps\backend\.env
```

**Then run each app in its own terminal:**
```powershell
cd apps\customer ; npm run dev     # Expo
cd apps\store    ; npm run dev     # :3001
cd apps\admin    ; npm run dev     # :3002
cd apps\delivery ; npm run dev     # Expo :8082
cd apps\backend  ; npm run dev     # :3000
```

Full guide: [RUN.md](RUN.md)
## Documentation Index

1. [docs/00_Project_Overview.md](docs/00_Project_Overview.md)
2. [docs/01_Product_Vision.md](docs/01_Product_Vision.md)
3. [docs/02_PRD.md](docs/02_PRD.md)
4. [docs/03_Requirements.md](docs/03_Requirements.md)
5. [docs/04_User_Personas.md](docs/04_User_Personas.md)
6. [docs/05_User_Flows.md](docs/05_User_Flows.md)
7. [docs/06_Information_Architecture.md](docs/06_Information_Architecture.md)
8. [docs/07_Design_System.md](docs/07_Design_System.md)
9. [docs/08_Design.md](docs/08_Design.md)
10. [docs/09_Content_Guidelines.md](docs/09_Content_Guidelines.md)
11. [docs/10_Accessibility.md](docs/10_Accessibility.md)
12. [docs/11_Animations.md](docs/11_Animations.md)
13. [docs/12_API_Specification.md](docs/12_API_Specification.md)
14. [docs/13_Database.md](docs/13_Database.md)
15. [docs/14_Backend_Architecture.md](docs/14_Backend_Architecture.md)
16. [docs/15_Security.md](docs/15_Security.md)
17. [docs/16_Payments.md](docs/16_Payments.md)
18. [docs/17_Notifications.md](docs/17_Notifications.md)
19. [docs/18_Search.md](docs/18_Search.md)
20. [docs/19_Analytics.md](docs/19_Analytics.md)
21. [docs/20_Analytics_KPIs.md](docs/20_Analytics_KPIs.md)
22. [docs/20_Test_Cases.md](docs/20_Test_Cases.md)
23. [docs/21_Task.md](docs/21_Task.md)
24. [docs/22_Roadmap.md](docs/22_Roadmap.md)

Conflict rule: **PRD wins**.
