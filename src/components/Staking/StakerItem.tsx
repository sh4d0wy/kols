import React from 'react'

interface StakerItemProps {
  rank: number
  address: string
  label?: string
  amount: string
  percentage: string
  isYou?: boolean
}

const rankColors: Record<number, string> = {
  1: 'bg-amber-500 text-black',
  2: 'bg-gray-400 text-black',
  3: 'bg-amber-700 text-white',
  4: 'bg-[#2a2a2a] text-gray-400',
  5: 'bg-[#2a2a2a] text-gray-400'
}

export const StakerItem: React.FC<StakerItemProps> = ({
  rank,
  address,
  label,
  amount,
  percentage,
  isYou = false
}) => {
  return (
    <div className={`flex items-center justify-between py-3 px-4 rounded-xl ${isYou ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-[#111111]'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${rankColors[rank] || 'bg-[#2a2a2a] text-gray-400'}`}>
          {rank}
        </div>
        <div>
          <p className="text-white font-medium text-sm font-mono">{address}</p>
          <p className={`text-xs ${isYou ? 'text-cyan-400' : 'text-gray-500'}`}>
            {isYou ? 'You' : label}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-white font-mono">
          {amount} <span className="text-cyan-400">KOLS</span>
        </p>
        <p className="text-cyan-400 text-xs font-mono">{percentage}</p>
      </div>
    </div>
  )
}

