import React from 'react'
import {motion} from 'motion/react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-[#13151C99]/60 border border-white/8 rounded-2xl text-white w-full ${className}`}
    >
      {children}
    </motion.div>
  )
}

