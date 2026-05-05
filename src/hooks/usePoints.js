import { useLeaderboard } from "./useLeaderboard";

const URL = import.meta.env.VITE_POINTS_CSV_URL;

export function usePoints() {
  return useLeaderboard(URL, "Team Name", "Column 3");
}
