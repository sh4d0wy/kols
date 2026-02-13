import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";

interface FeeDataType {
    fee: number
}
export const useGetFeeQuery = () => {
    const {readContract} = useNftMarketplaceContract();
    const fetchFee = useCallback(async (): Promise<FeeDataType | null> => {
        if(!readContract) return null;
        try{
            const fee = await readContract.feeBps();
            return {
                fee: Number(fee)/100,
            };
        }
        catch(error){
            console.log("Error fetching fee data", error);
            return null;
        }
    }, [readContract]);

    return useQuery({
        queryKey: ['fee-data'],
        queryFn: async () => await fetchFee(),
        enabled: !!readContract,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export default useGetFeeQuery;