import { useQuery } from "@tanstack/react-query";
import { use7KolsContract } from "../use7KolsContract";
import { useCallback } from "react";
import type { AddressInfoType } from "@/types/7kols/globalDataType";

export const useGetAddressQuery = () => {
    const {readContract} = use7KolsContract();
    const fetchAddress = useCallback(async (): Promise<AddressInfoType | null> => {
        if(!readContract) return null;
        try{
        const usdtToken = await readContract.usdtToken();
        const treasuryWallet = await readContract.treasuryWallet();
        const feeWallet = await readContract.feeWallet();
        const addressInfo = {
            usdtToken: usdtToken as `0x${string}`,
            treasuryWallet: treasuryWallet as `0x${string}`,
            feeWallet: feeWallet as `0x${string}`,
        };
        return addressInfo;
        }
        catch(error){
            console.log("Error fetching address", error);
            return null;
        }
    }, [readContract]);

    return useQuery({
        queryKey: ['address'],
        queryFn: async () => await fetchAddress(),
        enabled: !!readContract,
    });
}