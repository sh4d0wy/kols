import { useMutation } from "@tanstack/react-query";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useUSDTContract } from "@/hooks/useUSDTContract";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "@/utils/nftmarketplacedata";
import useNftMarketPlaceStore from "@/store/nftMarketPlaceStore";

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export const useBuyBundleMutation = () => {
    const {writeContract:writeMarketplaceContract,readContract:readMarketplaceContract} = useNftMarketplaceContract();
    const {readContract:readUsdtContract,writeContract:writeUsdtContract} = useUSDTContract();
    const connection = useConnection();
    const queryClient = useQueryClient();
    const {setBuyBundleMessage} = useNftMarketPlaceStore();
    const buyBundle = useCallback(async (bundleId: string) => {
        if(!writeMarketplaceContract || !connection.address || !readMarketplaceContract || !readUsdtContract) return null;
            const listingData = await readMarketplaceContract.bundles(parseInt(bundleId));
            const allowance = await readUsdtContract.allowance(connection.address, NFT_MARKETPLACE_CONTRACT_ADDRESS);
            const balance = await readUsdtContract.balanceOf(connection.address);
            if(balance < listingData.price){
                throw new ValidationError('Insufficient USDT balance');
            }
            if(allowance < listingData.price){
                setBuyBundleMessage('Approving USDT... ');
                const tx = await writeUsdtContract?.approve(NFT_MARKETPLACE_CONTRACT_ADDRESS, listingData.price);
                await tx.wait();
            }
            setBuyBundleMessage('Buying Bundle... ');
            const tx = await writeMarketplaceContract.buyBundle(parseInt(bundleId));
            await tx.wait();
            return tx;        
    }, [writeMarketplaceContract, connection.address]);

    return useMutation({
        mutationFn: async (bundleId: string) => await buyBundle(bundleId),
        mutationKey: ['buy-bundle'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['active-bundles', connection.address] })
            queryClient.invalidateQueries({ queryKey: ['nfts-holding', connection.address] })
            setBuyBundleMessage('Buy');
            toast.success('Bundle bought successfully');
        },
        onError: (error: Error) => {
            console.log("Error buying Bundle", error);
            setBuyBundleMessage('Buy');
            if (error instanceof ValidationError) {
                toast.error(error.message);
            } else {
                toast.error('Failed to buy Bundle');
            }
        }
    })
}   