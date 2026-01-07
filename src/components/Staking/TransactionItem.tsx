import React from 'react'

interface TransactionItemProps {
  type: 'reward' | 'stake'
  title: string
  subtitle: string
  amount: string
  currency: string
  timestamp: string
  positive?: boolean
}

const RewardIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </div>
)

const StakeIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-purple-400">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>
)

export const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  title,
  subtitle,
  amount,
  currency,
  timestamp,
  positive = false
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-[#111111] rounded-xl">
      <div className="flex items-center gap-3">
        {type === 'reward' ? <RewardIcon /> : <StakeIcon />}
        <div>
          <p className="text-white font-medium text-sm">{title}</p>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold font-mono ${positive ? 'text-emerald-400' : 'text-white'}`}>
          {positive && '+'}{amount} <span className="text-cyan-400">{currency}</span>
        </p>
        <p className="text-gray-500 text-xs">{timestamp}</p>
      </div>
    </div>
  )
}

