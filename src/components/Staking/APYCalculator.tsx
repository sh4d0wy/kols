import React, { useState } from 'react'
import { Card } from '../ui/Card'
import { useGlobalQuery } from '@/hooks/staking/queries/useGlobalQuery'

const CalculatorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="8" y1="10" x2="10" y2="10" />
    <line x1="14" y1="10" x2="16" y2="10" />
    <line x1="8" y1="14" x2="10" y2="14" />
    <line x1="14" y1="14" x2="16" y2="14" />
    <line x1="8" y1="18" x2="10" y2="18" />
    <line x1="14" y1="18" x2="16" y2="18" />
  </svg>
)

const periods = ['1 Month', '3 Months', '6 Months', '1 Year', '2 Years']

export const APYCalculator: React.FC= () => {
  const [amount, setAmount] = useState('5000')
  const [period, setPeriod] = useState('1 Year')
  const [isOpen, setIsOpen] = useState(false)
  

  const getPeriodMultiplier = (p: string) => {
    const multipliers: Record<string, number> = {
      '1 Month': 1/12,
      '3 Months': 3/12,
      '6 Months': 6/12,
      '1 Year': 1,
      '2 Years': 2
    }
    return multipliers[p] || 1
  }
  const {data:globalStats} = useGlobalQuery();
  const apy = parseFloat(globalStats?.apy??'0')
  const numAmount = parseFloat(amount) || 0 
  const multiplier = getPeriodMultiplier(period)
  const estimatedRewards = Math.round(numAmount * (apy) * multiplier)
  const totalValue = numAmount + estimatedRewards

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">APY Calculator</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400">
          <CalculatorIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-500 mb-2">Stake Amount (KOLS)</label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ''))}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-lg font-semibold font-mono placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 transition-all"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">KOLS</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-2">Staking Period</label>
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white text-lg font-semibold text-left flex justify-between items-center hover:border-[#3a3a3a] transition-all"
              >
                {period}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl overflow-hidden z-10">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPeriod(p); setIsOpen(false) }}
                      className={`w-full px-4 py-3 text-left hover:bg-[#252525] transition-colors ${p === period ? 'text-cyan-400' : 'text-white'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-[10px] text-gray-600 mt-2">
            Calculated at the current APY of {apy.toFixed(2)}%. Assuming linear rate with market conditions.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Estimated Rewards</p>
            <p className="text-3xl font-bold text-cyan-400 font-mono">{estimatedRewards.toLocaleString()} <span className="text-xl">USDT</span></p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Total Value After Period</p>
            <p className="text-3xl font-bold text-cyan-400 font-mono">{totalValue.toLocaleString()} <span className="text-xl">USDT</span></p>
          </div>
        </div>
      </div>
    </Card>
  )
}

