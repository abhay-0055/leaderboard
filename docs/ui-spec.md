# UI Spec

**Reference image:** `@docs/bar-graph.png`

## Layout

A single bar chart centred on a full-viewport dark background. Above it, a shared header with the event title, a subtitle, and a `LiveIndicator`.

```
┌─────────────────────────────────────────────────────┐
│              MANDI CHALLENGE                        │
│          REGISTRATIONS LEADERBOARD                  │
│               🟢 LIVE · Updated 5s ago             │
│                                                     │
│  35   48   62   75   87   98                       │
│  █    █    █    █    █    █                        │
│  │    │    │    │    │    │                        │
│──────────────────────────────── (floor line)        │
│  T1   T2   T3   T4   T5   T6                       │
└─────────────────────────────────────────────────────┘
```

Bars are sorted **ascending left to right** — shortest on the left, tallest on the right. Team names appear below each bar; scores appear above.

## Aesthetic Direction

- **Background:** Deep purple radial gradient (`#1a0a2e` → `#3b006e`)
- **Title font:** `Barlow Condensed` 800 italic, all caps, white with gold glow text-shadow
- **Bar scores / labels:** `Barlow Condensed` 800, white
- **Overall feel:** Gaming/esports scoreboard — high contrast, vivid, dramatic

## 3D Bar Geometry

Each bar is rendered using three absolutely-positioned `div` elements inside a `position: relative` canvas:

| Face | Element | Technique |
|---|---|---|
| Front | Plain `div` | `linear-gradient` left→right, slight brightness variation |
| Top | `div` with `clip-path` | Parallelogram: `polygon(0 DY, W DY, W+DX 0, DX 0)` |
| Right side | `div` with `clip-path` | Parallelogram: `polygon(0 DY, DX 0, DX barH, 0 barH+DY)` |

Constants: `W = 48px` (bar width), `DX = 14px` (horizontal depth), `DY = 10px` (vertical depth).

Top face is lighter than the front; right side face is darker, giving the illusion of a directed light source from the upper-left.

## Colors

Eight-color palette; color assigned by deterministic hash of team name so a team always gets the same color regardless of rank:

| # | Front gradient | Side | Top |
|---|---|---|---|
| 0 | `#808092` → `#6a6a7c` | `#3c3c50` | `#9898b0` |
| 1 | `#d8b45c` → `#c8a448` | `#8a6e1e` | `#e8c86a` |
| 2 | `#e87272` → `#d85e5e` | `#922c2c` | `#f08888` |
| 3 | `#7c78d8` → `#6866c8` | `#3e3e9c` | `#9090e8` |
| 4 | `#4abac8` → `#38a8b8` | `#1e7888` | `#5ec8d8` |
| 5 | `#4ac888` → `#38b874` | `#1e7050` | `#5ed898` |
| 6 | `#e09050` → `#d07840` | `#9a4818` | `#e8a868` |
| 7 | `#aa50d8` → `#9838c8` | `#601898` | `#c068e8` |

## Components

### `Dashboard.jsx`
Root layout. Calls `useLeaderboard()` and passes `rows`, `error`, and `lastUpdated` to `BarChart`. Renders spotlight decorations and the container.

### `Header.jsx`
- Event title (`MANDI CHALLENGE`) in large italic display font
- Subtitle (`REGISTRATIONS LEADERBOARD`) in small spaced caps
- `LiveIndicator` centered below

### `LiveIndicator.jsx`
- Pulsing green dot + `LIVE` label + `· Updated Xs ago` counter (ticks every second)
- Inline error banner below if fetch fails

### `BarChart.jsx`
Accepts: `rows`, `error`, `lastUpdated`

States:
- **Error** — inline error message
- **Loading** (`rows.length === 0 && !lastUpdated`) — shimmer skeleton of 6 bars at ascending heights
- **Empty** (`rows.length === 0 && lastUpdated`) — "Add teams in the sheet please"
- **Data** — renders bars sorted ascending, triggers grow-in animation once

### `Bar3D` (internal to `BarChart.jsx`)
Renders the three-face 3D bar using inline styles for geometry and CSS classes for animation.

## Animations

```css
/* Bars grow up from the floor on first data load */
.bar-wrap { transform: scaleY(0); transform-origin: bottom; transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
.bar-wrap--ready { transform: scaleY(1); }
/* Each bar delayed 55ms × index for a cascade effect */

/* Flash when a value changes */
@keyframes bar-flash {
  0%   { filter: brightness(2) saturate(1.4); }
  100% { filter: brightness(1) saturate(1); }
}
.bar-3d--flash > div:last-child { animation: bar-flash 1.5s ease-out forwards; }

/* Live dot pulse */
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.5; transform: scale(1.5); }
}
```

## Loading Skeleton

Six shimmer bars at heights `[70, 110, 150, 195, 250, 320]px` (ascending) shown while awaiting first poll response. Each bar is a single shimmer face covering the full canvas. Score and label placeholders shimmer alongside.

## Responsive

- Desktop-first (primary: large display screen)
- Bar gap reduces from `20px` to `10px` below `700px` viewport width
- No further mobile optimisation required
