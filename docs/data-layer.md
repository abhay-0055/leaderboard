# Data Layer

## Source: Google Sheets (Public CSV)

Leaderboard pulls from its own **Google Sheet set to `Anyone with the link`** via a URL. No API key or auth required.

### How to get Google Sheet URL set up with `Anyone with the link`



## Environment Variables



## Column Mapping



## Hooks



## CSV Parser — `parseCsv.js`

- Uses Papa Parse: `{ header: true, skipEmptyLines: true, dynamicTyping: true }`
- Sorts rows descending by `value`
- Assigns `rank` (1-based) after sorting
- Returns array of `{ rank, name, value, changed }`

## Data Flow (per table)

