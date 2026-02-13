import React, { useState, useMemo } from 'react'
import { Card, Button } from '../ui'
import { useNftsHoldingQuery } from '@/hooks/nftbadge/queries/useNftsHoldingQuery'
import type { NFTMetadata } from '@/types/NftMarketplace/nfttype'
import { Loader2, ChevronDown } from 'lucide-react'
import { useListSingleNftMutation } from '@/hooks/nftbadge/mutations/useListSingleNftMutation'
import { useGetFeeQuery } from '@/hooks/nftbadge/queries/useGetFeeQuery'


const NFTCard: React.FC<{ nft: NFTMetadata; onListForSale: (nftId: string) => void }> = ({ nft, onListForSale }) => {
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
          onClick={() => onListForSale(nft.id)}
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
  const {data: feeData, isLoading: feeLoading} = useGetFeeQuery()
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

  const handleSingleNftClick = (nftId: string) => {
    setSelectedNftId(nftId);
    setIsDropdownOpen(false);
    setListingPrice('');
    setActiveTab('create');
  }

  const calculatedFee = useMemo(() => {
    if (!feeData || !listingPrice) return 0
    console.log("feeData", feeData)
    console.log("listingPrice", listingPrice)
    console.log("calculatedFee", (parseFloat(listingPrice) * feeData.fee)/100)
    return (parseFloat(listingPrice) * feeData.fee)/100
  }, [feeData, listingPrice]);

  const calculatedAmount = useMemo(() => {
    if (!feeData || !listingPrice) return 0
    return parseFloat(listingPrice) - calculatedFee
  }, [feeData, listingPrice, calculatedFee]);

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
          <NFTCard key={nft.id} nft={nft} onListForSale={handleSingleNftClick} />
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
            <div className="w-full h-[50%] flex items-start justify-center mt-2">
            <div className="space-y-5 w-full border border-[#2a2a2a] rounded-xl p-8">
              {/* NFT Dropdown */}
              <div>
                <label className="block text-white text-sm mb-2">Select NFT</label>
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
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <span className="text-white text-xl">{selectedNft.name}</span>
                        <span className="text-[#00FFD1] text-xl">#{selectedNft.id}</span>
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xl">Select an NFT to list</span>
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
                          <span className="text-white text-xl">{nft.name}</span>
                          <span className="text-[#00FFD1] text-xl">#{nft.id}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Price Input */}
              <div>
                <label className="block text-white text-sm mb-2">Price (USDT)</label>
                <div className="relative">  
                <input
                  type="number"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  placeholder="Enter price"
                  className="w-full text-2xl bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <img src="https://www.freelogovectors.net/wp-content/uploads/2021/10/usdt-tether-logo-freelogovectors.net_-400x400.png" alt="USDT" className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-white text-xl font-medium">USDT</span>
                </div>
                </div>
              </div>
              {/*Fee Details*/}
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/50 text-lg">Estimated Fee:</span>
                  <div className="flex items-center gap-2">
                  <span className="text-white text-lg">{calculatedFee}</span>
                  <span className="text-white/50 text-lg">USDT</span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/50 text-lg">You will receive:</span>
                  <div className="flex items-center gap-2">
                  <span className="text-white text-lg">{calculatedAmount}</span>
                  <span className="text-white/50 text-lg">USDT</span>
                  </div>
                </div>
              </div>
              {/* List Button */}
              <Button
                fullWidth
                onClick={handleListNft}
                disabled={isListingPending || !selectedNftId || !listingPrice || parseFloat(listingPrice) <= 0}
                className="disabled:opacity-50 disabled:cursor-not-allowed text-lg! font-semibold! rounded-xl!"
              >
                {isListingPending ? listingMessage : 'List NFT For Sale'}
              </Button>
            </div>
            </div>
          )}
        </>
      )}
    </Card>
  )
}

