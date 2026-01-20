import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-105'
  
  const variantStyles = {
    primary: 'bg-primary-gradient text-[#0D0D0D] hover:opacity-90 hover:shadow-lg hover:shadow-cyan-500/20',
    secondary: 'bg-[#1a1a1a] text-white hover:bg-[#252525] border border-[#2a2a2a]',
    outline: 'bg-transparent border border-cyan-500/50 text-[#00FFD1] hover:bg-[#00ffd1]/10',
    ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5'
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base'
  }

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

