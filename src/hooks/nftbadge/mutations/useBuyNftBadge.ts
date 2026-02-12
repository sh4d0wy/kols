import { useMutation } from "@tanstack/react-query";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUSDTContract } from "@/hooks/useUSDTContract";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "@/utils/nftmarketplacedata";

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export const useBuyNftBadge = () => {
    const {writeContract:writeMarketplaceContract,readContract:readMarketplaceContract} = useNftMarketplaceContract();
    const {readContract:readUsdtContract,writeContract:writeUsdtContract} = useUSDTContract();
    const connection = useConnection();
    const queryClient = useQueryClient();
    const buyNftBadge = useCallback(async (badgeId: string) => {
        if(!writeMarketplaceContract || !connection.address || !readMarketplaceContract || !readUsdtContract) return null;
            const listingData = await readMarketplaceContract.listings(parseInt(badgeId));
            const allowance = await readUsdtContract.allowance(connection.address, NFT_MARKETPLACE_CONTRACT_ADDRESS);
            const balance = await readUsdtContract.balanceOf(connection.address);
            if(balance < listingData.price){
                throw new ValidationError('Insufficient USDT balance');
            }
            if(allowance < listingData.price){
                const tx = await writeUsdtContract?.approve(NFT_MARKETPLACE_CONTRACT_ADDRESS, listingData.price);
                await tx.wait();
            }
            const tx = await writeMarketplaceContract.buyBadge(parseInt(badgeId));
            await tx.wait();
            return tx;        
    }, [writeMarketplaceContract, connection.address]);

    return useMutation({
        mutationFn: async (badgeId: string) => await buyNftBadge(badgeId),
        mutationKey: ['buy-nft-badge'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['single-listings'] })
            queryClient.invalidateQueries({ queryKey: ['nfts-holding', connection.address] })
            toast.success('NFT badge bought successfully');
        },
        onError: (error: Error) => {
            console.log("Error buying NFT badge", error);
            if (error instanceof ValidationError) {
                toast.error(error.message);
            } else {
                toast.error('Failed to buy NFT badge');
            }
        }
    })
}   