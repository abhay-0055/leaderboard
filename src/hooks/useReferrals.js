import { useLeaderboard } from "./useLeaderboard";

export function useReferrals() {
  return useLeaderboard("/api/referrals", "Team", "Points", "Referrals");
}
