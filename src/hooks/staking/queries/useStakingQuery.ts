import { useQuery } from "@tanstack/react-query";
import { useStakingContract } from "@/hooks/useStakingContract";
import { useKolsContract } from "@/hooks/useKolsContract";
import { useCallback } from "react";
import type { StakingInputData } from "@/types/staking/stakingInput";
import { STAKING_CONTRACT_ADDRESS } from "@/utils/stakingcontractdata";
import { formatUnits } from "ethers"; 
import { isAddress } from "viem";

export const useStakingQuery = (address: `0x${string}` | undefined) => {
    const { readContract:stakingContract } = useStakingContract();
    const {readContract:kolsContract} = useKolsContract();
    
    function calculateEstimatedRewards(
        userStake: bigint,
        totalStake: bigint,
        periodReward: bigint
      ): string {
        if (totalStake === 0n || userStake === 0n) return '0.0000';
        const newTotalStake = totalStake + userStake;
        const userShare = (Number(userStake) * 1e18) / Number(newTotalStake);
        const estimatedReward = (Number(periodReward) * userShare) / 1e18;
        return (estimatedReward / 1e18).toFixed(4);
      }
    const fetchStakingData = useCallback(async (): Promise<StakingInputData | null> => {
        if (!stakingContract || !kolsContract || !address) return null;
        if(!isAddress(address)) {
          console.log("Invalid address", address);
          return null;
        };
        console.log("address", address);
        try {
            const [
              userBalanceRaw,
              allowanceRaw,
              minStakeRaw,
              currentStakeRaw,
              totalPoolStakeRaw,
              lastMonthRewardRaw,
              yesterdayRewardRaw,
            ] = await Promise.all([
              kolsContract.balanceOf(address),
              kolsContract.allowance(address, STAKING_CONTRACT_ADDRESS),
              stakingContract.minStakeAmount(),
              stakingContract.userActiveStaked(address),
              stakingContract.totalActiveStaked(),
              stakingContract.lastMonthReward(),
              stakingContract.yesterdayReward(),
            ]);
    
            const userBalance = formatUnits(userBalanceRaw, 18);
            const minStake = formatUnits(minStakeRaw, 18);
            const isApproved = allowanceRaw >= minStakeRaw;
            const currentStake = formatUnits(currentStakeRaw, 18);
            const totalPoolStake = formatUnits(totalPoolStakeRaw, 18);
    
            const estimatedDailyRewards = calculateEstimatedRewards(
              userBalanceRaw,
              totalPoolStakeRaw,
              yesterdayRewardRaw
            );
    
            const estimatedMonthlyRewards = calculateEstimatedRewards(
              userBalanceRaw,
              totalPoolStakeRaw,
              lastMonthRewardRaw
            );
            
            return {
              userKolsBalance:userBalance,
              userKolsBalanceRaw:userBalanceRaw,
              minStakeKOLS:minStake,
              isApproved:isApproved,
              allowanceKOLS: allowanceRaw,
              estimatedDailyRewardsUSDT:estimatedDailyRewards,
              estimatedMonthlyRewardsUSDT:estimatedMonthlyRewards   ,
              currentStakeKOLS:currentStake,
              totalPoolStakeKOLS:totalPoolStake,
            };
          } catch (err) {
            console.error('Error fetching staking data:', err);
            throw err;
          }
        },
        [address, stakingContract, kolsContract]    
    );
    return useQuery({
        queryKey: ['staking','data',address],
        queryFn: async () => await fetchStakingData(),
        staleTime: 1000 * 60 * 30, 
        enabled: !!address && !!stakingContract && !!kolsContract,
    });
}