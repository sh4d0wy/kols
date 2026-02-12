import React, { useMemo }  from 'react'
import { useConnection } from 'wagmi'
import { motion } from 'motion/react'
import useUserNftDataQuery from '@/hooks/nftbadge/queries/useUserNftDataQuery'
import { Link } from 'react-router-dom'
import { ExternalLinkIcon } from 'lucide-react'
interface NFTPageHeaderProps {
  nftToken: string
}

export const NFTPageHeader: React.FC<NFTPageHeaderProps> = ({
  nftToken,
}) => {
  //get current network from wagmi
  const connection = useConnection()
  const network = connection.chain?.name
  const {data: userNftBadgeData} = useUserNftDataQuery()
  const claimable = useMemo(()=>{
    return userNftBadgeData ? userNftBadgeData.claimableNftBadges : 0
  }, [userNftBadgeData])

  return (
    <motion.div className="mt-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
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
          <p className="text-[#00FFD1] font-semibold mt-1">{network?.toUpperCase()}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">CLAIMABLE BADGES</span>
          <p className="text-purple-400 font-semibold text-2xl mt-1">{claimable}</p>
        </div>
        <div className="bg-[#0D0D0D] border border-[#1a1a1a] rounded-xl p-4">
          <span className="text-gray-500 text-xs uppercase tracking-wider">NFT TOKEN</span>
          <div className="flex items-center gap-2">
          <p className="text-[#00FFD1] font-semibold mt-1">{nftToken.slice(0, 10)}....{nftToken.slice(-10)}</p>
          <Link to={`https://testnet.bscscan.com/address/${nftToken}`} target="_blank" className="text-gray-500 text-xs uppercase tracking-wider cursor-pointer">
          <ExternalLinkIcon className="w-4 h-4 text-[#00FFD1]" />
        </Link>
        </div>
        </div>
        
      </div>
    </motion.div>
  )
}

