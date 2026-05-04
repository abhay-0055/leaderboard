# Leaderboard Dashboard

A real-time leaderboard that polls a publicly shared OneDrive Excel file (via CSV URL) and auto-refreshes the UI.

## Current state

Fully functional end-to-end. Dark stadium-style UI is live with all components, animations, and the polling data layer wired together. Point a browser at the dev server and the leaderboard renders immediately.

## Prerequisites

- Node.js 18+
- A `.env` file based on `.env.example` with a real `VITE_CSV_URL`

## Setup

```bash
cp .env.example .env
# edit .env — set VITE_CSV_URL to your OneDrive CSV download URL
# see docs/data-layer.md for how to generate the URL
npm install
```

## Run

```bash
npm run dev   # → http://localhost:5173
```

The dashboard auto-polls every 30 s (configurable via `VITE_REFRESH_INTERVAL_MS`). Each row has the shape:

```js
{ name, score, extra, rank, changed }
```

`changed: true` is set on rows whose score differs from the previous poll — those rows flash yellow.

## Features

- **Dark theme** — deep navy/purple radial gradient, stadium-scoreboard aesthetic
- **Rank badges** — gold / silver / bronze for top 3, with glow
- **Flash animation** — yellow fade-out on any score change
- **Pulsing live dot** — green pulse + "Updated Xs ago" counter
- **Shimmer skeleton** — 10 placeholder rows while awaiting first data
- **Visibility-aware polling** — pauses when tab is hidden, resumes on focus

## Build

```bash
npm run build    # → dist/
npm run preview  # preview production build locally
```

## Deploy

### Vercel (recommended)

1. Connect the repo to Vercel.
2. In **Project Settings → Environment Variables** set:
   - `CSV_URL` — your OneDrive CSV download URL (no `VITE_` prefix; never exposed to the client)
   - `VITE_REFRESH_INTERVAL_MS` — poll interval in ms (default `30000`)
3. Vercel auto-detects Vite. Build command: `npm run build`. Output: `dist/`. The `api/csv.js` file is served as a serverless function.

### Netlify

See `docs/deployment.md` for the Netlify Functions adapter snippet and redirect config.
