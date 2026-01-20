import React, { useEffect, useMemo, useState } from 'react'
import { Card, Button } from '../ui'
import { use7KolsUserQuery } from '@/hooks/7kols/queries/use7kolsUserQuery'
import { useGetLastjoined } from '@/hooks/7kols/queries/useGetLastjoined'
import { useSearchParams } from 'react-router-dom'
import { isAddress, ZeroAddress } from 'ethers'
import { toast } from 'react-toastify'
import { useGetClaimableRewards } from '@/hooks/7kols/queries/useGetClaimableRewards'
import { useConnection } from 'wagmi'
import { useDepositMutation } from '@/hooks/7kols/mutation/useDepositMutation'
import { ClipLoader } from 'react-spinners'
import useSevenKolsStore from '@/store/sevenkolsstore'

export const JoinStructure: React.FC = () => {
  const [searchParams] = useSearchParams()
  const connection = useConnection()
  const {data:lastjoinedData} = useGetLastjoined()
  const {data:userData, isLoading: isLoadingUserData} = use7KolsUserQuery()
  const [referrerAddress, setReferrerAddress] = useState('')
  const {data:claimableRewardsData} = useGetClaimableRewards()
  const {depositMutation} = useDepositMutation()
  const {message} = useSevenKolsStore()

  const claimableRewards = useMemo(() => {
    return claimableRewardsData ? claimableRewardsData : '0'
  }, [claimableRewardsData])

  useEffect(() => {
    const refParam = searchParams.get('ref')
    if (userData?.referrer && userData.referrer !== ZeroAddress) {
      setReferrerAddress(userData.referrer)
    }else if (refParam) {
      if(!isAddress(refParam)) {
        toast.error('Invalid referrer address')
        return
      }
      setReferrerAddress(refParam)
    }else{
      setReferrerAddress('')
    }
  }, [searchParams, userData?.referrer,connection.address])

  const handleJoin = () => {
    depositMutation.mutate({referrerAddress: referrerAddress ?? '', isActive: userData?.registered ?? false})
  }

  const handleLoadLastJoinedUser = () => {
    setReferrerAddress(lastjoinedData as string)
  }

  const handleResetReferrer = () => {
    setReferrerAddress('')
  }

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/kols?ref=${connection.address}`)
    toast.success('Invite link copied to clipboard')
  }
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">7 USDT Join & Structure Update</h3>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <p className="text-gray-500 text-sm">Claimable rewards: {claimableRewards ? claimableRewards : '0'} USDT</p>
      </div>

      <div className="space-y-4">
        
        {!userData?.registered && <>
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
            onClick={handleLoadLastJoinedUser}
            className="text-[#00FFD1] text-sm cursor-pointer hover:text-[#00FFD1] transition-colors underline"
          >
            Load last joined user
          </button>
          <button 
            onClick={handleResetReferrer}
            className="text-emerald-400 text-sm cursor-pointer hover:text-emerald-300 transition-colors"
          >
            Reset referrer
          </button>
        </div>
        </>
}

        <div className={`flex gap-3 pt-2 ${!userData?.registered ? 'flex-row' : 'flex-col mt-6'}`}>
          <div className="flex flex-col gap-2 flex-1">
          <Button 
            onClick={handleJoin}
            className="flex-1 disabled:opacity-50 max-h-12 disabled:cursor-not-allowed"
            disabled={isLoadingUserData || depositMutation.isPending || !referrerAddress}
          >
            {
              userData?.registered ? depositMutation.isPending ? <>
                Depositing and Claiming...{' '}
                <ClipLoader color="white" size={16} loading={depositMutation.isPending} />
              </>:'Deposit 7 USDT & Claim'
              :depositMutation.isPending ? <>
                Joining...{' '}
                <ClipLoader color="white" size={16} loading={depositMutation.isPending} />
              </>:'Join 7 USDT'
            }
          </Button>
          {depositMutation.isPending && <p className="text-gray-500 text-sm">{message}</p>}
          </div>
          <Button 
            variant="outline"
            onClick={handleCopyInviteLink}
            className="flex-1 max-h-12 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!userData?.registered}
          >
            Copy my invite link
          </Button>
        </div>
      </div>
    </Card>
  )
}

