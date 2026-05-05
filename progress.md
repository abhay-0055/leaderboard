# Progress

> This file is updated by Claude Code at the end of each phase.

## Current Phase
**All phases complete — ready to deploy**

---

## Phase Log

### Phase 1 — Project Scaffold
- **Status:** Complete
- **Completed:** 2026-05-04
- **Commit:** `585bf0b` — "phase 1: project scaffold, deps, env config"
- **Notes:** Vite + React scaffolded in `leaderboard-dashboard/`. Boilerplate stripped; placeholder stubs created for all components, hooks, and utils. `papaparse` installed. `.env.example`, `.gitignore`, and `README.md` in place. `npm run build` verified clean.

### Phase 2 — Data Layer
- **Status:** Complete
- **Completed:** 2026-05-04
- **Commit:** `b61f51e` — "phase 2: data layer — csv fetch, parser, polling hook"
- **Notes:** `parseCsv.js` built with Papa Parse (header mode, dynamicTyping, sort-by-score, rank assignment, column mapping). `useLeaderboard.js` polls on mount and every `VITE_REFRESH_INTERVAL_MS`, tags changed rows for flash animation, pauses on hidden tab. CORS issue resolved by adding a server-side `/api/csv` proxy (`api/csv.js`). Papa Parse `FieldMismatch` errors treated as non-fatal.

### Phase 3 — UI Components
- **Status:** Complete
- **Completed:** 2026-05-04
- **Commit:** `e158ef8` — "phase 3: full UI — components, dark theme, animations"
- **Notes:** `globals.css` — CSS variables, Barlow Condensed font, keyframes (`flash-update`, `pulse`, `shimmer`, `fade-in`). `LiveIndicator` — pulsing green dot, "LIVE" label, "Updated Xs ago" counter (own 1s interval), error banner. `TeamRow` — gold/silver/bronze badges + left accent bar for top 3, `.row-changed` flash class. `LeaderboardTable` — 4-column table, 10 shimmer skeleton rows while loading. `Dashboard` — spotlight cone overlays, header, wires `useLeaderboard`. `useLeaderboard` updated to expose `lastUpdated` timestamp. `console.log` removed from `App.jsx`. `npm run build` clean.

### Phase 4 — Polish & Deployment
- **Status:** Complete
- **Completed:** 2026-05-04
- **Commit:** `8bc0e39` — "phase 4: production build, error handling, deployment docs"
- **Notes:** Revoked-share-link detection tightened to `startsWith("<!DOCTYPE")`. `cache: "no-store"` confirmed in fetch. Column map updated to real headers (`Team`, `Referral`, `Points`); `data-layer.md` synced to match. `npm run build` clean (214 kB JS). `README.md` updated with Deploy section (Vercel env vars, Netlify pointer). `dist/` already in `.gitignore`.

### Phase 5 — Redesign: Dual Leaderboard
- **Status:** Complete
- **Completed:** 2026-05-05
- **Commit:** `b2e5843` — "redesign: dual leaderboard, google sheets, silver/gold themes"
- **Notes:** Full architectural redesign. Data source changed from a single OneDrive CSV to two independent Google Sheet CSV URLs. `parseCsv.js` now takes `nameCol`/`valueCol` params; internal row key renamed from `score` to `value`. `useLeaderboard` accepts `csvUrl`+column params; two thin wrappers `useReferrals` and `usePoints` call it. New `Header.jsx` holds the title and a shared `LiveIndicator` reporting errors from both feeds independently. `LeaderboardTable` and `TeamRow` are theme-aware (`"silver"` | `"gold"`). `globals.css` fully rewritten with silver (cream rows, grey header bar) and gold (dark purple rows, gold header bar) themes in a CSS grid; stacks below 900 px. Column headers confirmed against live sheets: `Team` / `Referrals` and `Team` / `Points`. `npm run build` clean (215 kB JS).

### Phase 6 — Restore Server-Side Proxy
- **Status:** Complete
- **Completed:** 2026-05-05
- **Notes:** The Phase 5 approach fetched Google Sheets URLs directly from the browser, which required "Publish to web" (fully public). Reverted to a server-side proxy so sheets only need "Anyone with the link → Viewer" sharing. Added `api/referrals.js` and `api/points.js` Vercel serverless functions. Restored the Vite dev proxy in `vite.config.js` for `/api/referrals` and `/api/points`. Hooks now call local `/api/...` paths — no Google URLs in the client bundle. Env vars renamed to `REFERRALS_CSV_URL` / `POINTS_CSV_URL` (no `VITE_` prefix; server-side only). URL format switched to `export?format=csv&gid=0` (works with "Anyone with the link"). `npm run build` clean.
