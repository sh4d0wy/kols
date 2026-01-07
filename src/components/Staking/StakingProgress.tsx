import React from 'react'
import { Card } from '../ui/Card'
import { ProgressBar } from './ProgressBar'

interface StakingProgressData {
  poolUtilization: number
  yourContribution: number
  rewardRate: number
}

interface StakingProgressProps {
  data?: StakingProgressData
}

const defaultData: StakingProgressData = {
  poolUtilization: 67.3,
  yourContribution: 3.42,
  rewardRate: 24.5
}

export const StakingProgress: React.FC<StakingProgressProps> = ({ data = defaultData }) => {
  return (
    <Card className="p-6 h-full">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">Staking Progress</h3>
      
      <div className="space-y-6">
        <ProgressBar
          label="Pool Utilization"
          value={data.poolUtilization}
          color="cyan"
        />
        <ProgressBar
          label="Your Contribution"
          value={data.yourContribution}
          color="purple"
        />
        <ProgressBar
          label="Reward Rate"
          value={data.rewardRate}
          color="gradient"
        />
      </div>
    </Card>
  )
}

