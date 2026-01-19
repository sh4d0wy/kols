import React from 'react'
import { Card } from '../ui'
import { use7KolsUserQuery } from '@/hooks/7kols/queries/use7kolsUserQuery'

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export const MyStructureInfo: React.FC = () => {
  const {data: userData} = use7KolsUserQuery();
  const stats = [
    {
      label: 'REMAINING AMOUNT',
      value: formatNumber(Number(userData?.pendingReward)),
      suffix: 'USDT',
      tooltip: 'Unclaimed amount remaining in the structure. It may be applied on your next participation.',
    },
    {
      label: 'TOTAL STRUCT AMOUNT',
      value: formatNumber(Number(userData?.totalEarned)),
      suffix: 'USDT',
      tooltip: 'Total amount accumulated through the structure so far.',
    },
    {
      label: 'TOTAL JOINED USDT',
      value: formatNumber(Number(userData?.totalDeposited)),
      suffix: '',
      tooltip: 'Total USDT amount you have deposited into the structure.',
    },
    {
      label: 'TOTAL WITHDRAWN(My)',
      value: formatNumber(Number(userData?.totalWithdrawn)),
      suffix: 'USDT',
      tooltip: 'Total amount you have withdrawn from the structure.',
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 20V10" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20V4" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 20V14" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">My Structure Info</h3>
          <p className="text-gray-500 text-sm">Your personal referral earnings data</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-linear-to-br from-[#0a1a1a] to-[#0d1520] border border-cyan-500/20 rounded-xl p-4"
          >
            <div className="flex items-center gap-1 mb-2">
              <span className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</span>
              {stat.tooltip && (
                <div className="relative group">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-600 cursor-help hover:text-gray-400 transition-colors">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="8" r="1" fill="currentColor"/>
                  </svg>
                  <div className="absolute left-0 top-full mt-2 w-48 p-3 bg-[#0d1520] border border-cyan-500/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <p className="text-gray-300 text-xs leading-relaxed">{stat.tooltip}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-white text-2xl font-bold">{stat.value}</span>
              {stat.suffix && (
                <span className="text-cyan-400 text-sm font-semibold">{stat.suffix}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

