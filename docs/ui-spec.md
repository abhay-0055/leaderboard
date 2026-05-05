# UI Spec

**Reference image:** `@docs/new-leaderboard.png`

## Layout

Two leaderboards sit **side by side**, horizontally centred on a full-viewport dark background. Above both, a shared header with the event title and a single `LiveIndicator`.

```
┌─────────────────────────────────────────────────┐
│           MANDI CHALLENGE  🟢 LIVE              │
│                                                 │
│  ┌──────────────────┐  ┌──────────────────────┐ │
│  │ REFERRALS        │  │ POINTS               │ │
│  │ LEADERBOARD      │  │ LEADERBOARD          │ │
│  │ (silver theme)   │  │ (gold theme)         │ │
│  └──────────────────┘  └──────────────────────┘ │
└─────────────────────────────────────────────────┘
```

## Aesthetic Direction

- **Background:** Deep purple radial gradient (`#1a0a2e` → `#2d1057`)
- **Title font:** Bold italic condensed display (e.g. `Barlow Condensed Italic`, `Bebas Neue`) — all caps, large, white with subtle text-shadow
- **Table fonts:** Clean bold sans-serif for team names and values
- **Rank badges:** Rounded square shape; styled per theme
- **Overall feel:** Gaming/esports scoreboard — high contrast, vivid, dramatic

## Themes

### Left — Referrals Leaderboard (Silver)
- Table header bar: silver/light grey gradient
- Header label: `REFERRALS LEADERBOARD` in silver italic caps
- Column header pill: rounded, light grey — label `REFERRALS`
- Rank badge: silver/grey tones; #1 gets a wing/laurel embellishment
- Row background: warm off-white/cream (`#f5f0e8`)
- Row text: dark (`#1a1a1a`)
- Score column: right-aligned, bold

### Right — Points Leaderboard (Gold)
- Table header bar: gold gradient (`#c9a227` → `#f0c040`)
- Header label: `POINTS LEADERBOARD` in gold italic caps
- Column headers: `RANK`, `TEAM`, `POINTS` — subtle, uppercase
- Rank badge: gold/amber tones; #1 gets a wing/laurel embellishment
- Row background: dark (`#1e1a2e` alternating with `#25203a`)
- Row text: white
- Score column: right-aligned, bold gold

## Components

### `Dashboard.jsx`
Root layout. Renders the shared `Header` and the two `LeaderboardTable` components side by side. Calls both `useReferrals()` and `usePoints()` hooks and passes data to respective tables.

### `Header.jsx`
- Event title (e.g. "MANDI CHALLENGE") in large italic display font
- `LiveIndicator` centred below the title
- No per-table headers here — those live inside each table

### `LiveIndicator.jsx`
- Single shared indicator between both tables
- Pulsing green dot + `LIVE` label + `· Updated Xs ago` counter (updates every second)
- Shows a warning if either feed has an error

### `LeaderboardTable.jsx`
Accepts props: `title`, `columnLabel`, `rows`, `theme` (`"silver"` | `"gold"`), `error`, `loading`

- Renders themed header bar with title
- Renders column header row (`RANK`, `TEAM`, `{columnLabel}`)
- Maps rows to `<TeamRow>` components
- Shows shimmer skeleton on first load

### `TeamRow.jsx`
Accepts: `rank`, `name`, `value`, `theme`, `changed`

- Rank badge styled per theme; top 3 get gold/silver/bronze badge treatment
- `#1` badge gets wing/laurel embellishment (CSS or inline SVG)
- Applies `.row-changed` flash animation when `changed === true`
- Alternating row backgrounds on gold theme only

## Columns per Table

| Table | Col 1 | Col 2 | Col 3 |
|---|---|---|---|
| Left (Referrals) | Rank | Team | Referrals |
| Right (Points) | Rank | Team | Points |

## Animations

```css
@keyframes flash-update {
  0%   { background-color: rgba(255, 200, 0, 0.4); }
  100% { background-color: transparent; }
}
.row-changed { animation: flash-update 1.5s ease-out forwards; }

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.5); }
}
.live-dot { animation: pulse 1.5s ease-in-out infinite; }
```

## Loading Skeleton

Each table independently shows shimmer placeholder rows while awaiting its first data. Tables load independently — one may be ready before the other.

## Responsive

- Desktop-first (primary: large display screen)
- Tables stack vertically below `900px` viewport width
- No mobile optimisation required