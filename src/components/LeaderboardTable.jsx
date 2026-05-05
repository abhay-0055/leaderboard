import TeamRow from "./TeamRow";

const SKELETON_COUNT = 10;

function SkeletonRow({ theme }) {
  return (
    <tr className={`skeleton-row skeleton-row--${theme}`}>
      <td><span className="skeleton-cell rank-skel" /></td>
      <td><span className="skeleton-cell name-skel" /></td>
      <td><span className="skeleton-cell value-skel" /></td>
    </tr>
  );
}

export default function LeaderboardTable({ title, columnLabel, rows, theme, error }) {
  const showSkeleton = rows.length === 0 && !error;

  return (
    <div className={`table-wrapper table-wrapper--${theme}`}>
      <div className={`table-header-bar table-header-bar--${theme}`}>
        <span className={`table-title table-title--${theme}`}>{title}</span>
      </div>
      <table className={`leaderboard-table leaderboard-table--${theme}`}>
        <thead>
          <tr>
            <th className="th-rank">Rank</th>
            <th className="th-name">Team</th>
            <th className={`th-value th-value--${theme}`}>{columnLabel}</th>
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan={3} className="error-cell">⚠ {error}</td>
            </tr>
          ) : showSkeleton ? (
            Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <SkeletonRow key={i} theme={theme} />
            ))
          ) : (
            rows.map((row) => (
              <TeamRow key={row.name ?? row.rank} row={row} theme={theme} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
