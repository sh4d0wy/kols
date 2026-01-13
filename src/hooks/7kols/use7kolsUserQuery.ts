import { useQuery } from "@tanstack/react-query";
import { use7KolsContract } from "../use7KolsContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import { isAddress } from "viem";
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
                totalDeposited: user[1],
                totalEarned: user[2],
                totalWithdrawn: user[3],
                pendingReward: user[4],
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