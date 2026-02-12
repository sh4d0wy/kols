import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useNftContract } from "@/hooks/useNftContract";
import { useConnection } from "wagmi";

interface UserNftBadgeDataType {
    claimableNftBadges: number
    totalParticipation: number
    alreadyMinted: number
}
export const useUserNftDataQuery = () => {
    const {readContract} = useNftContract();
    const connection = useConnection();
    const fetchUserData = useCallback(async (): Promise<UserNftBadgeDataType | null> => {
        if(!readContract || !connection.address) return null;
        try{
            const claimableNftBadges = await readContract.claimable( connection.address );
            const totalParticipation = await readContract.totalParticipation( connection.address );
            const alreadyMinted = await readContract.claimedCount( connection.address );
            return {
                claimableNftBadges: Number(claimableNftBadges),
                totalParticipation: Number(totalParticipation),
                alreadyMinted: Number(alreadyMinted),
            };
        }
        catch(error){
            console.log("Error fetching user data", error);
            return null;
        }
    }, [readContract, connection.address]);

    return useQuery({
        queryKey: ['user-nft-data', connection.address],
        queryFn: async () => await fetchUserData(),
        enabled: !!readContract && !!connection.address,
        staleTime: 1000 * 60 * 60 * 24,
    });
};

export default useUserNftDataQuery;