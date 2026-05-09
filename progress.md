# Progress

> This file is updated by Claude Code at the end of each phase.

## Phase 1 — Initial build ✓

Built the complete single-leaderboard bar chart dashboard from scratch on the `internships` branch.

**Delivered:**
- `package.json`, `index.html`, `vite.config.js`, `.env.example`, `.gitignore`, `eslint.config.js`
- `api/registrations.js` — Vercel edge function proxying Google Sheets CSV
- `src/utils/parseCsv.js` — Papa Parse wrapper (sort desc, rank assign, empty-safe)
- `src/hooks/useLeaderboard.js` — polling hook with change detection and visibility pause
- `src/components/LiveIndicator.jsx` — pulsing dot, seconds-ago counter, error banner
- `src/components/Header.jsx` — title, subtitle, live indicator
- `src/components/BarChart.jsx` — 3D bar chart with skeleton, empty state, flash animation
- `src/components/Dashboard.jsx` — root layout wiring hook → chart
- `src/styles/globals.css` — full styling, animations, responsive

**Key decisions:**
- Bars sorted ascending left to right (matches reference image `docs/bar-graph.png`)
- 3D effect is pure CSS using `clip-path` parallelograms for top and right side faces
- Colors assigned by deterministic hash of team name for stability across re-renders
- Empty sheet distinguished from loading via `lastUpdated` timestamp
