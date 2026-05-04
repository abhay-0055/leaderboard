# Live Leaderboard Dashboard

A real-time leaderboard dashboard that polls a publicly shared OneDrive Excel file (via CSV URL) and auto-refreshes the UI. No backend, no auth, no cost.

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
- Column names in `parseCsv.js` must exactly match Excel headers (case-sensitive)
- Always fetch CSV with `cache: "no-store"` to prevent stale responses
- Pause polling when tab is hidden via `visibilitychange` event

## Project Structure (target)

```
leaderboard-dashboard/
├── public/
├── src/
│   ├── hooks/
│   │   └── useLeaderboard.js
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── LeaderboardTable.jsx
│   │   ├── TeamRow.jsx
│   │   └── LiveIndicator.jsx
│   ├── utils/
│   │   └── parseCsv.js
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   ├── data-layer.md
│   ├── ui-spec.md
│   └── deployment.md
├── .env
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

- **OneDrive CSV setup, polling hook, parser, env vars:** `@docs/data-layer.md`
- **UI components, animations, dark theme, aesthetic direction:** `@docs/ui-spec.md`
- **Hosting, deployment checklist, known gotchas:** `@docs/deployment.md`

**Visual reference:** `@leaderboard1.jpg` — target dashboard style (Pro Kabaddi League table)