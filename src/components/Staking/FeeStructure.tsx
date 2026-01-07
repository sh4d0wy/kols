import React from 'react'
import { Card } from '../ui/Card'
import { StatRow } from '../ui/StatRow'

interface FeeStructureData {
  contractBalance: number
  totalWithdrawals: number
  redistributionFee: number
  insuranceFee: number
}

interface FeeStructureProps {
  data?: FeeStructureData
}

const defaultData: FeeStructureData = {
  contractBalance: 12456,
  totalWithdrawals: 489234,
  redistributionFee: 9872,
  insuranceFee: 1097
}

export const FeeStructure: React.FC<FeeStructureProps> = ({ data = defaultData }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US')
  }

  return (
    <Card className="p-6">
      <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">
        Fee Structure & Pool Status
      </h3>

      <div className="space-y-3">
        <StatRow
          label="Contract USDT Balance"
          value={formatNumber(data.contractBalance)}
          suffix="USDT"
          suffixColor="cyan"
        />
        <StatRow
          label="Total User Net Withdrawals"
          value={formatNumber(data.totalWithdrawals)}
          suffix="USDT"
          suffixColor="cyan"
        />
        <StatRow
          label="Redistribution Fee (1.8%) Total"
          value={formatNumber(data.redistributionFee)}
          suffix="USDT"
          suffixColor="cyan"
        />
        <StatRow
          label="Insurance Fee (0.2%) Total"
          value={formatNumber(data.insuranceFee)}
          suffix="USDT"
          suffixColor="cyan"
        />
      </div>
    </Card>
  )
}

