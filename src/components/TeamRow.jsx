const MEDAL = ["gold", "silver", "bronze"];

export default function TeamRow({ row, theme }) {
  const { rank, name, value, changed } = row;
  const medalClass = rank <= 3 ? `rank-badge--${MEDAL[rank - 1]}` : "rank-badge--plain";

  return (
    <tr className={`team-row team-row--${theme} ${changed ? "row-changed" : ""}`}>
      <td className="rank-cell">
        <span className={`rank-badge ${medalClass}${rank === 1 ? " rank-badge--first" : ""}`}>
          {rank}
        </span>
      </td>
      <td className="name-cell">{name ?? "—"}</td>
      <td className={`value-cell value-cell--${theme}`}>{value ?? "—"}</td>
    </tr>
  );
}
