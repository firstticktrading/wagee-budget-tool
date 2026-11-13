# Wagee Budget Tool

Mobile-first personal budgeting app (Next.js, Auth.js, Drizzle, Neon Postgres, Vercel). See issue #1 for the full spec.

## Commands

```bash
npm install
npm run dev          # local dev server
npm test             # vitest (CI-friendly, no external services needed)
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run db:generate  # generate a migration after editing src/db/schema.ts
npm run db:migrate   # apply committed migrations to DATABASE_URL
```

## Owner setup checklist

No secrets live in this repo. Copy `.env.example` to `.env.local` for local development.

### 1. Neon (database)
- [ ] Create a project at https://console.neon.tech (free tier is fine).
- [ ] Copy the **pooled** connection string → `DATABASE_URL`.
- [ ] Run `DATABASE_URL=... npm run db:migrate` (or put it in `.env.local`) to apply the first migration.

### 2. Google OAuth (sign-in)
- [ ] In Google Cloud Console → APIs & Services → OAuth consent screen: configure it (External is fine, add yourself as a test user).
- [ ] Credentials → Create **OAuth client ID** → Web application.
- [ ] Authorised redirect URIs:
  - `http://localhost:3000/api/auth/callback/google`
  - `https://<your-vercel-domain>/api/auth/callback/google`
- [ ] Copy the client ID → `AUTH_GOOGLE_ID`, client secret → `AUTH_GOOGLE_SECRET`.

### 3. Vercel (hosting)
- [ ] Import this GitHub repo into Vercel (framework: Next.js, defaults are fine).
- [ ] Set environment variables (Production, and Preview if wanted):

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Neon connection string |
| `AUTH_SECRET` | random string, e.g. `npx auth secret` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | from Google |
| `ALLOWED_EMAILS` | comma-separated Google emails allowed to sign in |

- [ ] Deploy, open the site, sign in with an allow-listed account.

> **`ALLOWED_EMAILS` is required in production.** If it is unset or empty, everyone is denied. Outside production, unset means anyone with a Google account may sign in (local convenience only).

## Access model

Every page and API route requires an allow-listed session (`src/middleware.ts`, policy in `src/lib/access.ts`). Signed-out page requests redirect to `/signin`; signed-out API requests get `401`. The allow-list is re-checked on every request, so removing an email revokes access immediately. Only `/signin` and `/api/auth/*` are public.

Every user-data table must have a `user_id` column (enforced by `tests/schema.test.ts`) and every query must be scoped to the signed-in user.
