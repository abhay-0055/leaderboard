# Live Leaderboard Dashboard

A real-time leaderboard dashboard polling its own publicly published Google Sheet CSV. Solid bar graph-inspired layout, gaming/esports aesthetic. No backend, no auth, no cost.

## Stack

- **React + Vite** — frontend
- **Papa Parse** — CSV parsing
- **Custom CSS variables** — styling/theming
- **Vercel / Netlify** — hosting

## Housekeeping

- **`.gitignore`:** Every time a new file type or directory is introduced (build outputs, uploaded assets, runtime data, tool caches, etc.), add it to `.gitignore` if it should not be committed.
- **`README.md`:** Keep it current with what actually runs right now. After each phase, update the "Current state" note, prerequisites, and run instructions to reflect what a developer can actually do at that point.

## Key Conventions

- All environment variables prefixed with `VITE_`
- Column names in `parseCsv.js` must exactly match Google Sheet headers (case-sensitive)
- Always fetch CSV with `cache: "no-store"` to prevent stale responses
- Pause polling when tab is hidden via `visibilitychange` event
- Each leaderboard loads and errors independently — one failure must not affect the other

## Project Structure (target)



## Commands



## Full Specs

- **Google Sheets CSV setup, polling hooks, parser, env vars:** `@docs/data-layer.md`
- **UI components, dual-table layout, themes, animations:** `@docs/ui-spec.md`
- **Hosting, deployment checklist, known gotchas:** `@docs/deployment.md`

**Visual reference:** `@docs/bar-graph.png` — target dashboard design (3D named bars with score on top)