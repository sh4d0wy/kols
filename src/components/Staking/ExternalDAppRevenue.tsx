import React from 'react'
import { Card } from '../ui/Card'
import { ComingSoonCard } from './ComingSoonCard'

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

export interface DAppItem {
  url?: string
  title: string
  description?: string
  metricTitle?: string
  metricValue?: string
}

interface ExternalDAppRevenueProps {
  items?: DAppItem[]
}


export const ExternalDAppRevenue: React.FC<ExternalDAppRevenueProps> = ({ items }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">External DApp Revenue</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-[#00FFD1]">
          <GlobeIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items?.map((item, index) => (
          <ComingSoonCard
            key={index}
            url={item.url??'/'}
            title={item.title}
            description={item.description??''}
            metricTitle={item.metricTitle??''}
            metricValue={item.metricValue??''}
          />
        ))}
      </div>
    </Card>
  )
}

