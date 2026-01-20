import React, { useMemo } from 'react'
import { Card } from '../ui/Card'
import { ProgressBar } from './ProgressBar'
import { useGlobalQuery } from '@/hooks/staking/queries/useGlobalQuery'
import { useWalletStatsQuery } from '@/hooks/staking/queries/useWalletStatsQuery'
import { useConnection } from 'wagmi'


export const StakingProgress: React.FC= () => {
  const connection = useConnection();
  const {data:globalStats} = useGlobalQuery();
  const {data:walletStats} = useWalletStatsQuery(connection.address);

  const poolUtilization = useMemo(() => {
    return Number((Number(globalStats?.totalClaimed??0) / Number(globalStats?.totalRewards??0))*100).toFixed(2);
  }, [globalStats]);
  const yourContribution = useMemo(() => {
    return (Number(walletStats?.myShare??0)).toFixed(2);
  }, [walletStats]);
  const rewardRate = useMemo(() => {
    return (Number(globalStats?.apy??0)).toFixed(2) ;
  }, [globalStats]);
  return (
    <Card className="p-6 h-full">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">Staking Overview</h3>
      
      <div className="space-y-3">
        <ProgressBar
          label="Total Rewards Claimed"
          value={Number(poolUtilization)}
          color="gradient"
        />
        <ProgressBar
          label="Your Stake Contribution"
          value={Number(yourContribution)}
          color="gradient"
        />
        <ProgressBar
          label="Reward Rate"
          value={Number(rewardRate)}
          color="gradient"
        />
      </div>
    </Card>
  )
}

