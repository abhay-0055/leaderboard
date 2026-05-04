# Deployment

## Hosting

Deploy to **Vercel** or **Netlify** (free tier). Both support Vite out of the box.

- Build command: `npm run build`
- Output directory: `dist`

## Environment Variables

Set these in your hosting platform's dashboard (not in the repo):

| Variable | Value |
|---|---|
| `VITE_CSV_URL` | Your OneDrive CSV download URL |
| `VITE_REFRESH_INTERVAL_MS` | `30000` (or adjust as needed) |

## Deployment Checklist

- [ ] OneDrive file sharing set to **"Anyone with the link can view"**
- [ ] CSV URL tested in browser (downloads a `.csv` directly)
- [ ] Column name mapping in `parseCsv.js` matches actual Excel headers exactly
- [ ] Env vars set in hosting platform dashboard
- [ ] Verify no CORS errors in browser console on first deploy

## Known Gotchas

1. **OneDrive cache lag:** OneDrive can take 1–2 minutes to serve an updated CSV after saving the Excel file. A 30s poll interval is fine — you won't get faster than ~60s effective refresh in practice.
2. **Stale browser cache:** Always use `cache: "no-store"` in the fetch call.
3. **Revoked share link:** If the file's public sharing is turned off, the fetch will return an HTML login page instead of CSV. Detect this by checking if the response text starts with `<!DOCTYPE` and show a clear error.
4. **CORS:** OneDrive public download URLs are CORS-friendly. If blocked in a specific environment, proxy through a Vercel Edge Function.
5. **Header case sensitivity:** `"Team Name"` ≠ `"team name"` in Papa Parse. Double-check Excel headers.