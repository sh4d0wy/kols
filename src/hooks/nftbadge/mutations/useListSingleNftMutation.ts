import { useMutation } from "@tanstack/react-query";
import { useNftMarketplaceContract } from "@/hooks/useNftMarketplaceContract";
import { useConnection } from "wagmi";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { parseUnits } from "viem";
import { useNftContract } from "@/hooks/useNftContract";
import { NFT_MARKETPLACE_CONTRACT_ADDRESS } from "@/utils/nftmarketplacedata";

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export const useListSingleNftMutation = () => {
    const {writeContract:writeMarketplaceContract, readContract:readMarketplaceContract} = useNftMarketplaceContract();
    const {writeContract:writeNftContract, readContract:readNftContract} = useNftContract();
    const connection = useConnection();
    const queryClient = useQueryClient();
    const [message, setMessage] = useState('List NFT For Sale');

    const listSingleNft = useCallback(async ({tokenId, price}: {tokenId: string, price: number}) => {
        if(!writeMarketplaceContract || !connection.address || !readMarketplaceContract) return null;
        
        const priceInWei = parseUnits(price.toString(), 18);
        
        if(!tokenId){
            throw new ValidationError('Please select an NFT to list');
        }
        if(price <= 0){
            throw new ValidationError('Price must be greater than 0');
        }
        
        try {
            const isApproved = await readNftContract?.isApprovedForAll(connection.address, NFT_MARKETPLACE_CONTRACT_ADDRESS);
            if(!isApproved){
                setMessage('Approving NFT...');
                const approveTx = await writeNftContract?.setApprovalForAll(NFT_MARKETPLACE_CONTRACT_ADDRESS, true);
                await approveTx.wait();
                setMessage('NFT approved');
            }
            setMessage('Listing NFT...');
            const tx = await writeMarketplaceContract.listBadge(Number(tokenId), priceInWei);
            await tx.wait();
            return tx;
        } catch(error) {
            console.log("Error listing NFT", error);
            throw new ValidationError('Failed to list NFT');
        }
    }, [writeMarketplaceContract, connection.address, readMarketplaceContract, readNftContract, writeNftContract]);

    const mutation = useMutation({
        mutationFn: async ({tokenId, price}: {tokenId: string, price: number}) => await listSingleNft({tokenId, price}),
        mutationKey: ['list-single-nft'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['single-listings'] });
            queryClient.invalidateQueries({ queryKey: ['nfts-holding', connection.address] });
            setMessage('List NFT For Sale');
            toast.success('NFT listed successfully');
        },
        onError: (error: Error) => {
            console.log("Error listing NFT", error);
            setMessage('List NFT For Sale');
            if (error instanceof ValidationError) {
                toast.error(error.message);
            } else {
                toast.error('Failed to list NFT');
            }
        }
    });

    return { ...mutation, message };
}

