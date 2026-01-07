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

interface DAppItem {
  title: string
  description: string
}

interface ExternalDAppRevenueProps {
  items?: DAppItem[]
}

const defaultItems: DAppItem[] = [
  {
    title: 'Coming Soon #1',
    description: 'Live revenue data from external DApps will be displayed in this view.'
  },
  {
    title: 'Coming Soon #2',
    description: 'Multiple external sources will connect here to share real revenue streams.'
  },
  {
    title: 'Coming Soon #3',
    description: 'Performance of external projects will be reflected in near-real-time.'
  }
]

export const ExternalDAppRevenue: React.FC<ExternalDAppRevenueProps> = ({ items = defaultItems }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">External DApp Revenue</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-cyan-400">
          <GlobeIcon />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <ComingSoonCard
            key={index}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Card>
  )
}

