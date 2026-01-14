import { useQuery } from "@tanstack/react-query";
import { use7KolsContract } from "@/hooks/use7KolsContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import { formatUnits, isAddress } from "viem";
import type { UserDataType } from "@/types/7kols/userDataType";

export const use7KolsUserQuery = () => {
    const {readContract} = use7KolsContract();
    const connection = useConnection();

    const fetch7KolsUser = useCallback(async (): Promise<UserDataType | null> => {
        if(!readContract || !connection.address) return null;
        if(!isAddress(connection.address)) {
            console.log("Invalid address", connection.address);
            return null;
        };
        try{
            const user = await readContract?.users(connection.address);
            const userData = {
                referrer: user[0],
                totalDeposited: formatUnits(user[1], 18),
                totalEarned: formatUnits(user[2], 18),
                totalWithdrawn: formatUnits(user[3], 18),
                pendingReward: formatUnits(user[4], 18),
                downlineCount: user[5],
                registered: user[6],
            };
            return userData;
        }
        catch(error){
            console.log("Error fetching 7kols user", error);
            return null;
        }
    }, [readContract, connection.address]);

    return useQuery({
        queryKey: ['7kols-user'],
        queryFn: async () => await fetch7KolsUser(),
        enabled: !!readContract && !!connection.address,
    });
};

export default use7KolsUserQuery;