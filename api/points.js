export default async function handler(req, res) {
  const upstream = process.env.POINTS_CSV_URL;
  if (!upstream) {
    res.status(500).send("POINTS_CSV_URL is not set");
    return;
  }
  const upstreamRes = await fetch(upstream, { cache: "no-store" });
  const text = await upstreamRes.text();
  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(upstreamRes.status).send(text);
}
