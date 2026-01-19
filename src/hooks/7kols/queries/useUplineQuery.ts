import { useQuery } from "@tanstack/react-query";
import { use7KolsContract } from "@/hooks/use7KolsContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import { formatUnits, isAddress } from "viem";

export const useUplineQuery = () => {
    const {readContract} = use7KolsContract();
    const connection = useConnection();
    const userAddress =  connection.address;

    const fetchUpline = useCallback(async (): Promise<string[] | null> => {
        if(!readContract || !userAddress) return null;
        if(!isAddress(userAddress)) {
            console.log("Invalid address", userAddress);
            return null;
        };
        try{
            const upline = await readContract?.getUpline6(userAddress);
            return upline;
        }
        catch(error){
            console.log("Error fetching upline", error);
            return null;
        }
    }, [readContract, userAddress]);

    return useQuery({
        queryKey: ['upline'],
        queryFn: async () => await fetchUpline(),
        enabled: !!readContract && !!userAddress,
        staleTime: 30000,
    });
}