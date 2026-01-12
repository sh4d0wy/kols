import {useQuery} from "@tanstack/react-query";
import { formatUnits } from "ethers/utils";
import { useCallback } from "react";
import type { FeeStats } from "@/types/staking/feeStats";
import { useUSDTContract } from "@/hooks/useUSDTContract";
import { useStakingContract } from "@/hooks/useStakingContract";
import { STAKING_CONTRACT_ADDRESS } from "@/utils/stakingcontractdata";

export const useFeeQuery = () => {
    const { readContract: usdtContract } = useUSDTContract();
    const { readContract: stakingContract } = useStakingContract();
    const fetchFeeStats = useCallback(async (): Promise<FeeStats | null> => {
        if (!usdtContract || !stakingContract) return null;
        try{
            const [feeToPool, feeToInsurance, _] = await stakingContract.totalFeeStats();
            const contractUsdtBalance = await usdtContract.balanceOf(STAKING_CONTRACT_ADDRESS);
            const totalUserNetWithdrawals = await stakingContract.totalUserClaimed();
            const stats: FeeStats = {
                contractUsdtBalance: formatUnits(contractUsdtBalance, 18),
                totalUserNetWithdrawals: formatUnits(totalUserNetWithdrawals, 18),
                redistributionFee: formatUnits(feeToPool, 18),
                insuranceFee: formatUnits(feeToInsurance, 18),
            }
            console.log("fee stats", stats);
            return stats;
        }
        catch(error){
            console.log("Error fetching fee stats", error);
            return null;
        }
    }, [usdtContract, stakingContract]);
    return useQuery({
        queryKey: ['feeStats'],
        queryFn: async () => await fetchFeeStats(),
        staleTime: 1000 * 60 * 60 * 24, 
        enabled: !!usdtContract && !!stakingContract,
    });
}