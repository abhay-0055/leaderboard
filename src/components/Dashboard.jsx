import { useReferrals } from "../hooks/useReferrals";
import { usePoints } from "../hooks/usePoints";
import Header from "./Header";
import LeaderboardTable from "./LeaderboardTable";

export default function Dashboard() {
  const { rows: referralRows, error: referralError, lastUpdated: referralUpdated } = useReferrals();
  const { rows: pointRows, error: pointError, lastUpdated: pointUpdated } = usePoints();

  const lastUpdated = Math.max(referralUpdated || 0, pointUpdated || 0) || null;

  return (
    <div className="dashboard">
      <div className="spotlight spotlight-left" />
      <div className="spotlight spotlight-right" />
      <div className="container">
        <Header
          lastUpdated={lastUpdated}
          referralsError={referralError}
          pointsError={pointError}
        />
        <div className="tables-row">
          <LeaderboardTable
            title="MAYONNAISE"
            columns={[
              { label: "REFERRALS", field: "secondary" },
              { label: "POINTS", field: "value" },
            ]}
            rows={referralRows}
            theme="silver"
            error={referralError}
          />
          <LeaderboardTable
            title="HONEY"
            columns={[
              { label: "ENROLLS", field: "secondary" },
              { label: "POINTS", field: "value" },
            ]}
            rows={pointRows}
            theme="gold"
            error={pointError}
          />
        </div>
      </div>
    </div>
  );
}
