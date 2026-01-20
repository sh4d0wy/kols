import React from 'react'
import { Card, Button } from '../ui'

interface GenerateNFTsData {
  totalGenerated: number
  pendingMint: number
  generationFee: number
  nextGeneration: number
}

interface GenerateNFTsProps {
  data: GenerateNFTsData
  onGenerate: () => void
}

export const GenerateNFTs: React.FC<GenerateNFTsProps> = ({ data, onGenerate }) => {
  const stats = [
    {
      label: 'TOTAL GENERATED',
      value: data.totalGenerated.toLocaleString(),
      sublabel: 'BADGES CREATED',
    },
    {
      label: 'PENDING MINT',
      value: data.pendingMint.toString(),
      sublabel: 'AWAITING MINTING',
      valueColor: 'text-purple-400',
    },
    {
      label: 'GENERATION FEE',
      value: data.generationFee.toString(),
      suffix: 'USDT',
      sublabel: 'PER BADGE',
      valueColor: 'text-[#00FFD1]',
    },
    {
      label: 'NEXT GENERATION',
      value: data.nextGeneration.toString(),
      sublabel: 'BATCH READY',
      valueColor: 'text-purple-400',
    },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Generate NFTs</h3>
            <p className="text-gray-500 text-sm">Create and generate new participation badges</p>
          </div>
        </div>
        <Button onClick={onGenerate}>
          Generate New Badge
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-[#111111] rounded-xl p-4">
            <span className="text-gray-500 text-xs uppercase tracking-wider">{stat.label}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className={`text-2xl font-bold ${stat.valueColor || 'text-white'}`}>
                {stat.value}
              </span>
              {stat.suffix && (
                <span className="text-[#00FFD1] font-semibold">{stat.suffix}</span>
              )}
            </div>
            <span className="text-gray-600 text-xs">{stat.sublabel}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

