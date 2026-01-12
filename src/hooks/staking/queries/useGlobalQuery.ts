import { useQuery } from "@tanstack/react-query"
import { useStakingContract } from "../../useStakingContract"
import { formatUnits } from "viem";
import type { GlobalStats } from "../../../types/staking/stakingStats";

export const useGlobalQuery = () => {
    const { readContract } = useStakingContract()
    
    return useQuery({
        queryKey: ['globalStats'],
        queryFn: async () => {
            if (!readContract) return null
            const stats: GlobalStats = {
                stakerCount: (await readContract.totalStakerCount()).toString(),
                activeStaked: formatUnits(await readContract.totalActiveStaked(), 18),
                today: formatUnits(await readContract.todayReward(), 18),
                yesterday: formatUnits(await readContract.yesterdayReward(), 18),
                thisWeek: formatUnits(await readContract.thisWeekReward(), 18),
                lastWeek: formatUnits(await readContract.lastWeekReward(), 18),
                thisMonth: formatUnits(await readContract.thisMonthReward(), 18),
                lastMonth: formatUnits(await readContract.lastMonthReward(), 18),
                totalRewards: formatUnits(await readContract.totalDistributed(), 18),
                contractUsdt: formatUnits(await readContract.contractUsdtBalance(), 18),
                insurancePool: formatUnits(await readContract.insurancePoolBalance(), 18),
                totalClaimed: formatUnits(await readContract.totalUserClaimed(), 18),
                feeToPool: formatUnits((await readContract.totalFeeStats())[0], 18),
                feeToInsurance: formatUnits((await readContract.totalFeeStats())[1], 18),
            }
            console.log("stats", stats);
            return stats
            
        },
        enabled: !!readContract,
    });
};