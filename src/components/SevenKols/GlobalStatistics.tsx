import React from 'react'
import { Card } from '../ui'
import { use7KolsGlobalStats } from '@/hooks/7kols/queries/use7KolsGlobalStats'

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const formatWholeNumber = (num: number) => {
  return num.toLocaleString('en-US')
}

export const GlobalStatistics: React.FC = () => {
  const {data: globalData} = use7KolsGlobalStats();
  const stats = [
    {
      label: 'Total joined wallets',
      value: formatWholeNumber(globalData?.totalUsers??0),
      suffix: '',
    },
    {
      label: 'Total deposited (USDT)',
      value: formatNumber(Number(globalData?.totalDeposited??0)),
      suffix: 'USDT',
    },
    {
      label: 'Sent to Treasury',
      value: formatNumber(Number(globalData?.totalSentToTreasury??0)),
      suffix: 'USDT',
    },
    {
      label: 'Accumulated fee',
      value: formatNumber(Number(globalData?.totalFeeAmount??0)),
      suffix: 'USDT',
    },
    {
      label: 'Last joined user',
      value: (globalData?.lastJoinedUser??'').slice(0, 6) + '...' + (globalData?.lastJoinedUser??'').slice(-4),
      suffix: '',
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
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

