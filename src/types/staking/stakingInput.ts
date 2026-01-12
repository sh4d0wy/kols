export interface StakingInputData{
  userKolsBalance: string; // User's KOLS balance
  userKolsBalanceRaw: bigint;
  minStakeKOLS: string;
  isApproved: boolean;
  allowanceKOLS: bigint;
  estimatedDailyRewardsUSDT: string;
  estimatedMonthlyRewardsUSDT: string;
  currentStakeKOLS: string;
  totalPoolStakeKOLS: string;
}