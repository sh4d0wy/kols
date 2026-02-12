import { useMutation } from "@tanstack/react-query";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";
import { useConnection } from "wagmi";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { parseUnits } from "viem";
import { useNftContract } from "@/hooks/useNftContract";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "@/utils/nftmarketplacedata";
import useNftMarketPlaceStore from "@/store/nftMarketPlaceStore";

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export const useCreateBundleMutation = () => {
    const {writeContract:writeMarketplaceContract,readContract:readMarketplaceContract} = useNftMarketplaceContract();
    const {writeContract:writeNftContract,readContract:readNftContract} = useNftContract();
    const connection = useConnection();
    const queryClient = useQueryClient();
    const {setMessage} = useNftMarketPlaceStore();
    const createBundle = useCallback(async ({nfts, price}: {nfts: string[], price: number}) => {
        if(!writeMarketplaceContract || !connection.address || !readMarketplaceContract ) return null;
        const priceInWei = parseUnits(price.toString(), 18);
        if(nfts.length<2){
            throw new ValidationError('At least 2 NFTs are required to create a bundle');
        }
        if(price<=0){
            throw new ValidationError('Price must be greater than 0');
        }
        try{
            const isApproved = await readNftContract?.isApprovedForAll(connection.address, NFT_MARKETPLACE_CONTRACT_ADDRESS);
            if(!isApproved){
                setMessage('Approving NFTs... ');
                const approveTx = await writeNftContract?.setApprovalForAll(NFT_MARKETPLACE_CONTRACT_ADDRESS, true);
                await approveTx.wait();
                setMessage('NFTs approved');
            }
            setMessage('Listing bundle... ');
            const tx = await writeMarketplaceContract.listBundle(nfts.map(Number), priceInWei);
            await tx.wait();
            return tx;
        }
        catch(error){
            console.log("Error creating bundle", error);
            throw new ValidationError('Failed to create bundle');
        }
    }, [writeMarketplaceContract, connection.address]);

    return useMutation({
        mutationFn: async ({nfts, price}: {nfts: string[], price: number}) => await createBundle({nfts, price}),
        mutationKey: ['create-bundle'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['active-bundles', connection.address] });
            queryClient.invalidateQueries({ queryKey: ['nfts-holding', connection.address] });
            setMessage('List Bundle For Sale');
            toast.success('Bundle listed successfully');
        },
        onError: (error: Error) => {
            console.log("Error creating bundle", error);
            setMessage('List Bundle For Sale');
            if (error instanceof ValidationError) {
                toast.error(error.message);
            } else {
                toast.error('Failed to create bundle');
            }
        }
    })
}   