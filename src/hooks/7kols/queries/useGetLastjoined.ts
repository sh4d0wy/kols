import { useQuery } from "@tanstack/react-query"
import { use7KolsContract } from "@/hooks/use7KolsContract"
import { useCallback } from "react"

export const useGetLastjoined = () => {
    const {readContract} = use7KolsContract()
    const fetchLastjoined = useCallback(async (): Promise<string | null> => {
        if(!readContract) return null
        try{
            const lastjoined = await readContract.getLastJoinedUser()
            return lastjoined
        }
        catch(error){
            console.log("Error fetching lastjoined", error)
            return null
        }
    }, [readContract])

    return useQuery({
        queryKey: ['lastjoined'],
        queryFn: async () => await fetchLastjoined(),
        enabled: !!readContract,
        staleTime: 1000 * 60 * 60,
    })
}