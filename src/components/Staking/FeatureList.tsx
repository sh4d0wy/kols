import React from 'react'

interface Feature {
  text: string
  active?: boolean
}

interface FeatureListProps {
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  { text: 'Becomes active immediately', active: true },
  { text: 'Participates in reward distribution', active: true },
  { text: 'Earn daily USDT rewards', active: true },
  { text: '7-day unstaking period', active: true }
]

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
    <path 
      d="M20 6L9 17L4 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

export const FeatureList: React.FC<FeatureListProps> = ({ features = defaultFeatures }) => {
  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex-shrink-0">
            <CheckIcon />
          </div>
          <span className="text-sm text-gray-400">{feature.text}</span>
        </div>
      ))}
    </div>
  )
}

