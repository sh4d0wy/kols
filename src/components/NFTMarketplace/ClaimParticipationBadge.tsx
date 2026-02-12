import React, { useMemo } from 'react'
import { Card, Button } from '../ui'
import useUserNftDataQuery from '@/hooks/nftbadge/queries/useUserNftDataQuery'
import { useClaimNftMutation } from '@/hooks/nftbadge/mutations/useClaimNftMutation'
import { ClipLoader } from 'react-spinners'

export const ClaimParticipationBadge: React.FC = () => {
  const {data: userNftBadgeData} = useUserNftDataQuery()
  const {claimNftMutation} = useClaimNftMutation()
  const userData = useMemo(()=>{
    return userNftBadgeData ? {
      totalParticipation: userNftBadgeData.totalParticipation,
      alreadyMinted: userNftBadgeData.alreadyMinted,
      claimableAmount: userNftBadgeData.claimableNftBadges,
    } : null
  }, [userNftBadgeData])

  const handleMint = () => {
    claimNftMutation.mutate()
  }
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
          onClick={handleMint}
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={claimNftMutation.isPending || userData?.claimableAmount === 0}
        >
          {claimNftMutation.isPending ? <>
            Minting NFTs...{' '}
            <ClipLoader color="white" size={16} loading={claimNftMutation.isPending} />
          </> : userData?.claimableAmount === 0 ? 'No Claimable Badges' : 'Mint Claimable Badges'}
        </Button>
      </div>

      <p className="text-gray-400 text-sm mb-6">
        Participation count is calculated from UniLevel Total deposit / 7 USDT. Any un-issued badge NFTs can be minted at once.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-[#111111] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">TOTAL PARTICIPATION (UNILEVEL)</span>
          <p className="text-white text-2xl font-bold mt-1">{userData?.totalParticipation}</p>
        </div>
        <div className="bg-[#111111] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">ALREADY MINTED NFTS</span>
          <p className="text-emerald-400 text-2xl font-bold mt-1">{userData?.alreadyMinted}</p>
        </div>
        <div className="bg-[#111111] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">CLAIMABLE NFT AMOUNT</span>
          <p className="text-purple-400 text-2xl font-bold mt-1">{userData?.claimableAmount}</p>
        </div>
      </div>
    </Card>
  )
}

