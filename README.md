# Solmae

Women-centered discovery and community. This repo is a Next.js App Router app. Public waitlist and Founding 50 signups go to a shared Google Sheet.

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
| `WAITLIST_SHEET_WEBHOOK_URL` | Production | Apps Script web app URL that appends Sheet rows |
| `WAITLIST_SHEET_WEBHOOK_SECRET` | No | Optional shared secret (`secret` body + `X-Webhook-Secret`) |
| `FOUNDING_50_SHEET_WEBHOOK_URL` | No | Override webhook for Founding 50; defaults to the waitlist URL |
| `INTERNAL_GATE_SECRET` | Production | Password for `/internal` |
| `INTERNAL_ACCESS_ENABLED` | No | `true` opens every product route |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Footer / contact mailto |
| `NEXT_PUBLIC_INSTAGRAM_URL` | No | Footer Instagram link |
| `NEXT_PUBLIC_SUPABASE_URL` | No | Unused for waitlist; reserved for later product work |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | No | Unused for waitlist |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Unused for waitlist |

## Waitlist + Founding 50 persistence

Signups append to a shared Google Sheet. Waitlist no longer uses Supabase.

### Create the Sheet

1. Create a Google Sheet and share it with John, Jen, and Lauren.
2. Name the first tab **Waitlist**. Header row: `Timestamp | Email | Source`.
3. Optional second tab **Founding 50**. Header row: `Timestamp | Email | Name | What you know | What you want to know | Source`.

### Apps Script webhook

1. In the Sheet: **Extensions → Apps Script**.
2. Paste [`scripts/waitlist-sheet-apps-script.js`](scripts/waitlist-sheet-apps-script.js).
3. Optional: **Project Settings → Script properties** → `WEBHOOK_SECRET` (same value as `WAITLIST_SHEET_WEBHOOK_SECRET`).
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** (the site server posts here; treat the URL as a secret)
5. Copy the web app URL.

Redeploy the Apps Script after you edit it. A `GET` to the URL should return `{"ok":true,"service":"solmae-waitlist-sheet"}`.

### Vercel env

Set `WAITLIST_SHEET_WEBHOOK_URL` to that web app URL. Optionally set `WAITLIST_SHEET_WEBHOOK_SECRET`. Production returns a 500 if the webhook URL is missing.

Locally, if the webhook URL is unset, signups write to `.data/waitlist.json` and `.data/founding-fifty.json`.

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

This is a standard Next.js app. Create a Vercel project from the GitHub repo and set `WAITLIST_SHEET_WEBHOOK_URL` (plus the optional webhook secret) before taking the waitlist live.
