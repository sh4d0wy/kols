import React, { useState } from 'react'
import { Card, Button } from '../ui'

interface ContractAddress {
  label: string
  address: string
}

interface ContractInformationProps {
  contracts: ContractAddress[]
}

const AddressCard: React.FC<{ label: string; address: string }> = ({ label, address }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#111111] rounded-xl p-4">
      <span className="text-gray-500 text-xs uppercase tracking-wider block mb-2">{label}</span>
      <p className="text-white font-mono text-sm mb-3 truncate">{address}</p>
      <Button 
        variant="outline" 
        size="sm" 
        fullWidth 
        onClick={handleCopy}
        className="gap-2"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {copied ? (
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" strokeWidth="2"/>
            </>
          )}
        </svg>
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  )
}

export const ContractInformation: React.FC<ContractInformationProps> = ({ contracts }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="3" stroke="#00F5D4" strokeWidth="2"/>
            <path d="M19.4 15C19.7837 14.0883 19.9966 13.0654 20 12C20 7.58172 16.4183 4 12 4C10.9346 4.00344 9.91169 4.21633 9 4.6" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round"/>
            <path d="M4.6 9C4.21633 9.91169 4.00344 10.9346 4 12C4 16.4183 7.58172 20 12 20C13.0654 19.9966 14.0883 19.7837 15 19.4" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round"/>
            <path d="M16 8L18 6L20 8" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 16L6 18L4 16" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Contract Information</h3>
          <p className="text-gray-500 text-sm">NFT Marketplace / USDT contract addresses on BSC Testnet</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contracts.map((contract, index) => (
          <AddressCard key={index} label={contract.label} address={contract.address} />
        ))}
      </div>
    </Card>
  )
}

