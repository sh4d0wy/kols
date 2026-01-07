import React from 'react'
import { StatsCard } from './StatsCard'

// Icons as components
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const TrendingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const RewardsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
)

interface StatsData {
  totalStakers: number
  activeParticipantsChange: string
  activeKols: number
  todayRevenue: number
  dailyDistributionChange: string
  yesterdayRevenue: number
  weeklyRevenue: number
  weeklyChange: string
  monthlyRevenue: number
  totalRewards: number
  totalDistributedChange: string
  insurancePool: number
}

interface StatsGridProps {
  data?: StatsData
}

const defaultData: StatsData = {
  totalStakers: 1247,
  activeParticipantsChange: '8.4%',
  activeKols: 71632,
  todayRevenue: 2847,
  dailyDistributionChange: '3.1%',
  yesterdayRevenue: 3125,
  weeklyRevenue: 18432,
  weeklyChange: '12.4%',
  monthlyRevenue: 76234,
  totalRewards: 542891,
  totalDistributedChange: '156.7%',
  insurancePool: 100
}

export const StatsGrid: React.FC<StatsGridProps> = ({ data = defaultData }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Stakers"
        mainValue={formatNumber(data.totalStakers)}
        changeLabel="Active Participants"
        changeValue={data.activeParticipantsChange}
        changePositive={true}
        secondaryLabel="Active KOLS"
        secondaryValue={formatNumber(data.activeKols)}
        icon={<UsersIcon />}
      />
      
      <StatsCard
        title="Today's Revenue"
        mainValue={formatNumber(data.todayRevenue)}
        mainSuffix="USDT"
        changeLabel="Daily Distribution"
        changeValue={data.dailyDistributionChange}
        changePositive={true}
        secondaryLabel="Yesterday"
        secondaryValue={formatNumber(data.yesterdayRevenue)}
        secondarySuffix="USDT"
        icon={<TrendingIcon />}
      />
      
      <StatsCard
        title="Weekly Revenue"
        mainValue={formatNumber(data.weeklyRevenue)}
        mainSuffix="USDT"
        changeLabel="This Week"
        changeValue={data.weeklyChange}
        changePositive={true}
        secondaryLabel="This Month"
        secondaryValue={formatNumber(data.monthlyRevenue)}
        secondarySuffix="USDT"
        icon={<CalendarIcon />}
      />
      
      <StatsCard
        title="Total Rewards"
        mainValue={formatNumber(data.totalRewards)}
        mainSuffix="USDT"
        changeLabel="Total Distributed"
        changeValue={data.totalDistributedChange}
        changePositive={true}
        secondaryLabel="Insurance Pool"
        secondaryValue={formatNumber(data.insurancePool)}
        secondarySuffix="USDT"
        icon={<RewardsIcon />}
      />
    </div>
  )
}

