import { useLeaderboard } from "./useLeaderboard";

export function usePoints() {
  return useLeaderboard("/api/points", "Team", "Points");
}
