import { USDT_CONTRACT_ADDRESS } from "@/utils/usdtData";
import { Card } from "../ui/Card";
import { useState } from "react";
import { KOLS_CONTRACT_ADDRESS } from "@/utils/kolsdata";
import { STAKING_CONTRACT_ADDRESS } from "@/utils/stakingcontractdata";

  
  const AddressRow: React.FC<{ label: string; address: string; color: 'cyan' | 'purple' | 'green' }> = ({ 
    label, 
    address, 
    color 
  }) => {
    const [copied, setCopied] = useState(false)
  
    const colorStyles = {
      cyan: 'text-cyan-400',
      purple: 'text-purple-400',
      green: 'text-emerald-400',
    }
  
    const handleCopy = () => {
      navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  
    const truncateAddress = (addr: string) => {
      if (addr.length <= 14) return addr
      return `${addr.slice(0, 6)}...${addr.slice(-4)}`
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
  
  export const AddressInfoCard: React.FC = () => {
    return (
      <Card className="p-6 h-full">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-6">
          Address Info - USDT / KOLS / Staking Contract
        </h3>
  
        <div className="space-y-3">
          <AddressRow label="USDT Token" address={USDT_CONTRACT_ADDRESS} color="cyan" />
          <AddressRow label="KOLS Token" address={KOLS_CONTRACT_ADDRESS} color="purple" />
          <AddressRow label="Staking Contract" address={STAKING_CONTRACT_ADDRESS} color="green" />
        </div>
      </Card>
    )
  }
  