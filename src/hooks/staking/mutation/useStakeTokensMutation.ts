
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseUnits } from "ethers";
import { useStakingQuery } from '@/hooks/staking/queries/useStakingQuery';
import { useConnection } from "wagmi";
import { useKolsMutation } from "@/hooks/useKolsMutations";
import { useStakingContractMutations } from "@/hooks/staking/useStakingContractMutations";
import { toast } from "react-toastify";
import { useWalletStatsQuery } from "@/hooks/staking/queries/useWalletStatsQuery";

export const useStakeTokensMutation = () => {
    const connection = useConnection();
    const queryClient = useQueryClient();
    const {approveKols} = useKolsMutation();
    const {stakeKols} = useStakingContractMutations();
    const {data: stakingData} = useStakingQuery(connection.address ?? '0x0000000000000000000000000000000000000001');
    const {data: walletStats} = useWalletStatsQuery(connection.address);
    const stakeTokens = useMutation({
        mutationFn: async (amount: string) => {
            try{
                console.log("Starting stake tokens mutation");
                if(!connection.address || !stakingData || !amount) return;
                if(Number(amount) <= 0) {
                    throw new Error('Amount must be greater than 0');
                };
                if(Number(amount) > Number(stakingData?.userKolsBalance ?? 0)) {
                    throw new Error('Amount must be less than user balance');
                }
                if(Number(walletStats?.pendingUnstake) > 0) {
                    throw new Error('Cannot stake while unstaking');
                }
            //fetch allowance
            const allowance = stakingData?.allowanceKOLS ?? 0n;
            //approve if allowance is less than amount
            if(allowance < parseUnits(amount, 18)){
                const tx = await approveKols.mutateAsync(amount);
                await tx.wait();
            }
            //stake if approved
            const tx = await stakeKols.mutateAsync(amount);
            await tx.wait();
            return {
                success: true,
                txHash: tx.hash,
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
        },
        onError: (error) => {
            console.error(error);
            toast.error(error?.message ?? 'Failed to stake tokens');
        },
    });
    return {
        stakeTokens,
    };
}