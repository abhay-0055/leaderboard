const MEDAL = ["gold", "silver", "bronze"];

export default function TeamRow({ row, theme, columns }) {
  const { rank, name, changed } = row;
  const medalClass = rank <= 3 ? `rank-badge--${MEDAL[rank - 1]}` : "rank-badge--plain";

  return (
    <tr className={`team-row team-row--${theme} ${changed ? "row-changed" : ""}`}>
      <td className="rank-cell">
        <span className={`rank-badge ${medalClass}${rank === 1 ? " rank-badge--first" : ""}`}>
          {rank}
        </span>
      </td>
      <td className="name-cell">{name ?? "—"}</td>
      {columns.map((col) =>
        col.field === "value" ? (
          <td key={col.field} className={`value-cell value-cell--${theme}`}>
            {row.value ?? "—"}
          </td>
        ) : (
          <td key={col.field} className={`secondary-cell secondary-cell--${theme}`}>
            {row.secondary ?? "—"}
          </td>
        )
      )}
    </tr>
  );
}
