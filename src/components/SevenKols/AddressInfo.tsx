import React, { useState } from 'react'
import { Card } from '../ui'
import { useGetAddressQuery } from '@/hooks/7kols/queries/useGetAddressQuery'

const AddressRow: React.FC<{ label: string; address: string; color: 'cyan' | 'purple' | 'green' }> = ({ 
  label, 
  address, 
  color   
}) => {
  const [copied, setCopied] = useState(false)

  const colorStyles = {
    cyan: 'text-[#00FFD1]',
    purple: 'text-purple-400',
    green: 'text-emerald-400',
  }
  const truncateAddress = (addr: string) => {
    if (addr.length <= 14) return addr
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }
  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex justify-between items-center py-3.5 px-4 bg-[#111111] rounded-xl">
      <span className="text-gray-400 text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`font-mono text-sm ${colorStyles[color]}`}>{truncateAddress(address)}</span>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-white/5 rounded-lg transition-colors"
          title={copied ? 'Copied!' : 'Copy address'}
        >
          {copied ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="#6B7280" strokeWidth="2"/>
              <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="#6B7280" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

export const AddressInfo: React.FC = () => {
  const {data: addressInfo} = useGetAddressQuery();
  return (
    <Card className="p-6">
      <h3 className="text-white font-semibold text-lg mb-4">
        Address Info - USDT / Treasury / Fee wallet
      </h3>

      <div className="space-y-2">
        <AddressRow label="USDT Token" address={addressInfo?.usdtToken??''} color="cyan" />
        <AddressRow label="Treasury" address={addressInfo?.treasuryWallet??''} color="purple" />
        <AddressRow label="Fee wallet" address={addressInfo?.feeWallet??''} color="green" />
      </div>
    </Card>
  )
}

