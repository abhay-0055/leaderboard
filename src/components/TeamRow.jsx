const RANK_BADGE = {
  1: "rank-gold",
  2: "rank-silver",
  3: "rank-bronze",
};

const RANK_ROW = {
  1: "row-top rank-1-row",
  2: "row-top rank-2-row",
  3: "row-top rank-3-row",
};

export default function TeamRow({ row }) {
  const badgeClass = RANK_BADGE[row.rank] ?? "rank-plain";
  const rowExtra   = RANK_ROW[row.rank]  ?? "";

  return (
    <tr className={`team-row ${rowExtra} ${row.changed ? "row-changed" : ""}`}>
      <td className="rank-cell">
        <span className={`rank-badge ${badgeClass}`}>{row.rank}</span>
      </td>
      <td className="name-cell">{row.name ?? "—"}</td>
      <td className="score-cell">{row.score ?? "—"}</td>
      <td className="extra-cell">{row.extra ?? "—"}</td>
    </tr>
  );
}
