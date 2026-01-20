import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'gradient'
  className?: string
}

const variantStyles = {
  success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  danger: 'bg-red-500/20 text-red-400 border-red-500/30',
  info: 'bg-cyan-500/20 text-[#00FFD1] border-cyan-500/30',
  gradient: 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-[#00FFD1] border-cyan-500/30'
}

export const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'success',
  className = '' 
}) => {
  return (
    <span className={`
      inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border
      ${variantStyles[variant]}
      ${className}
    `}>
      {variant === 'success' && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      )}
      {children}
    </span>
  )
}

