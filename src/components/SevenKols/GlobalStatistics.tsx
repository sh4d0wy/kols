import React from 'react'
import { Card } from '../ui'

interface GlobalStatisticsData {
  totalJoinedWallets: number
  totalDeposited: number
  sentToTreasury: number
  accumulatedFee: number
  withdrawnFee: number
}

interface GlobalStatisticsProps {
  data: GlobalStatisticsData
}

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatWholeNumber = (num: number) => {
  return num.toLocaleString('en-US')
}

export const GlobalStatistics: React.FC<GlobalStatisticsProps> = ({ data }) => {
  const stats = [
    {
      label: 'Total joined wallets',
      value: formatWholeNumber(data.totalJoinedWallets),
      suffix: '',
    },
    {
      label: 'Total deposited (USDT)',
      value: formatNumber(data.totalDeposited),
      suffix: 'USDT',
    },
    {
      label: 'Sent to Treasury',
      value: formatNumber(data.sentToTreasury),
      suffix: 'USDT',
    },
    {
      label: 'Accumulated fee',
      value: formatNumber(data.accumulatedFee),
      suffix: 'USDT',
    },
    {
      label: 'Withdrawn fee',
      value: formatNumber(data.withdrawnFee),
      suffix: 'USDT',
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#7B61FF" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#7B61FF" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#7B61FF" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="#7B61FF" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Global Statistics</h3>
          <p className="text-gray-500 text-sm">Platform-wide performance</p>
        </div>
      </div>

      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="flex justify-between items-center py-3.5 px-4 bg-[#111111] rounded-xl"
          >
            <span className="text-gray-400 text-sm">{stat.label}</span>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-semibold">{stat.value}</span>
              {stat.suffix && (
                <span className="text-cyan-400 font-semibold">{stat.suffix}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

