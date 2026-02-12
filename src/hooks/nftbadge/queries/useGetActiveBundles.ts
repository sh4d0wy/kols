import { useQuery } from "@tanstack/react-query";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import type { NFTBundle } from "@/types/NftMarketplace/nfttype";
import { useNftContract } from "@/hooks/useNftContract";

export const useGetActiveBundles = () => {
    const {readContract:readMarketplaceContract} = useNftMarketplaceContract();
    const {readContract:readNftContract} = useNftContract();
    const connection = useConnection();

    const getActiveBundles = useCallback(async () => {
        if(!readMarketplaceContract || !readNftContract || !connection.address) return null;
        try{
            const nextBundleId = await readMarketplaceContract.nextBundleId ();
            let bundles: NFTBundle[] = [];
            for(let i = 1; i < nextBundleId; i++){
                const bundle = await readMarketplaceContract.bundles(i);
                if(bundle.active){
                    bundles.push({
                        id: i.toString(),
                        seller: bundle.seller,
                        price: bundle.price,
                        active: bundle.active,
                    });
                }
            }
            return bundles;
        }
        catch(error){
            console.log("Error fetching active bundles", error);
            return null;
        }
    }, [readMarketplaceContract, readNftContract, connection.address]);

    return useQuery({
        queryKey: ['active-bundles', connection.address],
        queryFn: async () => await getActiveBundles(),
        enabled: !!readMarketplaceContract && !!readNftContract && !!connection.address,
        staleTime: 1000 * 60 * 60 * 24,
    });
}