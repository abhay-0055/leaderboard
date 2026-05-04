import TeamRow from "./TeamRow";

const SKELETON_COUNT = 10;

function SkeletonRow() {
  return (
    <tr className="skeleton-row">
      <td><span className="skeleton-cell rank-skel" /></td>
      <td><span className="skeleton-cell name-skel" /></td>
      <td><span className="skeleton-cell score-skel" /></td>
      <td><span className="skeleton-cell extra-skel" /></td>
    </tr>
  );
}

export default function LeaderboardTable({ rows, error }) {
  const showSkeleton = rows.length === 0 && !error;

  return (
    <div className="table-wrapper">
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th className="th-rank">Rank</th>
            <th className="th-name">Team</th>
            <th className="th-score">Referrals</th>
            <th className="th-extra">Points</th>
          </tr>
        </thead>
        <tbody>
          {showSkeleton
            ? Array.from({ length: SKELETON_COUNT }, (_, i) => <SkeletonRow key={i} />)
            : rows.map((row) => <TeamRow key={row.name ?? row.rank} row={row} />)}
        </tbody>
      </table>
    </div>
  );
}
