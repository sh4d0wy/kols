import { useQuery } from "@tanstack/react-query";
import { useStakingContract } from "../../useStakingContract";
import { formatUnits } from "viem";

export const useWalletStats = (address: string) => {
    const { readContract } = useStakingContract();
    return useQuery({
        queryKey: ['walletStats', address],
        queryFn: async () => {
            if (!readContract) return null;
            console.log("address", address);
            const stats = {
                activeStaked: formatUnits(await readContract.userActiveStaked(address), 18),
                myShare: formatUnits(await readContract.userUnstaking(address), 18),
                pendingUnstake: formatUnits(await readContract.pendingRewardAfterFee(address), 18),
                unlockTime: (await readContract.isUnstaking(address)),
                withdrawableRewards: formatUnits(await readContract.minStakeAmount(), 18),
                // totalEarnings: (await readContract.totalEarnings(address)),
            }
            console.log("wallet stats", stats);
            return stats;
        },
        enabled: !!readContract && !!address,
    });
}