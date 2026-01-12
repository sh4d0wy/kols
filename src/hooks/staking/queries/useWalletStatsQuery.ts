import { useQuery } from "@tanstack/react-query";
import { useStakingContract } from "@/hooks/useStakingContract";
import { formatUnits } from "ethers/utils";
import { useCallback } from "react";
import type { WalletStats } from "@/types/staking/stakingStats";
import { isAddress } from "ethers/address";

export const useWalletStatsQuery = (address: `0x${string}` | undefined) => {
    const { readContract } = useStakingContract();
    const fetchWalletStats = useCallback(async (): Promise<WalletStats | null> => {
        if (!readContract) return null;
        if(!isAddress(address)) {
          console.log("Invalid address", address);
          return null;
        };
        try{

        const [
            activeStakeRaw,
            totalStakedRaw,
            withdrawableRewardsRaw,
            totalEarningsRaw,
            unstakingData,
            isUnstakingStatus,
          ] = await Promise.all([
            readContract.userActiveStaked(address),
            readContract.totalActiveStaked(),
            readContract.pendingRewardAfterFee(address),
            readContract.pendingReward(address),
            readContract.userUnstaking(address),
            readContract.isUnstaking(address),
          ]);
          const activeStake = formatUnits(activeStakeRaw, 18);
          const totalStake = formatUnits(totalStakedRaw, 18);
          const myShare = Number(totalStake) >0?(((Number(activeStake)/Number(totalStake))*100).toFixed(2)):'0.00';
          const pendingUnstake = formatUnits(unstakingData[0], 18);
          const withdrawableRewards = formatUnits(withdrawableRewardsRaw, 18);
          const totalEarnings = formatUnits(totalEarningsRaw, 18);
          const unlockTime = Number(unstakingData[1]);
          const stats: WalletStats = {
            activeStake,
            activeStakeRaw,
            myShare,
            pendingUnstake,
            withdrawableRewards,
            totalEarnings,
            unlockTime,
            isUnstaking:isUnstakingStatus,
            isActive:activeStakeRaw > 0n,
          }
          console.log("wallet stats", stats);
          return stats;
        }
        catch(error){
          console.log("Error fetching wallet stats", error);
          return null;
        }
    }, [readContract, address]);


    return useQuery({
        queryKey: ['walletStats', address],
        queryFn: async (): Promise<WalletStats | null> => await fetchWalletStats(),
        staleTime: 1000 * 60 * 30, 
        enabled: !!readContract && !!address,
    });
}
