import { useLeaderboard } from "./useLeaderboard";

const URL = import.meta.env.VITE_REFERRALS_CSV_URL;

export function useReferrals() {
  return useLeaderboard(URL, "Team Name", "Referral");
}
