import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl text-white ${className}`}>
      {children}
    </div>
  )
}

