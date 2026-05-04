# Leaderboard Dashboard

A real-time leaderboard that polls a publicly shared OneDrive Excel file (via CSV URL) and auto-refreshes the UI.

## Current state

Data layer is implemented. Fetching, parsing, polling, and change-tagging all work. No UI yet — the app renders a row count and logs the parsed rows to the browser console.

## Prerequisites

- Node.js 18+
- A `.env` file based on `.env.example` with a real `VITE_CSV_URL`

## Setup

```bash
cp .env.example .env
# edit .env — set VITE_CSV_URL to your OneDrive CSV download URL
npm install
```

## Run

```bash
npm run dev   # → http://localhost:5173
```

Open DevTools → Console. On each poll (default: every 30 s) you will see the parsed row array logged. Each row has the shape:

```js
{ name, score, extra, rank, changed }
```

`changed: true` is set on rows whose score differs from the previous poll.

## Testing the data layer

1. Set `VITE_CSV_URL` in `.env` to a real OneDrive download URL (see `docs/data-layer.md` for how to generate one).
2. `npm run dev` → open `http://localhost:5173`.
3. Check the browser console — the row array is logged on every successful fetch.
4. Optionally lower `VITE_REFRESH_INTERVAL_MS` to `5000` in `.env` to see polling fire quickly.
5. Switch to another tab and back — polling pauses while hidden and resumes on focus.

## Build

```bash
npm run build
npm run preview
```
