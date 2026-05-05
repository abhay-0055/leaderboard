# Data Layer

## Source: Google Sheets (Public CSV)

Each leaderboard pulls from its own **publicly published Google Sheet** via a CSV URL. No API key or auth required.

### How to publish a Google Sheet as CSV

1. Open the Google Sheet
2. **File → Share → Publish to web**
3. Select the correct sheet tab, choose **CSV** format, click **Publish**
4. Copy the URL — it looks like:
   ```
   https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={SHEET_NAME}
   ```
5. Test it: paste in a browser — should immediately download a `.csv`

> Do this twice — once for the Referrals sheet, once for the Points sheet.

## Environment Variables

```env
# .env.example
VITE_REFERRALS_CSV_URL=https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:csv&sheet=...
VITE_POINTS_CSV_URL=https://docs.google.com/spreadsheets/d/.../gviz/tq?tqx=out:csv&sheet=...
VITE_REFRESH_INTERVAL_MS=30000
```

## Column Mapping

| Sheet | Excel Header | Internal Key |
|---|---|---|
| Referrals | `Team` | `name` |
| Referrals | `Referrals` | `value` |
| Points | `Team` | `name` |
| Points | `Points` | `value` |

## Hooks

Two separate hooks, identical in structure, differing only in their CSV URL and env var:

- `useReferrals()` — polls `VITE_REFERRALS_CSV_URL`
- `usePoints()` — polls `VITE_POINTS_CSV_URL`

Both hooks:
- Call `fetchAndParse(url)` immediately on mount, then on each interval
- Diff new rows against previous rows; tag changed rows (`row.changed = true`)
- Pause polling when `document.hidden` is true; resume on tab focus
- Expose `{ rows, lastUpdated, error }`

Consider extracting shared logic into a generic `useLeaderboard(csvUrl)` hook that both call with their respective URL.

## CSV Parser — `parseCsv.js`

- Uses Papa Parse: `{ header: true, skipEmptyLines: true, dynamicTyping: true }`
- Sorts rows descending by `value`
- Assigns `rank` (1-based) after sorting
- Returns array of `{ rank, name, value, changed }`

## Data Flow (per table)

```
fetch(CSV_URL, { cache: "no-store" })
  → raw CSV text
  → Papa Parse → row objects
  → sort by value desc → assign rank
  → diff against prev → tag changed rows
  → setRows() → re-render table
```