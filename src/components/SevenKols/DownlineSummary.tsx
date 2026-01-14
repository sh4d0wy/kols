import React, { useState, useMemo } from 'react'
import { Card, Button } from '../ui'
import { useDownlineData } from '@/hooks/7kols/queries/useDownlineData'
import { useConnection } from 'wagmi'
import type { LevelRevenue } from '@/types/7kols/downlineData'

const levels = [
  { id: 1, label: 'Level 1' },
  { id: 2, label: 'Level 2' },
  { id: 3, label: 'Level 3' },
  { id: 4, label: 'Level 4' },
  { id: 5, label: 'Level 5' },
  { id: 6, label: 'Level 6' },
]

export const DownlineSummary: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState(1)
  const connection = useConnection()
  const userAddress = connection.address ?? ''
  
  const { getTotalDownlineCount, getDownlineTree, getAllLevelsRevenue } = useDownlineData()
  
  const totalDownlineQuery = getTotalDownlineCount(userAddress)
  const downlineTreeQuery = getDownlineTree(userAddress)
  const allLevelsRevenueQuery = getAllLevelsRevenue(
    userAddress, 
    downlineTreeQuery.data?.levelMap || {}
  )

  const totalDownlineCount = totalDownlineQuery.data ?? 0
  const levelCounts: Record<number, number> = downlineTreeQuery.data?.levelCounts ?? {}
  const allLevelsRevenue: Record<number, LevelRevenue> = allLevelsRevenueQuery.data ?? {}

  const currentLevelData = useMemo(() => {
    const levelData = allLevelsRevenue[activeLevel]
    if (!levelData) {
      return {
        totalMembers: levelCounts[activeLevel] ?? 0,
        totalRevenue: '0',
        averagePerMember: '0',
      }
    }
    return {
      totalMembers: levelData.totalMembers,
      totalRevenue: levelData.totalRevenue,
      averagePerMember: levelData.averagePerMember,
    }
  }, [activeLevel, allLevelsRevenue, levelCounts])


  const handleRefresh = () => {
    console.log("handleRefresh")
    downlineTreeQuery.refetch()
    console.log("downlineTreeQuery.loading", downlineTreeQuery.isLoading)
    allLevelsRevenueQuery.refetch()
    console.log("allLevelsRevenueQuery.loading", allLevelsRevenueQuery.isLoading)
  }

  const isLoading = useMemo(()=>{
    return downlineTreeQuery.isLoading || allLevelsRevenueQuery.isLoading
  }, [downlineTreeQuery.isLoading, allLevelsRevenueQuery.isLoading])

  console.log("isLoading", isLoading)
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
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
        <span className="text-cyan-400 text-2xl font-bold">{totalDownlineCount}</span>
      </div>

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
            {levelCounts[level.id] !== undefined && (
              <span className="ml-1 opacity-70">({levelCounts[level.id]})</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex gap-3 mb-6">
        <button 
          className="flex-1 py-3 px-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-full text-gray-400 text-sm font-medium hover:text-white transition-colors"
          disabled
        >
          Real Time (contract)
        </button>
        <Button onClick={handleRefresh} className="flex-1 disabled:opacity-50" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Refresh (fetch)'}
        </Button>
      </div>

      <div className="bg-[#111111] rounded-xl p-4">
        <div className="text-center mb-4">
          <h5 className="text-white font-semibold">Level {activeLevel} Referrals</h5>
          <p className="text-gray-500 text-sm">
            {currentLevelData.totalMembers} members at this level
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-3 px-4 bg-[#0D0D0D] rounded-xl">
            <span className="text-gray-400 text-sm">Total Members</span>
            <span className="text-cyan-400 font-semibold">{currentLevelData.totalMembers}</span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-[#0D0D0D] rounded-xl">
            <span className="text-gray-400 text-sm">Total Revenue</span>
            <span className="text-cyan-400 font-semibold">
              {parseFloat(currentLevelData.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
            </span>
          </div>
          <div className="flex justify-between items-center py-3 px-4 bg-[#0D0D0D] rounded-xl">
            <span className="text-gray-400 text-sm">Average per Member</span>
            <span className="text-cyan-400 font-semibold">
              {parseFloat(currentLevelData.averagePerMember).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
            </span>
          </div>
        </div>
      </div>

      {/* {fetchEnabled && Object.keys(allLevelsRevenue).length > 0 && (
        <div className="mt-4 bg-[#111111] rounded-xl p-4">
          <h5 className="text-white font-semibold text-center mb-3">All Levels Summary</h5>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-2 px-4 bg-[#0D0D0D] rounded-xl">
              <span className="text-gray-400 text-sm">Total Members (All Levels)</span>
              <span className="text-purple-400 font-semibold">{totalStats.totalMembers}</span>
            </div>
            <div className="flex justify-between items-center py-2 px-4 bg-[#0D0D0D] rounded-xl">
              <span className="text-gray-400 text-sm">Total Revenue (All Levels)</span>
              <span className="text-purple-400 font-semibold">
                {parseFloat(totalStats.totalRevenue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
              </span>
            </div>
            <div className="flex justify-between items-center py-2 px-4 bg-[#0D0D0D] rounded-xl">
              <span className="text-gray-400 text-sm">Average per Member</span>
              <span className="text-purple-400 font-semibold">
                {parseFloat(totalStats.averagePerMember).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDT
              </span>
            </div>
          </div>
        </div>
      )} */}
    </Card>
  )
}
