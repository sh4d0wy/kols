import React from 'react'

interface StakingHeaderProps {
  title?: string
  subtitle?: string
  apy?: string
  tvl?: string
}

export const StakingHeader: React.FC<StakingHeaderProps> = ({
  title = 'Global Staking Overview',
  subtitle = 'Real-time statistics and performance metrics',
  apy = '24.5%',
  tvl = '$8.9M'
}) => {
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
          <p className="text-2xl font-bold text-cyan-400 font-mono">{apy}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">TVL</p>
          <p className="text-2xl font-bold text-white font-mono">{tvl}</p>
        </div>
      </div>
    </div>
  )
}

