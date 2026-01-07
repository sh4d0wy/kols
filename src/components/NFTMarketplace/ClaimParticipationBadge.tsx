import React from 'react'
import { Card, Button } from '../ui'

interface ClaimParticipationBadgeData {
  totalParticipation: number
  alreadyMinted: number
  claimableAmount: number
}

interface ClaimParticipationBadgeProps {
  data: ClaimParticipationBadgeData
  onMint: () => void
}

export const ClaimParticipationBadge: React.FC<ClaimParticipationBadgeProps> = ({ data, onMint }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Claim Participation Badge (NFT Mint)</h3>
            <p className="text-gray-500 text-sm">Based on KOLS UniLevel Participation</p>
          </div>
        </div>
        <Button 
          onClick={onMint}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
        >
          Mint Claimable Badges
        </Button>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        Participation count is calculated from UniLevel Total deposit / 7 USDT. Any un-issued badge NFTs can be minted at once.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-[#111111] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">TOTAL PARTICIPATION (UNILEVEL)</span>
          <p className="text-white text-2xl font-bold mt-1">{data.totalParticipation}</p>
        </div>
        <div className="bg-[#111111] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">ALREADY MINTED NFTS</span>
          <p className="text-emerald-400 text-2xl font-bold mt-1">{data.alreadyMinted}</p>
        </div>
        <div className="bg-[#111111] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">CLAIMABLE NFT AMOUNT</span>
          <p className="text-purple-400 text-2xl font-bold mt-1">{data.claimableAmount}</p>
        </div>
      </div>

      {/* Warning Notice */}
      <div className="flex items-center gap-2 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-400 flex-shrink-0">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
        <span className="text-amber-400 text-sm">
          Badge minting does not work if UniLevel507 contract address is not set.
        </span>
      </div>
    </Card>
  )
}

