import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useStakingContract } from '@/hooks/useStakingContract'
import { parseUnits } from 'ethers'

export const useStakingContractMutations = () => {
    const {writeContract:stakingContract} = useStakingContract();
    const queryClient = useQueryClient();
    
    const stakeKols = useMutation({
        mutationFn: async (amount: string) => {
            const amountWei = parseUnits(amount, 18);
            const tx = await stakingContract?.stake(amountWei);
            await tx.wait();
            return tx;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
    
    return {
        stakeKols,
    };
}