# How to run Drinkit (separate folders + npm)

Install **once** from repo root, then run each app from its own folder in a **separate terminal**.

## 1) One-time setup (root)

```powershell
cd "C:\Users\Administrator\Desktop\Drinkit App"
npm install
```

Backend env (once):

```powershell
copy apps\backend\.env.example apps\backend\.env
```

Database (needs Docker Desktop):

```powershell
npm run docker:up
npm run db:generate
```

## 2) Run each app (alag terminal, alag folder)

### Customer App (Expo)
```powershell
cd "C:\Users\Administrator\Desktop\Drinkit App\apps\customer"
npm run dev
```
Phone pe Expo Go QR, ya `a` for Android emulator.

### Delivery Partner App
```powershell
cd "C:\Users\Administrator\Desktop\Drinkit App\apps\delivery"
npm run dev
```

### Store Panel
```powershell
cd "C:\Users\Administrator\Desktop\Drinkit App\apps\store"
npm run dev
```
→ http://localhost:3001

### Admin Panel
```powershell
cd "C:\Users\Administrator\Desktop\Drinkit App\apps\admin"
npm run dev
```
→ http://localhost:3002

### Backend API
```powershell
cd "C:\Users\Administrator\Desktop\Drinkit App\apps\backend"
npm run dev
```
→ http://localhost:3000 · Swagger `/docs`

## Notes

- Do **not** paste 4 commands in one line — har app ke liye naya terminal.
- Agar port busy ho (EADDRINUSE), pehle purana process band karo.
- Shared packages (`packages/*`) monorepo workspaces se link hote hain — root pe pehle install zaroori:
  ```powershell
  pnpm install
  ```
  Phir har folder mein `npm run dev` / `pnpm dev` dono chalenge.
- Agar `npm install` root pe fail ho (pnpm lock conflict), use `pnpm install`.
