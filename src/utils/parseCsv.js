import Papa from "papaparse";

export async function fetchAndParse(url, nameCol, valueCol, secondaryCol = null) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`CSV fetch failed: ${res.status}`);
  const text = await res.text();
  if (text.trimStart().startsWith("<!DOCTYPE"))
    throw new Error("Got HTML instead of CSV — check sharing settings");

  const { data, errors } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });

  const fatal = errors.filter((e) => e.type !== "FieldMismatch");
  if (fatal.length) throw new Error(`CSV parse error: ${fatal[0].message}`);
  if (!data.length) throw new Error("CSV parse error: no rows returned");

  const mapped = data
    .map((raw) => ({
      name: raw[nameCol] ?? null,
      value: raw[valueCol] ?? null,
      ...(secondaryCol != null ? { secondary: raw[secondaryCol] ?? null } : {}),
    }))
    .filter((r) => r.name != null);

  mapped.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));
  mapped.forEach((row, i) => { row.rank = i + 1; });

  return mapped;
}
