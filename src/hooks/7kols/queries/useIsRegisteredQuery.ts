import { useQuery } from "@tanstack/react-query";
import { isUserRegistered } from "@/api/userRoutes";
import { useConnection } from "wagmi";
import { useCallback } from "react";

export const useIsRegisteredQuery = () => {
    const connection = useConnection();
    const fetchIsRegistered = useCallback(async (): Promise<boolean> => {
        if(!connection.address) return false;
        console.log("Connection address", connection.address);
        try{
            const response = await isUserRegistered(connection.address);
            console.log("Response", response);
            return true;
        }
        catch(error){
            return false;
        }
    }, [connection.address]);

    return useQuery({
        queryKey: ['is-registered', connection.address],
        queryFn: async () => await fetchIsRegistered(),
        enabled: !!connection.address,
        staleTime: 1000 * 10,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchInterval: 1000 * 60 * 5,
        refetchIntervalInBackground: true,
    });
}