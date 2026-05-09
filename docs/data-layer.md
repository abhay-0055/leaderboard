# Data Layer

## Source: Google Sheets (Public CSV)

The leaderboard pulls from a **publicly shared Google Sheet** via a CSV export URL. No API key or auth required.

### How to publish a Google Sheet as CSV

1. Open the Google Sheet
2. **File → Share → Share with others → Anyone with the link → Viewer**
3. Copy the export URL in this format:
   ```
   https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=<GID>
   ```
   - `SHEET_ID` is in the browser URL between `/d/` and `/edit`
   - `gid=0` is the first tab; find others after `#gid=` in the URL bar
4. Paste it into `.env` as `REGISTRATIONS_CSV_URL`
5. Test: curl the URL — should return raw CSV text, not HTML

## Environment Variables

```env
# .env (never committed — server-side only, not exposed to the client bundle)
REGISTRATIONS_CSV_URL=https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?format=csv&gid=0

# .env (client-side — controls poll interval)
VITE_REFRESH_INTERVAL_MS=30000
```

`REGISTRATIONS_CSV_URL` has no `VITE_` prefix on purpose. It is read by the Vite dev proxy and the Vercel edge function, never bundled into client JS.

## Column Mapping

| Sheet header | Internal key | Notes |
|---|---|---|
| `Team` | `name` | Case-sensitive; rows with a null Team are dropped |
| `Registrations` | `value` | Parsed as a number via Papa Parse `dynamicTyping` |

## Hook — `useLeaderboard.js`

Single generic hook called from `Dashboard.jsx`:

```js
useLeaderboard("/api/registrations", "Team", "Registrations")
```

Behaviour:
- Calls `fetchAndParse()` immediately on mount, then every `VITE_REFRESH_INTERVAL_MS` ms
- Diffs incoming rows against previous rows; sets `row.changed = true` when a value shifts
- Pauses the interval when `document.hidden` is true; resumes (with an immediate poll) on tab focus
- Exposes `{ rows, error, lastUpdated }`

## CSV Parser — `parseCsv.js`

- Uses Papa Parse: `{ header: true, skipEmptyLines: true, dynamicTyping: true }`
- Throws on non-200 responses or HTML responses (indicates wrong sharing settings)
- Returns `[]` if the sheet has no data rows (caller handles empty state)
- Sorts rows descending by `value`
- Assigns `rank` (1-based) after sorting
- Returns array of `{ rank, name, value }` (hook adds `changed` on top)

## Data Flow

```
fetch("/api/registrations", { cache: "no-store" })
  ↓  Vite proxy (dev) or Vercel edge function (prod)
fetch(REGISTRATIONS_CSV_URL, { cache: "no-store" })
  → raw CSV text
  → Papa Parse → row objects
  → filter null names
  → sort by value desc → assign rank
  → diff against prev → tag changed rows
  → setRows() → re-render BarChart
```

## Dev Proxy

`vite.config.js` reads `REGISTRATIONS_CSV_URL` at startup and sets up a proxy:

```
GET /api/registrations  →  {REGISTRATIONS_CSV_URL}
```

This means the client code only ever fetches `/api/registrations`, identical in dev and prod.

## Vercel Edge Function

`api/registrations.js` is a Vercel serverless function that does the same proxy in production. It reads `REGISTRATIONS_CSV_URL` from Vercel environment variables and forwards the response with `Cache-Control: no-store`.
