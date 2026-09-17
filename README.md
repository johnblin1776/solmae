# Solmae

Women-centered discovery and community. This repo is a Next.js App Router app with Supabase.

## v1: public waitlist + internal product

The public site is a waitlist landing (elevated card + email capture). Inspiration / Education / Connection live on `/about` via `ThreePillarsSection` for later reuse on a fuller home page. Product surfaces stay in the codebase but are not publicly reachable.

**Public**

- `/` — waitlist email capture only
- `/about` — mission, three pillars, principles, ecosystem
- `/founding-50` — Founding 50 explanation + application
- `/contact` — contact / email capture
- `/internal` — password gate for the product

**Internal-only** (404 unless the gate is open)

`/home`, `/invite`, `/apply`, `/onboard`, `/members`, `/creators`, `/businesses`, `/benches`, `/profile`, `/admin`

### Opening the product

1. Set `INTERNAL_GATE_SECRET` in the environment.
2. Visit `/internal` and enter that password.
3. A httpOnly cookie unlocks the product routes for that browser.

Or set `INTERNAL_ACCESS_ENABLED=true` to skip the password (local/preview only — do not enable in production).

## Environment variables

Copy `.env.example` and fill in values. Do not commit secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Production | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production | Anon key (used if no service role) |
| `SUPABASE_SERVICE_ROLE_KEY` | Recommended | Server-side waitlist / application inserts |
| `INTERNAL_GATE_SECRET` | Production | Password for `/internal` |
| `INTERNAL_ACCESS_ENABLED` | No | `true` opens every product route |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Footer / contact mailto |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Footer Instagram link |

## Waitlist + Founding 50 persistence

Apply `supabase/migrations/003_waitlist.sql` in the Supabase SQL editor (or via the CLI) to create:

- `waitlist_signups` — unique on lowercased email
- `founding_fifty_applications` — unique on lowercased email

In local development, if Supabase env vars are missing, signups are written to `.data/` so the forms still persist. That fallback is disabled in production.

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## Deploy on Vercel

This is a standard Next.js app. Create a Vercel project from the GitHub repo, add the environment variables above, and apply the Supabase migration before taking the waitlist live.
