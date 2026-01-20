import React, { useState } from 'react'
import { Card, Button } from '../ui'

interface NFT {
  id: string
  name: string
  price: number
  image: 'gold' | 'silver' | 'physical'
  isNew?: boolean
  tag?: string
}

interface MyNFTsProps {
  nfts: NFT[]
  onListForSale: (id: string) => void
}

const NFTCard: React.FC<{ nft: NFT; onListForSale: (id: string) => void }> = ({ nft, onListForSale }) => {
  const renderBadgeImage = () => {
    if (nft.image === 'gold') {
      return (
        <div className="w-full aspect-square bg-gradient-to-br from-amber-600/30 to-amber-900/30 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 to-transparent" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
            <div className="w-16 h-16 rounded-full border-2 border-amber-300/50 flex items-center justify-center">
              <span className="text-amber-900 font-bold text-xs">NFT</span>
            </div>
          </div>
        </div>
      )
    }
    if (nft.image === 'silver') {
      return (
        <div className="w-full aspect-square bg-gradient-to-br from-slate-600/30 to-slate-900/30 rounded-xl flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-transparent" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-500/30">
            <div className="w-16 h-16 rounded-full border-2 border-slate-200/50 flex items-center justify-center">
              <span className="text-slate-800 font-bold text-xs">NFT</span>
            </div>
          </div>
        </div>
      )
    }
    // Physical badge
    return (
      <div className="w-full aspect-square bg-gradient-to-br from-gray-700/30 to-gray-900/30 rounded-xl flex items-center justify-center relative overflow-hidden">
        <div className="w-24 h-28 bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg flex flex-col items-center justify-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center mb-1">
            <span className="text-white font-bold text-[10px]">NFT</span>
          </div>
          <span className="text-gray-800 text-[8px] font-bold uppercase tracking-wider">BADGE</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#111111] rounded-xl p-3 relative">
      {nft.isNew && (
        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          new
        </span>
      )}
      {nft.tag && (
        <span className="absolute top-2 left-2 bg-cyan-500/20 text-[#00FFD1] text-[10px] font-medium px-2 py-0.5 rounded-full z-10">
          {nft.tag}
        </span>
      )}
      
      {renderBadgeImage()}
      
      <div className="mt-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white text-sm font-medium">{nft.name}</span>
          <span className="text-[#00FFD1] font-semibold">{nft.price} USDT</span>
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

export const MyNFTs: React.FC<MyNFTsProps> = ({ nfts, onListForSale }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'create'>('single')

  return (
    <Card className="p-6">
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

      {/* NFT Grid */}
      <div className="grid grid-cols-2 gap-4">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} nft={nft} onListForSale={onListForSale} />
        ))}
      </div>
    </Card>
  )
}

