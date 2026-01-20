import React from 'react'
import { Card } from '../ui/Card'

interface StatsCardProps {
  title: string
  mainValue: string
  mainValueColor?: string
  mainSuffix?: string
  changeLabel: string
  changeValue?: string
  changePositive?: boolean
  secondaryLabel: string
  secondaryValue: string
  secondarySuffix?: string
  icon: React.ReactNode
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  mainValue,
  mainSuffix,
  changeLabel,
  changeValue,
  changePositive = true,
  mainValueColor = 'text-white',
  secondaryLabel,
  secondaryValue,
  secondarySuffix,
  icon
}) => {
  return (
    <Card className="p-5 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">{title}</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-[#00ffd1]/10 flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold font-mono tracking-tight ${mainValueColor}`}>{mainValue}</span>
          {mainSuffix && (
            <span className="text-xl font-semibold text-[#00FFD1]">{mainSuffix}</span>
          )}
        </div>
        {changeValue && (
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs text-gray-500">{changeLabel}</span>
          <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
            changePositive 
              ? 'bg-[#00ffd1]/7 text-[#00ffd1]' 
              : 'bg-red-500/20 text-red-400'
          }`}>
            {changePositive ? '↑' : '↓'} {changeValue}
          </span>
        </div>)}
      </div>
      
      <div className="mt-auto">
        <div className="flex justify-between items-center py-4 px-3 bg-[#00ffd1]/3 border border-[#00ffd1]/10 rounded-lg">
          <span className="text-sm text-gray-500">{secondaryLabel}</span>
          <div className="flex items-center gap-2 justify-end">
            <span className="font-semibold text-white text-lg font-mono">{secondaryValue}</span>
            {secondarySuffix && (
              <span className="font-semibold text-[#00FFD1]">{secondarySuffix}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

