# Data Layer

## OneDrive CSV Setup

1. Open your Excel file in OneDrive / Excel Online
2. **Share → Anyone with the link can view → Copy link**
3. Convert the share link to a direct CSV download URL:
   ```
   https://onedrive.live.com/download?resid=<RESID>&authkey=<AUTHKEY>&format=csv
   ```
   Find `resid` and `authkey` in the share/embed dialog, or from the download URL in Excel Online (File → Save As → Download a Copy).
4. Test it: paste the URL in a browser — it should immediately download a `.csv`

## Environment Variables

```env
# .env.example
VITE_CSV_URL=https://onedrive.live.com/download?resid=YOUR_RESID&authkey=YOUR_AUTHKEY&format=csv
VITE_REFRESH_INTERVAL_MS=30000
```

## Polling Hook — `useLeaderboard.js`

- Calls `fetchAndParse(CSV_URL)` immediately on mount, then on every interval
- Compares new rows against previous rows and tags changed scores (`row.changed = true`) for flash animation
- Stops polling when `document.hidden` is true; resumes on tab focus
- Sets `error` state if fetch or parse fails; clears it on next successful load

## CSV Parser — `parseCsv.js`

- Uses Papa Parse with `{ header: true, skipEmptyLines: true, dynamicTyping: true }`
- Sorts rows descending by score column before returning
- Assigns `rank` (1-based) after sorting
- Maps raw Excel column names to internal keys:

| Excel Header | Internal Key |
|---|---|
| `Team` | `name` |
| `Referral` | `score` |
| `Points` | `extra` |

## Data Flow

```
fetch(CSV_URL, { cache: "no-store" })
  → raw CSV text
  → Papa Parse → array of row objects
  → sort by score desc
  → assign rank
  → diff against prev → tag changed rows
  → setRows() → React re-render
```