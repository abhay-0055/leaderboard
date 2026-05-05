import { useState, useEffect } from "react";

export default function LiveIndicator({ lastUpdated, referralsError, pointsError }) {
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    if (!lastUpdated) return;
    const tick = () => setSecondsAgo(Math.floor((Date.now() - lastUpdated) / 1000));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lastUpdated]);

  return (
    <div className="live-indicator">
      <div className="live-status">
        <span className="live-dot" />
        <span className="live-label">LIVE</span>
        {lastUpdated && (
          <span className="updated-text">· Updated {secondsAgo}s ago</span>
        )}
      </div>
      {(referralsError || pointsError) && (
        <div className="error-banner">
          {referralsError && <div>⚠ Referrals: {referralsError}</div>}
          {pointsError && <div>⚠ Points: {pointsError}</div>}
        </div>
      )}
    </div>
  );
}
