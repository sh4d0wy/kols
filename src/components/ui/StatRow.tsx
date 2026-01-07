import React from 'react'

interface StatRowProps {
  label: string
  value: string | number
  valueColor?: 'default' | 'cyan' | 'purple' | 'green' | 'amber'
  suffix?: string
  suffixColor?: 'cyan' | 'purple' | 'green' | 'amber'
  className?: string
}

const valueColors = {
  default: 'text-white',
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  green: 'text-emerald-400',
  amber: 'text-amber-400'
}

const suffixColors = {
  cyan: 'text-cyan-400',
  purple: 'text-purple-400',
  green: 'text-emerald-400',
  amber: 'text-amber-400'
}

export const StatRow: React.FC<StatRowProps> = ({
  label,
  value,
  valueColor = 'default',
  suffix,
  suffixColor = 'cyan',
  className = ''
}) => {
  return (
    <div className={`flex justify-between items-center py-3.5 px-4 bg-[#111111] rounded-xl ${className}`}>
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className={`font-semibold ${valueColors[valueColor]}`}>{value}</span>
        {suffix && (
          <span className={`font-semibold ${suffixColors[suffixColor]}`}>{suffix}</span>
        )}
      </div>
    </div>
  )
}

