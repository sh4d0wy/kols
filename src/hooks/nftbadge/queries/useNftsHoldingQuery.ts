import { useQuery } from "@tanstack/react-query";
import { useConnection } from "wagmi";
import { useNftContract } from "@/hooks/useNftContract";
import { useCallback } from "react";
import type { NFTMetadata } from "@/types/NftMarketplace/nfttype";

const metadata = {
    "name": "KOLS Participation Badge",
    "description": "KOLS Participation Badge — Verified participation NFT.",
    "image": "https://testnft.kolstoken.com/1.jpg"
  }
export const useNftsHoldingQuery = () => {
    const {readContract} = useNftContract();
    const connection = useConnection();

    const fetchNftsHolding = useCallback(async (): Promise<NFTMetadata[] | null> => {
            if(!readContract || !connection.address) return null;
        try{
            const nftsMaxIndex = await readContract.balanceOf(connection.address);
            let nfts: NFTMetadata[] = [];
            for(let i = 0; i < nftsMaxIndex; i++){
                const nftId = await readContract.tokenOfOwnerByIndex(connection.address, i);
                nfts.push({
                    id: nftId,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image,
                });
            }
            return nfts;
        }
        catch(error){
            console.log("Error fetching nfts holding", error);
            return null;
        }
    }, [readContract, connection.address]);

    return useQuery({
        queryKey: ['nfts-holding',connection.address],
        queryFn: async () => await fetchNftsHolding(),
        enabled: !!readContract && !!connection.address,
        staleTime: 1000 * 60 * 60 * 24,
    });
}