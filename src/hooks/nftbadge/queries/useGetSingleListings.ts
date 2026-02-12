import { useQuery } from "@tanstack/react-query";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import type { NFTListing } from "@/types/NftMarketplace/nfttype";
import { useNftContract } from "@/hooks/useNftContract";

export const useGetSingleListings = () => {
    const {readContract:readMarketplaceContract} = useNftMarketplaceContract();
    const {readContract:readNftContract} = useNftContract();
    const connection = useConnection();

    const getSingleListings = useCallback(async () => {
        if(!readMarketplaceContract || !readNftContract || !connection.address) return null;
        try{
            const nextId = await readNftContract.nextTokenId();
            let listings: NFTListing[] = [];
            for(let i = 1; i < nextId; i++){
                const listing = await readMarketplaceContract.listings(i);
                console.log("listing", listing);
                listings.push({
                    id: i.toString(),
                    seller: listing.seller,
                    price: listing.price,
                    active: listing.active,
                });
            }
            return listings;
        }
        catch(error){
            console.log("Error fetching single listings", error);
            return null;
        }
    }, [readMarketplaceContract, readNftContract, connection.address]);

    return useQuery({
        queryKey: ['single-listings', connection.address],
        queryFn: async () => await getSingleListings(),
        enabled: !!readMarketplaceContract && !!readNftContract && !!connection.address,
        staleTime: 1000 * 60 * 60 * 24,
    });
}