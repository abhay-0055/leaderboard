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

## Phase 5 — Redesign: Dual Leaderboard ✓
- [x] Replace single OneDrive CSV source with two independent Google Sheet CSV URLs
- [x] Refactor `parseCsv.js` to accept `nameCol`/`valueCol` params; internal key `value` (was `score`)
- [x] Refactor `useLeaderboard.js` to accept `csvUrl`, `nameCol`, `valueCol`
- [x] Add `useReferrals.js` — thin wrapper calling `/api/referrals`
- [x] Add `usePoints.js` — thin wrapper calling `/api/points`
- [x] Add `Header.jsx` — event title + shared `LiveIndicator`
- [x] Rewrite `LiveIndicator.jsx` — shows separate error warnings per feed
- [x] Rewrite `LeaderboardTable.jsx` — accepts `title`, `columnLabel`, `theme` (`"silver"` | `"gold"`)
- [x] Rewrite `TeamRow.jsx` — theme-aware badge and row colours
- [x] Rewrite `Dashboard.jsx` — side-by-side `tables-row` grid, calls both hooks independently
- [x] Rewrite `globals.css` — silver + gold dual themes, responsive stack below 900 px
- [x] Update `.env.example` and confirm real column headers (`Team`, `Referrals`, `Points`)
- [x] Update `README.md` for dual-sheet setup
- [x] `npm run build` clean
- [x] Git commit: `"redesign: dual leaderboard, google sheets, silver/gold themes"`

## Phase 6 — Restore Server-Side Proxy ✓
- [x] Add `api/referrals.js` — Vercel function proxying `REFERRALS_CSV_URL`
- [x] Add `api/points.js` — Vercel function proxying `POINTS_CSV_URL`
- [x] Restore Vite dev proxy in `vite.config.js` for `/api/referrals` and `/api/points`
- [x] Remove `import.meta.env` URL references from `useReferrals.js` and `usePoints.js`; use local `/api/...` paths
- [x] Rename env vars to `REFERRALS_CSV_URL` / `POINTS_CSV_URL` (drop `VITE_` prefix — server-side only)
- [x] Switch URL format to `export?format=csv&gid=0` (works with "Anyone with the link" sharing; no "Publish to web" required)
- [x] Update `.env` and `.env.example`
- [x] `npm run build` clean

## Phase 7 — 4-Column Tables (Referrals + Enrolls) ✓
- [x] Add `secondaryCol` param to `parseCsv.js`; include `secondary` field on each row
- [x] Add `secondaryCol` param to `useLeaderboard.js`; thread through to `fetchAndParse` and `useCallback` deps
- [x] Update `useReferrals.js` — pass `"Points"` as `secondaryCol` (sort key stays `Referrals`)
- [x] Update `usePoints.js` — pass `"Enrolls"` as `secondaryCol` (sort key stays `Points`)
- [x] Replace `columnLabel` prop with `columns: [{label, field}]` array in `LeaderboardTable`
- [x] Update `SkeletonRow` to render 4 `<td>` elements; `colSpan` computed from `columns.length + 2`
- [x] Update `TeamRow` to iterate `columns`; `field="value"` → themed primary cell; `field="secondary"` → muted `.secondary-cell`
- [x] Update `Dashboard` — Referrals: `[REFERRALS (value), POINTS (secondary)]`; Points: `[ENROLLS (secondary), POINTS (value)]`
- [x] Add `.secondary-cell` and `.secondary-cell--{theme}` to `globals.css`; adjust column widths
- [x] Update `README.md` column mapping table and row shape docs
- [x] `npm run build` clean
