import { useLeaderboard } from "../hooks/useLeaderboard";
import Header from "./Header";
import BarChart from "./BarChart";

export default function Dashboard() {
  const { rows, error, lastUpdated } = useLeaderboard(
    "/api/registrations",
    "Team",
    "Registrations"
  );

  return (
    <div className="dashboard">
      <div className="spotlight spotlight-left" />
      <div className="spotlight spotlight-right" />
      <div className="container">
        <Header lastUpdated={lastUpdated} error={error} />
        <BarChart rows={rows} error={error} lastUpdated={lastUpdated} />
      </div>
    </div>
  );
}
