# Plan

## Phase 1 — Project Scaffold ✓
- [x] Initialise React + Vite project (`leaderboard-dashboard`)
- [x] Set up folder structure per `CLAUDE.md`
- [x] Install dependencies: `papaparse`
- [x] Create `.env.example` with `VITE_CSV_URL` and `VITE_REFRESH_INTERVAL_MS`
- [x] Create `.gitignore` (node_modules, dist, .env, Vite cache)
- [x] Create barebones `README.md` with "Current state" note
- [x] Verify `npm run dev` runs without errors
- [x] Git commit: `"phase 1: project scaffold, deps, env config"`

## Phase 2 — Data Layer ✓
- [x] Build `src/utils/parseCsv.js` (Papa Parse wrapper, sort, rank, column mapping)
- [x] Build `src/hooks/useLeaderboard.js` (polling, diff/change-tagging, visibilitychange, error state)
- [x] Wire env vars (`VITE_CSV_URL`, `VITE_REFRESH_INTERVAL_MS`)
- [x] Add temporary `console.log(rows)` in `App.jsx` to verify pipeline
- [x] Test with a real CSV URL in browser console
- [x] Update `README.md` with data layer test instructions
- [x] Git commit: `"phase 2: data layer — csv fetch, parser, polling hook"`

## Phase 3 — UI Components ✓
- [x] Set up `globals.css` with CSS variables, dark theme, keyframe animations
- [x] Build `LiveIndicator.jsx` (pulsing dot, LIVE label, "Updated X seconds ago", error banner)
- [x] Build `TeamRow.jsx` (rank badge, gold/silver/bronze top 3, row flash on change)
- [x] Build `LeaderboardTable.jsx` (table, column headers, shimmer skeleton)
- [x] Build `Dashboard.jsx` (root layout, header, wired to `useLeaderboard`)
- [x] Remove temporary `console.log` from Phase 2
- [x] Verify full end-to-end with live CSV URL
- [x] Git commit: `"phase 3: full UI — components, dark theme, animations"`

## Phase 4 — Polish & Deployment ✓
- [x] Add revoked-share-link detection (check response for `<!DOCTYPE`)
- [x] Confirm `cache: "no-store"` in fetch call
- [x] Verify column name mappings in `parseCsv.js` match real Excel headers
- [x] Run `npm run build` and fix any errors
- [x] Confirm `dist/` is in `.gitignore`
- [x] Update `README.md` with final run + deployment instructions
- [x] Git commit: `"phase 4: production build, error handling, deployment docs"`