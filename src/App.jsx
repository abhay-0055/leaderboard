import { useLeaderboard } from "./hooks/useLeaderboard";

export default function App() {
  const { rows, error } = useLeaderboard();
  console.log(rows);
  if (error) return <div>Error: {error}</div>;
  return <div>Leaderboard Dashboard — {rows.length} rows loaded (check console)</div>;
}
