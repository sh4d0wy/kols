import { Navbar } from '../../components/Navbar'
import {
  NFTPageHeader,
  GenerateNFTs,
  ClaimParticipationBadge,
  MyNFTs,
  SingleSales,
  BundleSales,
  CreateBundleSale,
  ContractInformation,
  NFTFooter,
} from '../../components/NFTMarketplace'

const NFTMarketplace = () => {
  const handleGenerateBadge = () => {
    console.log('Generating new badge')
  }

  const handleMintBadges = () => {
    console.log('Minting claimable badges')
  }

  const handleListForSale = (badgeId: string) => {
    console.log('Listing badge for sale:', badgeId)
  }

  const handleBuyNFT = (badgeId: string) => {
    console.log('Buying NFT:', badgeId)
  }

  const handleBuyBundle = (bundleId: string) => {
    console.log('Buying bundle:', bundleId)
  }

  const handleCreateBundle = (data: { name: string; price: number; nfts: string[]; discount: number }) => {
    console.log('Creating bundle:', data)
  }

  return (
    <div className="w-full bg-black max-h-screen">
      <div className="w-[80%] max-w-[1400px] mx-auto pb-10 relative">
        <Navbar className="z-30 relative"/>
        <div className="fixed flex items-center justify-center top-0 left-0 w-full h-screen bg-black/95 z-20">
          <div className="w-[600px] h-[300px] rounded-lg bg-[#0D0D0D] border border-[#1a1a1a] flex items-center justify-center px-5">
            <div className="text-white text-2xl gap-5 font-bold text-center flex flex-col items-center justify-center">
              <h1>Coming Soon</h1>
              <p className="text-gray-500 text-lg">The NFT Marketplace will be available soon.</p>
            </div>
          </div>
        </div>

        <NFTPageHeader
          claimableBadges={5}
          nftToken="ERC-721"
        />

        <div className="mt-6">
          <GenerateNFTs
            data={{
              totalGenerated: 1245,
              pendingMint: 28,
              generationFee: 0.1,
              nextGeneration: 42,
            }}
            onGenerate={handleGenerateBadge}
          />
        </div>

        <div className="mt-6">
          <ClaimParticipationBadge
            data={{
              totalParticipation: 12,
              alreadyMinted: 7,
              claimableAmount: 5,
            }}
            onMint={handleMintBadges}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <MyNFTs
            nfts={[
              { id: '002', name: 'Badge #002', price: 50, image: 'gold', isNew: true },
              { id: '003', name: 'Badge #003', price: 30, image: 'silver' },
              { id: '004', name: 'Badge #003', price: 100, image: 'physical', tag: 'Referen' },
            ]}
            onListForSale={handleListForSale}
          />
          
          <div className="space-y-6">
            <SingleSales
              listings={[
                { id: '001', name: 'Badge #001', price: 25, status: 'verified', seller: 'Verified' },
                { id: '002', name: 'Badge #002', price: 0, status: 'pending', seller: 'Pending' },
                { id: '003', name: 'Badge #003', price: 45, status: 'verified', seller: 'Verified' },
              ]}
              onBuy={handleBuyNFT}
            />
            
            <BundleSales
              bundles={[
                { id: 'elite', name: 'Elite Bundle', price: 180, discount: 20, count: 5, type: 'elite' },
                { id: 'starter', name: 'Starter Bundle', price: 90, discount: 10, count: 3, type: 'starter' },
              ]}
              onBuy={handleBuyBundle}
            />
          </div>
        </div>

        <div className="mt-6">
          <CreateBundleSale
            availableNFTs={[
              { id: '001', name: 'Badge #001', variant: 'Gold' },
              { id: '002', name: 'Badge #002', variant: 'Silver' },
              { id: '003', name: 'Badge #003', variant: 'Platinum' },
            ]}
            onCreateBundle={handleCreateBundle}
          />
        </div>

        <div className="mt-6">
          <ContractInformation />
        </div>
      </div>

      <NFTFooter />
    </div>
  )
}

export default NFTMarketplace
