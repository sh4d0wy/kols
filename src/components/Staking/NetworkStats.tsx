import React from 'react'
import { Card } from '../ui/Card'
import { StatRow } from '../ui/StatRow'

interface NetworkStatsData {
  totalStakedValue: string
  volume24h: string
  averageStake: string
  networkFee: string
}

interface NetworkStatsProps {
  data?: NetworkStatsData
}

const defaultData: NetworkStatsData = {
  totalStakedValue: '$8.9M',
  volume24h: '$234.5K',
  averageStake: '57.4 KOLS',
  networkFee: '2.0%'
}

export const NetworkStats: React.FC<NetworkStatsProps> = ({ data = defaultData }) => {
  return (
    <Card className="p-6 h-full">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">Network Stats</h3>
      
      <div className="space-y-3">
        <StatRow
          label="Total Staked Value"
          value={data.totalStakedValue}
          valueColor="default"
        />
        <StatRow
          label="24h Volume"
          value={data.volume24h}
          valueColor="default"
        />
        <StatRow
          label="Average Stake"
          value={data.averageStake}
          valueColor="cyan"
        />
        <StatRow
          label="Network Fee"
          value={data.networkFee}
          valueColor="default"
        />
      </div>
    </Card>
  )
}

