# Leaderboard Dashboard

A real-time **dual leaderboard** — Referrals (silver theme) and Points (gold theme) — side by side on a dark purple background. Each table polls its own Google Sheet CSV via a server-side proxy. Sheets only need "Anyone with the link" sharing — no publishing required.

## Current state

Fully functional end-to-end. Both leaderboards load and error independently. Dark gaming/esports UI with silver + gold themes, rank badges, flash animations, and a shared pulsing live indicator.

## Prerequisites

- Node.js 18+
- A `.env` file based on `.env.example` with both CSV URLs set

## Setup

```bash
cp .env.example .env
# Edit .env — set REFERRALS_CSV_URL and POINTS_CSV_URL
# Sheets must be shared: File → Share → "Anyone with the link" (Viewer)
npm install
```

## Run

```bash
npm run dev   # → http://localhost:5173
```

Each table auto-polls every 30 s (configurable via `VITE_REFRESH_INTERVAL_MS`). Rows have the shape:

```js
{ name, value, rank, changed }
```

`changed: true` is set on rows whose value differs from the previous poll — those rows flash yellow.

## Environment variables

| Variable | Where used | Description |
|---|---|---|
| `REFERRALS_CSV_URL` | Server only | `export?format=csv` URL for the Referrals Google Sheet |
| `POINTS_CSV_URL` | Server only | `export?format=csv` URL for the Points Google Sheet |
| `VITE_REFRESH_INTERVAL_MS` | Client | Poll interval in ms (default `30000`) |

`REFERRALS_CSV_URL` and `POINTS_CSV_URL` have no `VITE_` prefix — they stay server-side and never appear in the client bundle.

## Google Sheets URL format

```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<GID>
```

`gid=0` is the first tab. Find the gid in the sheet URL after `#gid=`. The sheet must be shared as **"Anyone with the link → Viewer"** (File → Share → Share with others). No "Publish to web" required.

## Column name mapping

Update `src/hooks/useReferrals.js` and `src/hooks/usePoints.js` if your sheet headers differ:

| Table | Sheet column | Internal key |
|---|---|---|
| Referrals | `Team` | `name` |
| Referrals | `Referrals` | `value` |
| Points | `Team` | `name` |
| Points | `Points` | `value` |

## Features

- **Dual leaderboard** — Referrals (silver) + Points (gold), side by side
- **Independent feeds** — one error/loading state does not affect the other
- **Rank badges** — gold / silver / bronze for top 3, with glow; #1 gets wing embellishment
- **Flash animation** — yellow fade-out on any value change
- **Pulsing live dot** — green pulse + "Updated Xs ago" counter
- **Shimmer skeleton** — placeholder rows while awaiting first data
- **Visibility-aware polling** — pauses when tab is hidden, resumes on focus
- **Responsive** — tables stack vertically below 900 px

## Build & deploy

```bash
npm run build    # → dist/
npm run preview  # preview production build locally
```

Deploy `dist/` to **Vercel** or **Netlify** (both auto-detect Vite). Set all three env vars in the hosting dashboard (`REFERRALS_CSV_URL`, `POINTS_CSV_URL`, `VITE_REFRESH_INTERVAL_MS`). See `docs/deployment.md` for the full checklist.
