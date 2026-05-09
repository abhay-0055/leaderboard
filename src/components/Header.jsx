import LiveIndicator from "./LiveIndicator";

export default function Header({ lastUpdated, error }) {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-title">Mandi Challenge</h1>
      <p className="dashboard-subtitle">REGISTRATIONS LEADERBOARD</p>
      <LiveIndicator lastUpdated={lastUpdated} error={error} />
    </header>
  );
}
