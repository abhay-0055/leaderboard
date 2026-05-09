# Leaderboard Dashboard

A real-time registrations leaderboard displayed as a 3D bar chart, polling a publicly published Google Sheet. Single leaderboard, gaming/esports aesthetic, no backend, no auth, no cost.

## Current state

Fully functional. The bar chart renders 3D bars sorted ascending left to right, with team names below and scores above. All bar bases sit on the same horizontal line regardless of how many lines a team name wraps to. Bars animate up on first load, flash on value change, show a shimmer skeleton while loading, and display a graceful message when the sheet has no rows.

## Prerequisites

- Node.js 18+
- A Google Sheet with columns `Team` and `Registrations`, shared as "Anyone with the link" (Viewer)

## Setup

```bash
npm install
cp .env.example .env
# Fill in REGISTRATIONS_CSV_URL in .env
```

## Run

```bash
npm run dev       # dev server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `REGISTRATIONS_CSV_URL` | Yes | Full Google Sheets CSV export URL (server-side only) |
| `VITE_REFRESH_INTERVAL_MS` | No | Poll interval in ms (default: `30000`) |

`REGISTRATIONS_CSV_URL` is never exposed to the client bundle — it lives only in the Vite dev proxy and the Vercel edge function (`api/registrations.js`). The client always fetches `/api/registrations`.

## Google Sheets URL format

```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<GID>
```

Find `SHEET_ID` in the sheet URL. `gid=0` is the first tab; find others after `#gid=` in the browser URL bar. The sheet must be shared: **File → Share → Share with others → Anyone with the link (Viewer)**.

## Column name mapping

| Sheet header | Internal key |
|---|---|
| `Team` | `name` |
| `Registrations` | `value` |

Column names are case-sensitive and must match the sheet headers exactly.

## Features

- 3D bar chart — CSS-only perspective using clip-path geometry (front face, top face, right side face)
- Ascending sort left to right — shortest bar on the left, tallest on the right
- Each team gets a deterministic color from an 8-color palette (hash of team name)
- Grow-in animation on first data load, cascading left to right with 55 ms per bar delay
- Flash animation on value change (brightness burst, 1.5 s)
- Shimmer skeleton while awaiting first data
- "Add teams in the sheet please" message when sheet has rows but none pass the filter, or is empty
- Pauses polling when tab is hidden, resumes on focus

## Build & deploy

See `docs/deployment.md`.
