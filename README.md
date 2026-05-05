# Leaderboard Dashboard

A real-time **dual leaderboard** — Referrals (silver theme) and Points (gold theme) — side by side on a dark purple background. Each table polls its own publicly published Google Sheet CSV independently. No backend, no auth, no cost.

## Current state

Fully functional end-to-end. Both leaderboards load and error independently. Dark gaming/esports UI with silver + gold themes, rank badges, flash animations, and a shared pulsing live indicator.

## Prerequisites

- Node.js 18+
- A `.env` file based on `.env.example` with both CSV URLs set

## Setup

```bash
cp .env.example .env
# Edit .env — set VITE_REFERRALS_CSV_URL and VITE_POINTS_CSV_URL
# See docs/data-layer.md for how to publish a Google Sheet as CSV
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

| Variable | Description |
|---|---|
| `VITE_REFERRALS_CSV_URL` | Published CSV URL for the Referrals Google Sheet |
| `VITE_POINTS_CSV_URL` | Published CSV URL for the Points Google Sheet |
| `VITE_REFRESH_INTERVAL_MS` | Poll interval in ms (default `30000`) |

## Google Sheets CSV URL format

```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/gviz/tq?tqx=out:csv&sheet=<SHEET_NAME>
```

Publish via **File → Share → Publish to web → CSV**. Paste the URL into `.env`. Test it in a browser — it should download a `.csv` directly.

## Column name mapping

Update `src/hooks/useReferrals.js` and `src/hooks/usePoints.js` if your sheet headers differ:

| Table | Sheet column | Internal key |
|---|---|---|
| Referrals | `Team Name` | `name` |
| Referrals | `Referral` | `value` |
| Points | `Team Name` | `name` |
| Points | `Column 3` | `value` |

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

Deploy `dist/` to **Vercel** or **Netlify** (both auto-detect Vite). Set all three `VITE_*` env vars in the hosting dashboard. See `docs/deployment.md` for the full checklist.
