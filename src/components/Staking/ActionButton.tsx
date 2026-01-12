import React from 'react'

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  description: string
  variant?: 'primary' | 'outline' | 'dark'
  onClick?: () => void
  disabled?: boolean
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  description,
  variant = 'outline',
  onClick,
  disabled = false
}) => {
  const variantStyles = {
    primary: 'bg-primary-gradient text-black hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed',
    outline: 'bg-transparent border border-[#2a2a2a] text-white hover:bg-[#1a1a1a] hover:border-[#3a3a3a] disabled:opacity-50 disabled:cursor-not-allowed',
    dark: 'bg-[#1a1a1a] border border-[#2a2a2a] text-white hover:bg-[#252525] disabled:opacity-50 disabled:cursor-not-allowed'
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
          ${variantStyles[variant]}
        `}
      >
        {icon}
        {label}
      </button>
      <p className="text-[10px] text-gray-500 text-center mt-2 px-2">{description}</p>
    </div>
  )
}

