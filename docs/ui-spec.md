# UI Spec

**Reference image:** `leaderboard1.jpg` (Pro Kabaddi League table)

## Aesthetic Direction

- **Theme:** Dark, dramatic — deep navy/purple radial gradient background
- **Typography:** Bold condensed display font (e.g. `Barlow Condensed`, `Oswald`, or `Bebas Neue`) for names and scores; clean sans-serif for supporting text
- **Accent colors:** Electric blue `#00BFFF` or gold `#FFD700`
- **Top 3 rows:** Subtle glow or highlight treatment; gold/silver/bronze rank badges
- **Overall feel:** Stadium scoreboard — high contrast, readable at a distance

## Components

### `Dashboard.jsx`
Root layout. Renders the header (title + `LiveIndicator`) and `LeaderboardTable`. Calls `useLeaderboard()` and passes data down.

### `LiveIndicator.jsx`
- Pulsing green dot animation
- "LIVE" label
- "Updated X seconds ago" counter (updates every second via its own interval)
- Shows error banner if `error` is set

### `LeaderboardTable.jsx`
- Renders a `<table>` with columns: Rank, Team Name, Score, Extra stat
- Maps rows to `<TeamRow>` components
- Shows shimmer skeleton rows while `rows.length === 0` and no error

### `TeamRow.jsx`
- Displays rank badge (styled gold/silver/bronze for top 3, plain otherwise)
- Applies `.row-changed` CSS class when `row.changed === true`
- `.row-changed` triggers a yellow fade-out animation (`flash-update` keyframe)

## Animations

```css
/* Yellow flash on score change */
@keyframes flash-update {
  0%   { background-color: rgba(255, 200, 0, 0.35); }
  100% { background-color: transparent; }
}
.row-changed { animation: flash-update 1.5s ease-out forwards; }

/* Pulsing live dot */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.4); }
}
.live-dot { animation: pulse 1.5s ease-in-out infinite; }
```

## Loading Skeleton

While awaiting first data, render 8–12 placeholder rows with a shimmer effect (`@keyframes shimmer` on a gradient background-position). No spinner — the skeleton should match the table layout exactly.

## Responsive

- Desktop-first (primary use case: displayed on a big screen)
- Readable on tablet (min-width: 768px)
- No mobile optimization required