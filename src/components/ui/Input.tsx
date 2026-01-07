import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  suffix?: React.ReactNode
  error?: string
  helperText?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  suffix,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-400 mb-2">{label}</label>
      )}
      <div className="relative">
        <input
          className={`
            w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-4
            text-white text-2xl font-semibold placeholder-gray-600
            focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30
            transition-all duration-200
            ${error ? 'border-red-500/50' : ''}
            ${suffix ? 'pr-32' : ''}
            ${className}
          `}
          {...props}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  )
}

