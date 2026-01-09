import React, { useMemo } from 'react'
import { StatsCard } from './StatsCard'
import type { GlobalStats } from '../../types/stakingStats'
import { useGlobalQuery } from '../../hooks/staking/queries/useGlobalQuery'

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

interface StatsGridProps {
  data?: GlobalStats
}

export const StatsGrid: React.FC<StatsGridProps> = () => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }
  const { data: globalStats } = useGlobalQuery();

  const revenueChange = useMemo(() => {
    const difference = parseFloat(globalStats?.today??'0') - parseFloat(globalStats?.yesterday??'0');
    const percentage = (difference / parseFloat(globalStats?.yesterday??'0')) * 100;
    return percentage.toFixed(2) + '%';
  }, [globalStats]);  

  const weeklyChange = useMemo(() => {
    const difference = parseFloat(globalStats?.thisWeek??'0') - parseFloat(globalStats?.lastWeek??'0');
    const percentage = (difference / parseFloat(globalStats?.lastWeek??'0')) * 100;
    return percentage.toFixed(2) + '%';
  }, [globalStats]);

 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total Stakers"
        mainValue={formatNumber(Number(globalStats?.stakerCount??0))}
        changeLabel="Active Participants"
        changePositive={true}
        secondaryLabel="Active KOLS"
        secondaryValue={formatNumber(Number(globalStats?.activeStaked??0))}
        icon={<UsersIcon />}
      />
      
      <StatsCard
        title="Today's Revenue"
        mainValue={formatNumber(parseFloat(globalStats?.today??'0'))}
        mainSuffix="USDT"
        changeLabel="Daily Distribution"
        changeValue={isNaN(parseFloat(revenueChange)) ? '0' : revenueChange}
        changePositive={!isNaN(parseFloat(revenueChange)) && parseFloat(revenueChange) > 0}
        secondaryLabel="Yesterday"
        secondaryValue={formatNumber(parseFloat(globalStats?.yesterday??'0'))}
        secondarySuffix="USDT"
        icon={<TrendingIcon />}
      />
      
      <StatsCard
        title="Weekly Revenue"
        mainValue={formatNumber(parseFloat(globalStats?.thisWeek??'0'))}
        mainSuffix="USDT"
        changeLabel="This Week"
        changeValue={isNaN(parseFloat(weeklyChange)) ? '0' : weeklyChange}
        changePositive={!isNaN(parseFloat(weeklyChange)) && parseFloat(weeklyChange) > 0}
        secondaryLabel="This Month"
        secondaryValue={formatNumber(parseFloat(globalStats?.thisMonth??'0'))}
        secondarySuffix="USDT"
        icon={<CalendarIcon />}
      />
      
      <StatsCard
        title="Total Rewards"
        mainValue={formatNumber(parseFloat(globalStats?.totalRewards??'0'))}
        mainSuffix="USDT"
        changeLabel="Total Distributed"
        secondaryLabel="Insurance Pool"
        secondaryValue={formatNumber(parseFloat(globalStats?.insurancePool??'0'))}
        secondarySuffix="USDT"
        icon={<RewardsIcon />}
      />
    </div>
  )
}

