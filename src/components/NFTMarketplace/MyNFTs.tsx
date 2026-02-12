import React, { useState, useMemo } from 'react'
import { Card, Button } from '../ui'
import { useNftsHoldingQuery } from '@/hooks/nftbadge/queries/useNftsHoldingQuery'
import type { NFTMetadata } from '@/types/NftMarketplace/nfttype'
import { Loader2, ChevronDown } from 'lucide-react'
import { useListSingleNftMutation } from '@/hooks/nftbadge/mutations/useListSingleNftMutation'


const NFTCard: React.FC<{ nft: NFTMetadata; onListForSale: () => void }> = ({ nft, onListForSale }) => {
  const renderBadgeImage = (image: string) => {
    return (
    <div className="w-full aspect-square bg-gradient-to-br from-slate-600/30 to-slate-900/30 rounded-xl flex items-center justify-center relative overflow-hidden">
      <img src={image} alt={nft.description} className="w-full h-full object-cover rounded-xl" />
    </div>
    )}

  return (
    <div className="bg-[#111111] rounded-xl p-3 relative">
      
      {renderBadgeImage(nft.image)}
      
      <div className="mt-3">
        <div className="flex items-center justify-start mb-2">
          <span className="text-white text-sm font-medium">{nft.name + " - "}</span>
          <span className="text-[#00FFD1] text-lg">#{nft.id}</span>
        </div>
        <Button 
          size="sm" 
          fullWidth 
          onClick={onListForSale}
        >
          List for Sale
        </Button>
      </div>
    </div>
  )
}

export const MyNFTs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'single' | 'create'>('single')
  const {data: nftsHolding, isLoading: nftsHoldingLoading} = useNftsHoldingQuery()
  
  // Create listing state
  const [selectedNftId, setSelectedNftId] = useState<string>('')
  const [listingPrice, setListingPrice] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  const { mutate: listNft, isPending: isListingPending, message: listingMessage } = useListSingleNftMutation()
  
  const selectedNft = useMemo(() => {
    if (!nftsHolding || !selectedNftId) return null
    return nftsHolding.find((nft: NFTMetadata) => nft.id === selectedNftId)
  }, [nftsHolding, selectedNftId])
  
  const handleListNft = () => {
    if (!selectedNftId || !listingPrice) return
    listNft({ tokenId: selectedNftId, price: parseFloat(listingPrice) }, {
      onSuccess: () => {
        setSelectedNftId('')
        setListingPrice('')
      }
    })
  }

  return (
    <Card className="p-6 max-h-[1000px] overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="#00F5D4" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="#00F5D4" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="#00F5D4" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="#00F5D4" strokeWidth="2"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">My NFTs</h3>
          <p className="text-gray-500 text-sm">Preview all the NFTs owned by your wallet using ERC721Enumerable</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('single')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'single'
              ? 'bg-primary-gradient text-[#0D0D0D]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          ✓ Single Sale
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'create'
              ? 'bg-primary-gradient text-[#0D0D0D]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          ○ Create Listing
        </button>
      </div>
      {activeTab === 'single' && (
        <>
        {nftsHoldingLoading && (
        <div className="flex items-center w-full h-[calc(100%-200px)] justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      )}
        {!nftsHoldingLoading && nftsHolding?.length === 0 && (
          <div className="flex items-center w-full h-[calc(100%-200px)] justify-center">
            <p className="text-white text-lg">No NFTs found</p>
          </div>
        )}
      {/* NFT Grid */}
      <div className="grid grid-cols-2 gap-4">
        
        {nftsHolding?.map((nft) => (
          <NFTCard key={nft.id} nft={nft} onListForSale={() => {}} />
        ))}
      </div>
        </>
      )}
      {activeTab === 'create' && (
        <>
          {nftsHoldingLoading && (
            <div className="flex items-center w-full h-[calc(100%-200px)] justify-center">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          )}
          {!nftsHoldingLoading && nftsHolding?.length === 0 && (
            <div className="flex items-center w-full h-[calc(100%-200px)] justify-center">
              <p className="text-white text-lg">No NFTs found</p>
            </div>
          )}
          {!nftsHoldingLoading && nftsHolding && nftsHolding.length > 0 && (
            <div className="space-y-4">
              {/* NFT Dropdown */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Select NFT</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-left flex items-center justify-between hover:border-cyan-500/50 transition-all duration-200"
                  >
                    {selectedNft ? (
                      <div className="flex items-center gap-3">
                        <img 
                          src={selectedNft.image} 
                          alt={selectedNft.name} 
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <span className="text-white">{selectedNft.name}</span>
                        <span className="text-[#00FFD1]">#{selectedNft.id}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Select an NFT to list</span>
                    )}
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-[#111111] border border-[#2a2a2a] rounded-xl overflow-hidden max-h-[200px] overflow-y-auto">
                      {nftsHolding.map((nft: NFTMetadata) => (
                        <button
                          key={nft.id}
                          type="button"
                          onClick={() => {
                            setSelectedNftId(nft.id)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors ${
                            selectedNftId === nft.id ? 'bg-[#1a1a1a]' : ''
                          }`}
                        >
                          <img 
                            src={nft.image} 
                            alt={nft.name} 
                            className="w-8 h-8 rounded-lg object-cover"
                          />
                          <span className="text-white">{nft.name}</span>
                          <span className="text-[#00FFD1]">#{nft.id}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Price Input */}
              <div>
                <label className="block text-gray-400 text-sm mb-2">Price (USDT)</label>
                <input
                  type="number"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
                />
              </div>
              
              {/* List Button */}
              <Button
                fullWidth
                onClick={handleListNft}
                disabled={isListingPending || !selectedNftId || !listingPrice || parseFloat(listingPrice) <= 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isListingPending ? listingMessage : 'List NFT For Sale'}
              </Button>
            </div>
          )}
        </>
      )}
    </Card>
  )
}

