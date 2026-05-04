import Papa from "papaparse";

const COLUMN_MAP = {
  "Team Name": "name",
  Referral: "score",
  "Column 3": "extra",
};

export async function fetchAndParse(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
  const text = await res.text();
  if (text.trimStart().startsWith("<!")) throw new Error("Got HTML instead of CSV — check sharing permissions or CSV_URL");

  const { data, errors } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  const fatal = errors.filter((e) => e.type !== "FieldMismatch");
  if (fatal.length) throw new Error(`CSV parse error: ${fatal[0].message}`);
  if (!data.length) throw new Error("CSV parse error: no rows returned");

  const mapped = data.map((raw) => {
    const row = {};
    for (const [excelKey, internalKey] of Object.entries(COLUMN_MAP)) {
      row[internalKey] = raw[excelKey] ?? null;
    }
    return row;
  });

  mapped.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  mapped.forEach((row, i) => {
    row.rank = i + 1;
  });

  return mapped;
}
