import { useGlobalQuery } from '@/hooks/staking/queries/useGlobalQuery'
import React from 'react'

interface StakingHeaderProps {
  title?: string
  subtitle?: string
}

export const StakingHeader: React.FC<StakingHeaderProps> = ({
  title = 'Global Staking Overview',
  subtitle = 'Real-time statistics and performance metrics',
}) => {
  const {data:globalStats} = useGlobalQuery();
  const apy = parseFloat(globalStats?.apy??'0')
  return (
    <div className="flex justify-between items-start mb-8 mt-8">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-primary-gradient font-syne mb-2">
          {title}
        </h1>
        <p className="text-gray-400 text-sm font-syne-mono">{subtitle}</p>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Current APY</p>
          <p className="text-2xl font-bold text-[#00FFD1] font-mono">{apy.toFixed(2)}%</p>
        </div>
        {/* TODO: Add TVL */}
        {/* <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">TVL</p>
          <p className="text-2xl font-bold text-white font-mono">{tvl}</p>
        </div> */}
      </div>
    </div>
  )
}

