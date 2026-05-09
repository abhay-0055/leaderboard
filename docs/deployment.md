# Deployment

## Hosting

Deploy to **Vercel** (recommended) or **Netlify**. Both support Vite out of the box.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18+ |

## Environment Variables

Set these in the hosting platform's dashboard — never commit them to the repo:

| Variable | Required | Notes |
|---|---|---|
| `REGISTRATIONS_CSV_URL` | Yes | Full Google Sheets CSV export URL |
| `VITE_REFRESH_INTERVAL_MS` | No | Poll interval in ms; defaults to `30000` |

`REGISTRATIONS_CSV_URL` has no `VITE_` prefix — it is only read server-side by `api/registrations.js`. Do not prefix it with `VITE_` or it will be bundled into the client JS.

## Vercel — Step by Step

1. Push the repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com) — framework preset auto-detects Vite
3. In **Settings → Environment Variables**, add `REGISTRATIONS_CSV_URL`
4. Deploy — Vercel picks up `api/registrations.js` automatically as a serverless function

## Netlify — Step by Step

1. Push the repo to GitHub
2. Import the repo in [app.netlify.com](https://app.netlify.com) — build settings auto-detect Vite
3. In **Site configuration → Environment variables**, add `REGISTRATIONS_CSV_URL`
4. Add a `netlify.toml` redirect to proxy `/api/registrations` to the sheet URL, or convert `api/registrations.js` to a Netlify function under `netlify/functions/`

Vercel is simpler because it natively handles the `api/` directory pattern.

## Deployment Checklist

- [ ] Google Sheet is shared as "Anyone with the link (Viewer)"
- [ ] Sheet has `Team` and `Registrations` column headers (case-sensitive)
- [ ] `REGISTRATIONS_CSV_URL` is set in the hosting platform (not in the repo)
- [ ] Curl the CSV URL directly — should return CSV text, not an HTML login page
- [ ] First deploy loads the bar chart and "Updated Xs ago" counter ticks

## Known Gotchas

**Got HTML instead of CSV** — The sheet is not shared publicly. Go to File → Share → Share with others → change to "Anyone with the link (Viewer)".

**`REGISTRATIONS_CSV_URL is not set` error** — The env var was not added to the hosting platform, or was prefixed with `VITE_` accidentally.

**Bars all the same height** — The `Registrations` column header in the sheet doesn't exactly match (check for trailing spaces, different capitalisation).

**Stale data** — Google Sheets CSV export can be cached by Google's CDN. The `cache: "no-store"` fetch option and the `Cache-Control: no-store` header on the edge function minimize this, but a few seconds of lag is normal.
