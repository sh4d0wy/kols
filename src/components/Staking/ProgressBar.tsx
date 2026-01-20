import React from 'react'

interface ProgressBarProps {
  label: string
  value: number
  maxValue?: number
  showPercentage?: boolean
  color?: 'cyan' | 'purple' | 'gradient'
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  maxValue = 100,
  showPercentage = true,
  color = 'cyan'
}) => {
  const percentage = Math.min((value / maxValue) * 100, 100)
  
  const barColors = {
    cyan: 'bg-[#00FFD1]',
    purple: 'bg-purple-400',
    gradient: 'bg-gradient-to-r from-[#00FFD1] to-purple-400'
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">{label}</span>
        <span className="text-sm font-semibold text-[#00FFD1] font-mono">
          {showPercentage ? `${value}%` : value}
        </span>
      </div>
      <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${barColors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

