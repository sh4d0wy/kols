import React, { useState } from 'react'
import { Card, Button } from '../ui'

interface JoinStructureProps {
  claimableStructureLevel: number
  onJoin: (referrerAddress: string) => void
  onCopyInviteLink: () => void
  onLoadLastJoinedUser: () => void
  onResetReferrer: () => void
}

export const JoinStructure: React.FC<JoinStructureProps> = ({
  claimableStructureLevel,
  onJoin,
  onCopyInviteLink,
  onLoadLastJoinedUser,
  onResetReferrer,
}) => {
  const [referrerAddress, setReferrerAddress] = useState('')

  const handleJoin = () => {
    onJoin(referrerAddress)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">7 USDT Join & Structure Update</h3>
          <p className="text-gray-500 text-sm">Claimable structure level: {claimableStructureLevel} USDT</p>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <p className="text-gray-500 text-sm">Claimable structure level: {claimableStructureLevel} USDT</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Referrer Address (Required for first join)</label>
          <input
            type="text"
            value={referrerAddress}
            onChange={(e) => setReferrerAddress(e.target.value)}
            placeholder="Enter referrer address"
            className="w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
          />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLoadLastJoinedUser}
            className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors underline"
          >
            Load last joined user
          </button>
          <button 
            onClick={onResetReferrer}
            className="text-emerald-400 text-sm hover:text-emerald-300 transition-colors"
          >
            Reset referrer
          </button>
        </div>

        <div className="flex gap-3 pt-2">
          <Button 
            onClick={handleJoin}
            className="flex-1"
          >
            JOIN 7 USDT
          </Button>
          <Button 
            variant="outline"
            onClick={onCopyInviteLink}
            className="flex-1"
          >
            Copy my invite link
          </Button>
        </div>
      </div>
    </Card>
  )
}

