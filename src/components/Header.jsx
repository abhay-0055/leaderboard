import LiveIndicator from "./LiveIndicator";

export default function Header({ lastUpdated, referralsError, pointsError }) {
  return (
    <header className="dashboard-header">
      <h1 className="dashboard-title">Mandi Challenge</h1>
      <LiveIndicator
        lastUpdated={lastUpdated}
        referralsError={referralsError}
        pointsError={pointsError}
      />
    </header>
  );
}
