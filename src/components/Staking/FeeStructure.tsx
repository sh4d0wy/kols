import React from 'react'
import { Card } from '../ui/Card'
import { StatRow } from '../ui/StatRow'
import { useFeeQuery } from '@/hooks/staking/queries/useFeeQuery'

export const FeeStructure: React.FC = () => {
  const {data:feeStats} = useFeeQuery();
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <Card className="p-6">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">
        Fee Structure & Pool Status
      </h3>

      <div className="space-y-3">
        <StatRow
          label="Contract USDT Balance"
          value={formatNumber(Number(feeStats?.contractUsdtBalance || 0))}
          suffix="USDT"
          suffixColor="cyan"
        />
        <StatRow
          label="Total User Net Withdrawals"
          value={formatNumber(Number(feeStats?.totalUserNetWithdrawals || 0))}
          suffix="USDT"
          suffixColor="cyan"
        />
        <StatRow
          label="Redistribution Fee (1.8%) Total"
          value={formatNumber(Number(feeStats?.redistributionFee || 0))}
          suffix="USDT"
          suffixColor="cyan"
        />
        <StatRow
          label="Insurance Fee (0.2%) Total"
          value={formatNumber(Number(feeStats?.insuranceFee || 0))}
          suffix="USDT"
          suffixColor="cyan"
        />
      </div>
    </Card>
  )
}

