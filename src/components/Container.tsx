import React from 'react'

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full max-w-[1400px] mx-auto flex justify-center items-center bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl text-white px-6 py-3 mt-4'>
      {children}
    </div>
  )
}
