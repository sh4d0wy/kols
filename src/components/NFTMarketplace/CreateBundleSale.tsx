import React, { useMemo, useState } from 'react'
import { Card, Button } from '../ui'
import { useNftsHoldingQuery } from '@/hooks/nftbadge/queries/useNftsHoldingQuery'
import type { NFTMetadata } from '@/types/NftMarketplace/nfttype'
import { useCreateBundleMutation } from '@/hooks/nftbadge/mutations/useCreateBundleMutation'
import useNftMarketPlaceStore from '@/store/nftMarketPlaceStore'

export const CreateBundleSale: React.FC = () => {
  const [bundlePrice, setBundlePrice] = useState('')
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([])

  const handleNFTToggle = (id: string) => {
    setSelectedNFTs(prev => 
      prev.includes(id) 
        ? prev.filter(nftId => nftId !== id)
        : [...prev, id]
    )
  }

  const {data:userNftsHolding} = useNftsHoldingQuery();
  const userNfts = useMemo(() => {
    if(!userNftsHolding) return [];
    return userNftsHolding as NFTMetadata[];
  }, [userNftsHolding, selectedNFTs]);

  const {mutate: createBundle, isPending: createBundleLoading} = useCreateBundleMutation();
  const {message} = useNftMarketPlaceStore();

  const handleSubmit = () => {
    createBundle({nfts: selectedNFTs, price: parseFloat(bundlePrice)});
  }
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 9.4L7.5 4.21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 16V8C20.9996 7.6493 20.9071 7.3048 20.7315 7.00017C20.556 6.69555 20.3037 6.44158 20 6.264L13 2.264C12.696 2.08624 12.3511 1.99292 12 1.99292C11.6489 1.99292 11.304 2.08624 11 2.264L4 6.264C3.69626 6.44158 3.44398 6.69555 3.26846 7.00017C3.09294 7.3048 3.00036 7.6493 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9998C3.44398 17.3044 3.69626 17.5584 4 17.736L11 21.736C11.304 21.9138 11.6489 22.0071 12 22.0071C12.3511 22.0071 12.696 21.9138 13 21.736L20 17.736C20.3037 17.5584 20.556 17.3044 20.7315 16.9998C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 22.08V12" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Create Bundle Sale</h3>
            <p className="text-gray-500 text-sm">Package multiple NFTs together with special pricing</p>
          </div>
        </div>
      </div>

     

      <div className="mb-6 max-h-[300px] overflow-y-auto">
        <label className="block text-gray-400 text-sm mb-3">Select NFTs for Bundle</label>
        <div className="space-y-2">
          {userNfts.length === 0 && (
            <div className="text-white text-sm">No NFTs found</div>
          )}
          {userNfts.map((nft) => (
            <div 
              key={nft.id}
              onClick={() => handleNFTToggle(nft.id)}
              className="flex items-center gap-3 p-3 bg-[#111111] rounded-xl cursor-pointer hover:bg-[#161616] transition-colors"
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                selectedNFTs.includes(nft.id) 
                  ? 'bg-[#00FFD1] border-[#00FFD1]' 
                  : 'bg-gray-800 border-gray-600'
              }`}>
                {selectedNFTs.includes(nft.id) && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L4 7L8 3" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <span className="text-white text-sm">{nft.name}</span>
              <span className="text-[#00FFD1] text-sm">#{nft.id}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Bundle Price (USDT)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"> 
          <input
            type="number"
            value={bundlePrice}
            onChange={(e) => setBundlePrice(e.target.value)}
            placeholder="Enter total price"
            className="w-full bg-[#111111] border border-[#2a2a2a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all duration-200"
          />
           <Button disabled={createBundleLoading || userNfts.length < 2 || parseFloat(bundlePrice) <= 0} onClick={handleSubmit} className="gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
          {createBundleLoading ? message : 'List Bundle For Sale'}
      </Button>
      </div>
        </div>
       
      </div>

      
    </Card>
  )
}

