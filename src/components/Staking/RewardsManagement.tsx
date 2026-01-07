import React from 'react'
import { Card } from '../ui/Card'
import { ActionButton } from './ActionButton'

const GiftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
)

const HourglassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 22h14" />
    <path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
)

const WalletIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
)

const BoltIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const RewardsBadgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
)

interface RewardsManagementProps {
  onClaimRewards?: () => void
  onRequestUnstake?: () => void
  onWithdrawUnstaked?: () => void
  onClaimAndUnstake?: () => void
}

export const RewardsManagement: React.FC<RewardsManagementProps> = ({
  onClaimRewards,
  onRequestUnstake,
  onWithdrawUnstaked,
  onClaimAndUnstake
}) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">Rewards Management</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400">
          <RewardsBadgeIcon />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ActionButton
          icon={<GiftIcon />}
          label="Claim Rewards"
          description="Withdraw 127.84 USDT to your wallet"
          variant="primary"
          onClick={onClaimRewards}
        />
        <ActionButton
          icon={<HourglassIcon />}
          label="Request Unstake"
          description="Move stake into 7-day pending period"
          variant="outline"
          onClick={onRequestUnstake}
        />
        <ActionButton
          icon={<WalletIcon />}
          label="Withdraw Unstaked"
          description="Available after 7-day lockup period"
          variant="outline"
          onClick={onWithdrawUnstaked}
        />
        <ActionButton
          icon={<BoltIcon />}
          label="Claim + Unstake"
          description="Combined action in single transaction"
          variant="dark"
          onClick={onClaimAndUnstake}
        />
      </div>
    </Card>
  )
}

