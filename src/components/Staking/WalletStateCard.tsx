import React from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { StatRow } from '../ui/StatRow'
import { Button } from '../ui/Button'

interface WalletStateData {
  isActive: boolean
  activeStake: number
  myShare: number
  pendingUnstake: number
  unlockTime: string | null
  withdrawableRewards: number
  totalEarnings: number
}

interface WalletStateCardProps {
  data?: WalletStateData
  onWithdraw?: () => void
}

const defaultData: WalletStateData = {
  isActive: true,
  activeStake: 2450,
  myShare: 3.42,
  pendingUnstake: 0,
  unlockTime: null,
  withdrawableRewards: 127.84,
  totalEarnings: 1456.32
}

export const WalletStateCard: React.FC<WalletStateCardProps> = ({ 
  data = defaultData,
  onWithdraw 
}) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', { minimumFractionDigits: num % 1 !== 0 ? 2 : 0 })
  }

  return (
    <Card className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">My Wallet State</h3>
        <Badge variant="success">ACTIVE</Badge>
      </div>
      
      <div className="space-y-3">
        <StatRow
          label="Active Stake"
          value={formatNumber(data.activeStake)}
          suffix="KOLS"
          suffixColor="cyan"
        />
        
        <StatRow
          label="My Share"
          value={`${data.myShare}%`}
          valueColor="cyan"
        />
        
        <StatRow
          label="Pending Unstake"
          value={formatNumber(data.pendingUnstake)}
          suffix="KOLS"
          suffixColor="cyan"
        />
        
        <div className="flex justify-between items-center py-3.5 px-4 bg-[#111111] rounded-xl">
          <span className="text-gray-400 text-sm">Unlock Time</span>
          <span className="text-gray-500">-</span>
        </div>
        
        <StatRow
          label="Withdrawable Rewards"
          value={formatNumber(data.withdrawableRewards)}
          suffix="USDT"
          suffixColor="cyan"
        />
        
        <StatRow
          label="Total Earnings"
          value={formatNumber(data.totalEarnings)}
          suffix="USDT"
          suffixColor="cyan"
        />
      </div>
      
      <div className="mt-6">
        <Button 
          variant="secondary" 
          fullWidth
          onClick={onWithdraw}
          className="bg-[#2a2a2a]/50 hover:bg-[#2a2a2a] text-gray-400"
        >
          Net amount after 2% fee (Actual amount you receive)
        </Button>
      </div>
    </Card>
  )
}

