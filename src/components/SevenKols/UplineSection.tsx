import React, { useState } from 'react'
import { useConnection } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { useUplineQuery } from '@/hooks/7kols/queries/useUplineQuery'
import {use7KolsUserQuery} from '@/hooks/7kols/queries/use7kolsUserQuery'

interface UplineSectionProps {
  title?: string
  stakeAddress?: string
  uplineAddresses?: string[]
  onGoToStaking?: () => void
}

export const UplineSection: React.FC<UplineSectionProps> = ({
  title = 'Upline (Staking + Top 6)',
  onGoToStaking,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const connection = useConnection()
  const userAddress = connection.address ?? ''
  const navigate = useNavigate()  
  const {data: uplineData} = useUplineQuery();
  const {data: userData} = use7KolsUserQuery();
  
  return (
    <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-2xl p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left">
            <span className="text-white font-semibold block">{title}</span>
            <span className="text-gray-500 text-sm">Your referral network and top performers</span>
          </div>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-6 space-y-3">
          <div className="bg-[#0d1f1f] border border-[#00F5D4]/20 rounded-2xl p-4 flex cursor-pointer hover:bg-[#1a3a3a] transition-all duration-200 items-center justify-between" onClick={() => {
            navigate('/')
          }}>
            <div className="flex items-center gap-4">
              <span className="bg-purple-500 text-white text-sm font-bold px-5 py-2 rounded-lg uppercase tracking-wider">
                Stake
              </span>
              <span className="text-white font-mono text-sm">{userAddress}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onGoToStaking?.()
              }}
              className="bg-transparent border border-[#00F5D4] text-[#00F5D4] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#00F5D4]/10 transition-colors"
            >
              Go to staking
            </button>
          </div>

          {userData?.registered && uplineData?.map((address, index) => (
            <div
              key={index}
              className="bg-[#0d1f1f] border border-[#1a3a3a] rounded-2xl p-4 flex items-center gap-4"
            >
              <span className="text-gray-500 text-sm font-medium border border-[#2a3a3a] rounded-lg px-3 py-1">U{index + 1}</span>
              <span className="text-[#00F5D4] font-mono text-sm">{address}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

