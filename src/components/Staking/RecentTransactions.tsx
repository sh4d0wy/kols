import React from 'react'
import { Card } from '../ui/Card'
import { TransactionItem } from './TransactionItem'

interface Transaction {
  id: string
  type: 'reward' | 'stake'
  title: string
  subtitle: string
  amount: string
  currency: string
  timestamp: string
  positive?: boolean
}

interface RecentTransactionsProps {
  transactions?: Transaction[]
}

const DollarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)

const defaultTransactions: Transaction[] = [
  {
    id: '1',
    type: 'reward',
    title: 'Reward Claimed',
    subtitle: 'Transaction successful',
    amount: '45.67',
    currency: 'USDT',
    timestamp: '2 hours ago',
    positive: true
  },
  {
    id: '2',
    type: 'stake',
    title: 'Staked KOLS',
    subtitle: 'Added to active stake',
    amount: '500',
    currency: 'KOLS',
    timestamp: '1 day ago',
    positive: false
  },
  {
    id: '3',
    type: 'reward',
    title: 'Reward Claimed',
    subtitle: 'Transaction successful',
    amount: '82.14',
    currency: 'USDT',
    timestamp: '3 days ago',
    positive: true
  },
  {
    id: '4',
    type: 'stake',
    title: 'Staked KOLS',
    subtitle: 'Added to active stake',
    amount: '1,950',
    currency: 'KOLS',
    timestamp: '6 days ago',
    positive: false
  }
]

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions = defaultTransactions
}) => {
  return (
    <Card className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">Recent Transactions</h3>
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400">
          <DollarIcon />
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <TransactionItem
            key={tx.id}
            type={tx.type}
            title={tx.title}
            subtitle={tx.subtitle}
            amount={tx.amount}
            currency={tx.currency}
            timestamp={tx.timestamp}
            positive={tx.positive}
          />
        ))}
      </div>
    </Card>
  )
}

