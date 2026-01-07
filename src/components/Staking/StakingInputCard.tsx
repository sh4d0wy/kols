import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { StatRow } from '../ui/StatRow'
import { FeatureList } from './FeatureList'

interface StakingInputCardProps {
  balance?: number
  minStake?: number
  estimatedDailyRewards?: number
  estimatedMonthlyRewards?: number
  onStake?: (amount: number) => void
  onMax?: () => void
}

const ChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export const StakingInputCard: React.FC<StakingInputCardProps> = ({
  balance = 15789,
  minStake = 1000,
  estimatedDailyRewards = 2.45,
  estimatedMonthlyRewards = 73.50,
  onStake,
  onMax
}) => {
  const [amount, setAmount] = useState('1000')

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: num % 1 !== 0 ? 2 : 0 })
  }

  const handleMax = () => {
    setAmount(balance.toString())
    onMax?.()
  }

  const handleStake = () => {
    onStake?.(Number(amount))
  }

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">KOLS Staking</h3>
        <button className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-colors">
          <ChartIcon />
        </button>
      </div>
      
      {/* Input Section */}
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-4 text-white text-2xl font-semibold font-mono placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200 pr-36"
            placeholder="0"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleMax}
              className="text-xs px-3 py-1.5"
            >
              MAX
            </Button>
            <span className="text-gray-400 font-semibold">KOLS</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">Minimum total stake: {formatNumber(minStake)} KOLS per wallet</p>
      </div>
      
      {/* Stats Section */}
      <div className="space-y-3 mt-4">
        <StatRow
          label="Your Balance"
          value={formatNumber(balance)}
          suffix="KOLS"
          suffixColor="cyan"
        />
        
        <StatRow
          label="Est. Daily Rewards"
          value={formatNumber(estimatedDailyRewards)}
          suffix="USDT"
          suffixColor="cyan"
        />
        
        <StatRow
          label="Est. Monthly Rewards"
          value={formatNumber(estimatedMonthlyRewards)}
          suffix="USDT"
          suffixColor="cyan"
        />
      </div>
      
      {/* Stake Button */}
      <div className="mt-6">
        <Button 
          variant="primary" 
          size="lg" 
          fullWidth
          onClick={handleStake}
          className="py-4"
        >
          <LockIcon />
          Stake Now
        </Button>
      </div>
      
      {/* Features */}
      <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
        <FeatureList />
      </div>
    </Card>
  )
}

