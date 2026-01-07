import React, { useState } from 'react'
import { Card, Button } from '../ui'

interface DownlineSummaryData {
  networkCount: number
  totalStructureRevenue: number
  averagePerMember: number
  activeMembers: number
}

interface DownlineSummaryProps {
  data: DownlineSummaryData
  onRefresh: () => void
}

const levels = [
  { id: 'lv1', label: 'Lv1' },
  { id: 'lv1-2', label: 'Lv1 to Lv2' },
  { id: 'lv2-3', label: 'Lv2 to Lv3' },
  { id: 'lv3-8', label: 'Lv3 to Lv8' },
  { id: 'lv5-6', label: 'Lv 5/6' },
  { id: 'lv7-8', label: 'Lv7 to Lv8' },
]

export const DownlineSummary: React.FC<DownlineSummaryProps> = ({ data, onRefresh }) => {
  const [activeLevel, setActiveLevel] = useState('lv1')

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 21V12C4 11.4696 4.21071 10.9609 4.58579 10.5858C4.96086 10.2107 5.46957 10 6 10H8" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 21V12C20 11.4696 19.7893 10.9609 19.4142 10.5858C19.0391 10.2107 18.5304 10 18 10H16" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 21H23" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Downline Summary</h3>
          <p className="text-gray-500 text-sm">Track downline chain only</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h4 className="text-white font-semibold">Your Network Overview</h4>
        <span className="text-cyan-400 text-2xl font-bold">{data.networkCount}</span>
      </div>

      {/* Level Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => setActiveLevel(level.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeLevel === level.id
                ? 'bg-primary-gradient text-[#0D0D0D]'
                : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-[#2a2a2a]'
            }`}
          >
            {level.label}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button className="flex-1 py-3 px-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-gray-400 text-sm font-medium hover:text-white transition-colors">
          Real Time (contract)
        </button>
        <Button onClick={onRefresh} className="flex-1">
          Refresh (fetch)
        </Button>
      </div>

      {/* Level Stats */}
      <div className="bg-[#111111] rounded-xl p-4">
        <div className="text-center mb-4">
          <h5 className="text-white font-semibold">Level 1 Direct Referrals</h5>
          <p className="text-gray-500 text-sm">{data.activeMembers} active members generating structure rewards</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-3 px-4 bg-[#0D0D0D] rounded-xl">
            <span className="text-gray-400 text-sm">Total Structure Revenue</span>
            <span className="text-cyan-400 font-semibold">{data.totalStructureRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-[#0D0D0D] rounded-xl">
            <span className="text-gray-400 text-sm">Average per Member</span>
            <span className="text-cyan-400 font-semibold">{data.averagePerMember.toLocaleString('en-US', { minimumFractionDigits: 2 })} USDT</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

