# Deployment

## Hosting

Deploy to **Vercel** or **Netlify** (free tier). Both support Vite out of the box.

- Build command: `npm run build`
- Output directory: `dist`

## Environment Variables

Set these in your hosting platform's dashboard (never in the repo):

| Variable | Value |
|---|---|
| `VITE_REFERRALS_CSV_URL` | Published CSV URL for the Referrals Google Sheet |
| `VITE_POINTS_CSV_URL` | Published CSV URL for the Points Google Sheet |
| `VITE_REFRESH_INTERVAL_MS` | `30000` (adjust as needed) |

## Deployment Checklist

- [ ] Both Google Sheets published via **File → Share → Publish to web → CSV**
- [ ] Both CSV URLs tested in browser (each downloads a `.csv` directly)
- [ ] Column name mappings in `parseCsv.js` match actual sheet headers exactly
- [ ] All three env vars set in hosting platform dashboard
- [ ] `npm run build` completes without errors
- [ ] `dist/` confirmed in `.gitignore`
- [ ] No CORS errors in browser console on first deploy

## Known Gotchas

1. **Google Sheets publish lag:** Changes to the sheet may take 1–2 minutes to reflect in the published CSV. A 30s poll interval is fine.
2. **Stale browser cache:** Always use `cache: "no-store"` in fetch calls.
3. **Sheet unpublished:** If publishing is revoked, the fetch returns an HTML page. Detect by checking if response text starts with `<!DOCTYPE` and surface a clear error in the UI.
4. **CORS:** Google Sheets published CSV URLs are CORS-friendly for browser `fetch()`. No proxy needed.
5. **Header case sensitivity:** Papa Parse uses exact header strings. Match them character-for-character with the sheet.
6. **Two independent feeds:** Each table loads and errors independently. A failure in one should not affect the other.