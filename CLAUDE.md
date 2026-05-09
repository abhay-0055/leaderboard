# Live Leaderboard Dashboard

A real-time registrations leaderboard displayed as a 3D bar chart, polling a publicly published Google Sheet CSV. Gaming/esports aesthetic. No backend, no auth, no cost.

## Stack

- **React + Vite** — frontend
- **Papa Parse** — CSV parsing
- **Custom CSS variables** — styling/theming
- **Vercel / Netlify** — hosting

## Housekeeping

- **`.gitignore`:** Every time a new file type or directory is introduced (build outputs, uploaded assets, runtime data, tool caches, etc.), add it to `.gitignore` if it should not be committed.
- **`README.md`:** Keep it current with what actually runs right now. After each phase, update the "Current state" note, prerequisites, and run instructions to reflect what a developer can actually do at that point.
- **`progress.md`:** Log completed phases with what was delivered and key decisions made.

## Key Conventions

- `REGISTRATIONS_CSV_URL` has no `VITE_` prefix — it is server-side only (Vite proxy + Vercel edge function). Never expose it to the client bundle.
- `VITE_REFRESH_INTERVAL_MS` is the only client-side env var.
- Column names in `parseCsv.js` must exactly match Google Sheet headers (case-sensitive): `Team`, `Registrations`.
- Always fetch CSV with `cache: "no-store"` to prevent stale responses.
- Pause polling when tab is hidden via `visibilitychange` event.
- Distinguish loading state (`!lastUpdated`) from empty-sheet state (`lastUpdated && rows.length === 0`) — do not conflate them.

## Project Structure

```
leaderboard-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── hooks/
│   │   └── useLeaderboard.js      # polling hook — change detection, visibility pause
│   ├── components/
│   │   ├── Dashboard.jsx          # root layout, wires hook → chart
│   │   ├── Header.jsx             # title, subtitle, LiveIndicator
│   │   ├── BarChart.jsx           # 3D bar chart + skeleton + empty state
│   │   └── LiveIndicator.jsx      # pulsing dot, seconds-ago, error banner
│   ├── utils/
│   │   └── parseCsv.js            # Papa Parse wrapper
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── api/
│   └── registrations.js           # Vercel edge function — proxies CSV URL
├── docs/
│   ├── data-layer.md
│   ├── ui-spec.md
│   ├── deployment.md
│   └── bar-graph.png              # visual reference
├── .env                           # local only, never committed
├── .env.example
├── CLAUDE.md
└── README.md
```

## Commands

```bash
npm install       # install deps
npm run dev       # dev server → localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## Full Specs

- **Google Sheets CSV setup, polling hooks, parser, env vars:** `@docs/data-layer.md`
- **UI components, 3D bar chart, colors, animations:** `@docs/ui-spec.md`
- **Hosting, deployment checklist, known gotchas:** `@docs/deployment.md`

**Visual reference:** `@docs/bar-graph.png` — target dashboard design (3D bars, ascending left to right, score above, team name below)
