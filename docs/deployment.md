# Deployment

## Hosting

Deploy to **Vercel** or **Netlify** (free tier). Both support Vite out of the box.

- Build command: `npm run build`
- Output directory: `dist`

## How the proxy works

The browser always fetches `/api/csv` (same origin — no CORS). The server forwards to OneDrive:

- **Dev:** Vite dev server proxy (configured in `vite.config.js`) rewrites `/api/csv` to the full OneDrive URL.
- **Prod (Vercel):** `api/csv.js` is a serverless function that reads `process.env.CSV_URL` and proxies the request.

## Environment Variables

Set these in your hosting platform's dashboard (not in the repo):

| Variable | Where used | Value |
|---|---|---|
| `CSV_URL` | Vite proxy (dev) + Vercel function (prod) | Your OneDrive CSV download URL |
| `VITE_REFRESH_INTERVAL_MS` | Client bundle | `30000` (ms between polls) |

`CSV_URL` has no `VITE_` prefix — it is never bundled into client-side code.

## Vercel deployment

1. Connect the repo to Vercel.
2. Set `CSV_URL` in **Project Settings → Environment Variables**.
3. Set `VITE_REFRESH_INTERVAL_MS` there too (or keep the 30 s default by omitting it).
4. Deploy. Vercel auto-detects Vite and serves `api/csv.js` as a serverless function.

## Netlify deployment

Netlify Functions use a different runtime. To adapt `api/csv.js`:

1. Create `netlify/functions/csv.js`:
   ```js
   exports.handler = async () => {
     const res = await fetch(process.env.CSV_URL, { cache: "no-store" });
     const body = await res.text();
     return { statusCode: res.status, headers: { "Content-Type": "text/csv" }, body };
   };
   ```
2. Change the client fetch path to `/.netlify/functions/csv` (or set up a `netlify.toml` redirect from `/api/csv`).

## Deployment Checklist

- [ ] OneDrive file sharing set to **"Anyone with the link can view"**
- [ ] CSV URL tested in browser (downloads a `.csv` directly)
- [ ] Column name mapping in `parseCsv.js` matches actual Excel headers exactly
- [ ] `CSV_URL` set in hosting platform dashboard (not `VITE_CSV_URL`)
- [ ] Verify `/api/csv` returns CSV in browser (no CORS errors)

## Known Gotchas

1. **OneDrive cache lag:** OneDrive can take 1–2 minutes to serve an updated CSV after saving the Excel file. A 30 s poll interval is fine — you won't get faster than ~60 s effective refresh in practice.
2. **Stale browser cache:** Always use `cache: "no-store"` in the fetch call.
3. **Revoked share link:** If the file's public sharing is turned off, the fetch returns an HTML login page. `parseCsv.js` detects this (`text.startsWith("<!") `) and throws a clear error.
4. **Header case sensitivity:** `"Team Name"` ≠ `"team name"` in Papa Parse. Double-check Excel headers.
