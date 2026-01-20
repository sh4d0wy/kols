import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#13151C99]/60 border border-white/8 rounded-2xl text-white w-full ${className}`}>
      {children}
    </div>
  )
}

