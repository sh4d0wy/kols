import React, { useMemo } from 'react'
import { Card } from '../ui/Card'
import { StatRow } from '../ui/StatRow'
import { useGlobalQuery } from '@/hooks/staking/queries/useGlobalQuery'



export const NetworkStats: React.FC = () => {
  const {data:globalStats} = useGlobalQuery();
  const totalStakedValue = useMemo(() => {
    return (Number(globalStats?.activeStaked??0)).toFixed(2) + ' KOLS';
  }, [globalStats]);
  const averageStake = useMemo(() => {
    return (Number(globalStats?.activeStaked??0) / Number(globalStats?.stakerCount??0)).toFixed(2) + ' KOLS';
  }, [globalStats]);
  const networkFee = useMemo(() => {
    return (Number(globalStats?.feeRate??0) / Number(globalStats?.feeDenominator??0) * 100).toFixed(2) + '%';
  }, [globalStats]);
  return (
    <Card className="p-6 h-full">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">Network Stats</h3>
      
      <div className="space-y-3">
        <StatRow
          label="Total Staked Value"
          value={totalStakedValue}
          valueColor="default"
        />
        {/* <StatRow
          label="24h Volume"
          value={data.volume24h}
          valueColor="default"
        /> */}
        <StatRow
          label="Average Stake"
          value={averageStake}
          valueColor="cyan"
        />
        <StatRow
          label="Network Fee"
          value={networkFee}
          valueColor="default"
        />
      </div>
    </Card>
  )
}

