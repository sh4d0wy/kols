import React from 'react'
import { Card } from '../ui/Card'
import { StakerItem } from './StakerItem'

interface Staker {
  rank: number
  address: string
  label?: string
  amount: string
  percentage: string
  isYou?: boolean
}

interface TopStakersProps {
  stakers?: Staker[]
}

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const defaultStakers: Staker[] = [
  {
    rank: 1,
    address: '0xA8F2...7B3D',
    label: 'Early Adopter',
    amount: '8,456',
    percentage: '11.8%'
  },
  {
    rank: 2,
    address: '0x74zD...36B2',
    amount: '2,459',
    percentage: '3.4%',
    isYou: true
  },
  {
    rank: 3,
    address: '0x3C9A...F2E1',
    label: 'Power Staker',
    amount: '1,987',
    percentage: '2.8%'
  },
  {
    rank: 4,
    address: '0x9B2F...8C4A',
    label: 'Active Staker',
    amount: '1,654',
    percentage: '2.3%'
  },
  {
    rank: 5,
    address: '0x5E7C...1D9B',
    label: 'Regular Staker',
    amount: '1,432',
    percentage: '2.0%'
  }
]

export const TopStakers: React.FC<TopStakersProps> = ({ stakers = defaultStakers }) => {
  return (
    <Card className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">Top Stakers</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400">
          <UsersIcon />
        </div>
      </div>

      <div className="space-y-3">
        {stakers.map((staker) => (
          <StakerItem
            key={staker.rank}
            rank={staker.rank}
            address={staker.address}
            label={staker.label}
            amount={staker.amount}
            percentage={staker.percentage}
            isYou={staker.isYou}
          />
        ))}
      </div>
    </Card>
  )
}

