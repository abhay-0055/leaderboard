import { useLeaderboard } from "../hooks/useLeaderboard";
import LeaderboardTable from "./LeaderboardTable";
import LiveIndicator from "./LiveIndicator";

export default function Dashboard() {
  const { rows, error, lastUpdated } = useLeaderboard();

  return (
    <div className="dashboard">
      <div className="spotlight spotlight-left" />
      <div className="spotlight spotlight-right" />
      <div className="container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">League Table</h1>
          <LiveIndicator lastUpdated={lastUpdated} error={error} />
        </header>
        <LeaderboardTable rows={rows} error={error} />
      </div>
    </div>
  );
}
