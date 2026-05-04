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

  const { data, errors } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  if (errors.length) throw new Error(`CSV parse error: ${errors[0].message}`);

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
