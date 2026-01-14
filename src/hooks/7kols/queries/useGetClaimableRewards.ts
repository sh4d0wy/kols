import { useQuery } from "@tanstack/react-query"
import { use7KolsContract } from "@/hooks/use7KolsContract"
import { useCallback } from "react"
import { useConnection } from "wagmi"
import { formatUnits } from "ethers"
import { ZeroAddress } from "ethers"

export const useGetClaimableRewards = () => {
    const {readContract} = use7KolsContract()
    const connection = useConnection()
    const fetchClaimableRewards = useCallback(async (): Promise<string | null> => {
        if(!readContract || !connection.address || connection.address === ZeroAddress) return null
        try{
            const claimableRewards = await readContract.getPendingReward(connection.address)
            return formatUnits(claimableRewards, 18)
        }
        catch(error){
            console.log("Error fetching claimable rewards", error)
            return null
        }
    }, [readContract])

    return useQuery({
        queryKey: ['claimable-rewards'],
        queryFn: async () => await fetchClaimableRewards(),
        enabled: !!readContract && !!connection.address && connection.address !== ZeroAddress,
    })
}