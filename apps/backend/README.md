# Backend API

```powershell
cd apps\backend
copy ..\..\apps\backend\.env.example .env
npm run prisma:generate
npm run dev
```

→ http://localhost:3000 · Swagger `/docs`

Needs Postgres + Redis (`npm run docker:up` from repo root). See [RUN.md](../../RUN.md).
