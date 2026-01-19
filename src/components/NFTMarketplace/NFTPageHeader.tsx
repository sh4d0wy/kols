import React from 'react'
import { useConnection } from 'wagmi'

interface NFTPageHeaderProps {
  claimableBadges: number
  nftToken: string
}

export const NFTPageHeader: React.FC<NFTPageHeaderProps> = ({
  claimableBadges,
  nftToken,
}) => {
  //get current network from wagmi
  const connection = useConnection()
  const network = connection.chain?.name

  return (
    <div className="mt-6">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        <span className="text-primary-gradient">KOLS Participation NFT Badge</span>
      </h1>
      
      {/* Breadcrumb */}
      <p className="text-gray-500 text-sm mb-6">
        BSC Testnet {'>'} KTB NFT {'>'} Single Sale / Bundle Sales / Buy NFT
      </p>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">NETWORK</span>
          <p className="text-cyan-400 font-semibold mt-1">{network?.toUpperCase()}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">CLAIMABLE BADGES</span>
          <p className="text-purple-400 font-semibold text-2xl mt-1">{claimableBadges}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">NFT TOKEN</span>
          <p className="text-cyan-400 font-semibold mt-1">{nftToken}</p>
        </div>
      </div>
    </div>
  )
}

