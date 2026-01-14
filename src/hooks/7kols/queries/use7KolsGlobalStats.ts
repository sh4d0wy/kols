import { useQuery } from "@tanstack/react-query";
import { use7KolsContract } from "@/hooks/use7KolsContract";
import { useCallback } from "react";
import { formatUnits } from "viem";
import type { SevenKolsGlobalDataType } from "@/types/7kols/globalDataType";

export const use7KolsGlobalStats = () => {
    const {readContract} = use7KolsContract();
    const fetch7KolsGlobalStats = useCallback(async (): Promise<SevenKolsGlobalDataType | null> => {
        if(!readContract) return null;
        try{
            const totalUsers = await readContract.getTotalUsers();
            const totalDeposited = await readContract.getTotalDeposited();
            const totalSentToTreasury = await readContract.getTotalSentToTreasury();
            const totalFeeAmount = await readContract.getTotalFeeAmount();
            const lastJoinedUser = await readContract.getLastJoinedUser();
            
            // Check for undefined/null but allow 0 as valid value
            if(totalUsers === undefined || totalDeposited === undefined || 
               totalSentToTreasury === undefined || totalFeeAmount === undefined || 
               lastJoinedUser === undefined) return null;
            
            const globalData = {
                totalUsers: Number(totalUsers),
                totalDeposited: formatUnits(totalDeposited, 18),
                totalSentToTreasury: formatUnits(totalSentToTreasury, 18),
                totalFeeAmount: formatUnits(totalFeeAmount, 18),
                lastJoinedUser: (lastJoinedUser as `0x${string}`),
            };
            return globalData;
        }
        catch(error){
            console.log("Error fetching 7kols global stats", error);
            return null;
        }
    }, [readContract]);

    return useQuery({
        queryKey: ['7kols-global-stats'],
        queryFn: async () => await fetch7KolsGlobalStats(),
        enabled: !!readContract,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export default use7KolsGlobalStats;