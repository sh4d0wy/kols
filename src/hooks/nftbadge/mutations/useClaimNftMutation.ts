import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useConnection } from "wagmi"
import { useNftContract } from "@/hooks/useNftContract"

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'ValidationError'
    }
}

export const useClaimNftMutation = () => {
    const {writeContract:nftContract} = useNftContract()
    const connection = useConnection()
    const queryClient = useQueryClient()
    const claimNftMutation = useMutation({
        mutationFn: async () => {
            if(!nftContract) throw new ValidationError('NFT contract not found');
            const tx = await nftContract.claimBadge();
            await tx.wait();
        },
        mutationKey: ['claim-nft'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['nfts-holding', connection.address] });
            queryClient.invalidateQueries({ queryKey: ['user-nft-data', connection.address] });
            toast.success('NFT claimed successfully')
        },
        onError: (error: Error) => {
            console.log("Error claiming NFT", error)
            if (error instanceof ValidationError) {
                toast.error(error.message)
            } else {
                toast.error('Failed to claim NFT')
            }
        }
    })
    return {
        claimNftMutation,
    }
}