import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useKolsContract } from './useKolsContract';
import { STAKING_CONTRACT_ADDRESS } from '@/utils/stakingcontractdata';
import { parseUnits } from 'ethers';

export const useKolsMutation = () => {
    const {writeContract} = useKolsContract();
    const queryClient = useQueryClient();
    const approveKols = useMutation({
        mutationFn: async (amount: string) => {
            const amountWei = parseUnits(amount, 18);
            const tx = await writeContract?.approve(STAKING_CONTRACT_ADDRESS, amountWei);
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
        approveKols,
    };
}   