import React from 'react'
import { Card } from '../ui/Card'
import { Link } from 'react-router-dom'

interface ComingSoonCardProps {
  url?: string
  title: string
  description: string
  metricTitle?: string
  metricValue?: string
}

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

export const ComingSoonCard: React.FC<ComingSoonCardProps> = ({ url, title, description, metricTitle, metricValue }) => {
  return (
    <Link to={url??'/'}>
    <Card className="p-5 hover:border-cyan-500/30 transition-all duration-300 group cursor-pointer flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-white font-semibold">{title}</h4>
        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-[#00FFD1] group-hover:bg-cyan-500/30 transition-colors">
          <ArrowIcon />
        </div>
      </div>
      {
        description && (
          <p className="text-xs text-gray-500 leading-relaxed mt-auto">{description}</p>
        )
      }
      {
        metricTitle && metricValue && (
          <div className="flex items-center justify-between mt-auto">
            <span className="text-lg text-gray-500">{metricTitle}</span>
            <span className="text-lg text-white font-mono">{metricValue}</span>
          </div>
        )
      }
    </Card>
    </Link>
  )
}

