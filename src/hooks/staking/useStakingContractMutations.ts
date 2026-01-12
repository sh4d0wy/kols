import {useMutation, useQueryClient} from '@tanstack/react-query'
import { useStakingContract } from '@/hooks/useStakingContract'
import { parseUnits } from 'ethers'
import { useConnection } from 'wagmi';

export const useStakingContractMutations = () => {
    const {writeContract:stakingContract} = useStakingContract();
    const queryClient = useQueryClient();
    const connection = useConnection();
    const stakeKols = useMutation({
        mutationFn: async (amount: string) => {
            const amountWei = parseUnits(amount, 18);
            const tx = await stakingContract?.stake(amountWei);
            await tx.wait();
            return tx;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
            queryClient.invalidateQueries({ queryKey: ['walletStats', connection.address] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
    const claimRewards = useMutation({
        mutationFn: async () => {
            const tx = await stakingContract?.claimReward();
            await tx.wait();
            return tx;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
            queryClient.invalidateQueries({ queryKey: ['walletStats', connection.address] });
        },
        onError: (error) => {
            console.error(error);
        },
    });

    const requestUnstake = useMutation({
        mutationFn: async () => {
            const tx = await stakingContract?.requestUnstake();
            await tx.wait();
            return tx;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
            queryClient.invalidateQueries({ queryKey: ['walletStats', connection.address] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
    const withdrawUnstaked = useMutation({
        mutationFn: async () => {
            const tx = await stakingContract?.withdrawUnstaked();
            await tx.wait();
            return tx;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
            queryClient.invalidateQueries({ queryKey: ['walletStats', connection.address] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
    const claimAndUnstake = useMutation({
        mutationFn: async () => {
            const tx = await stakingContract?.claimRewardAndUnstake();
            await tx.wait();
            return tx;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['staking','data'] });
            queryClient.invalidateQueries({ queryKey: ['walletStats', connection.address] });
        },
        onError: (error) => {
            console.error(error);
        },
    });
    return {
        stakeKols,
        claimRewards,
        requestUnstake,
        withdrawUnstaked,
        claimAndUnstake,
    };
}