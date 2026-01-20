import React from 'react'

interface RuleItemProps {
  text: string
  indent?: boolean
  highlight?: boolean
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#00FFD1] flex-shrink-0">
    <path 
      d="M20 6L9 17L4 12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

const SubCheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-500 flex-shrink-0">
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
)

export const RuleItem: React.FC<RuleItemProps> = ({ text, indent = false, highlight = false }) => {
  return (
    <div className={`flex items-start gap-3 ${indent ? 'ml-8' : ''}`}>
      {indent ? <SubCheckIcon /> : <CheckIcon />}
      <span className={`text-sm leading-relaxed ${highlight ? 'text-[#00FFD1]' : 'text-gray-400'}`}>
        {text}
      </span>
    </div>
  )
}

