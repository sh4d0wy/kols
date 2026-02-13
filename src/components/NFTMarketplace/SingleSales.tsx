import React, { useMemo, useRef, useState } from 'react'
import { Card, Button } from '../ui'
import { useGetSingleListings } from '@/hooks/nftbadge/queries/useGetSingleListings'
import { Loader2 } from 'lucide-react'
import { formatUnits } from 'ethers'
import type { NFTListing } from '@/types/NftMarketplace/nfttype'
import { useBuyNftBadge } from '@/hooks/nftbadge/mutations/useBuyNftBadge'


export const SingleSales: React.FC = () => {
  const {data: listingsData, isLoading: listingsLoading} = useGetSingleListings();
  const buyNftBadgeMutation = useBuyNftBadge();
  const activeListings: NFTListing[] = useMemo(() => {
    return listingsData?.filter((listing) => listing.active) as NFTListing[];
  }, [listingsData]);

  const nftBadgeBuying = useRef<string | null>(null);
  const handleBuyNft = async (badgeId: string)=>{
    nftBadgeBuying.current = badgeId;
    try{
      await buyNftBadgeMutation.mutateAsync(badgeId);
    }
    catch(error){
      console.error("Error buying NFT badge", error);
    }
  }

  return (
    <Card className="p-6 max-h-[500px] overflow-y-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 6H21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            Single Sales
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </h3>
          <p className="text-gray-500 text-sm">Purchase all Kols Participation Badges for sale</p>
        </div>
      </div>

      {listingsLoading ? (
        <div className="flex items-center w-full h-[360px] justify-center">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : 
      activeListings?.length > 0 ? (
        <div className="space-y-2">
        {activeListings?.map((listing) => (
          <div 
            key={listing.id}
            className="flex items-center justify-between p-4 bg-[#111111] rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 7H7.01" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="text-white font-medium">Kols Pariticpation Badge #{listing.id}</p>
                <p className={`text-xs text-gray-500`}>
                  Seller: {(listing.seller.slice(0, 6) + "..." + listing.seller.slice(-4))}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {listing.price > 0 ? (
                <span className="text-[#00FFD1] font-semibold">{formatUnits(listing.price, 18)} USDT</span>
              ) : (
                <span className="text-gray-500 text-sm">—</span>
              )}
            </div>
            <Button className=" disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleBuyNft(listing.id)} disabled={buyNftBadgeMutation.isPending && nftBadgeBuying.current === listing.id}>
              {buyNftBadgeMutation.isPending && nftBadgeBuying.current === listing.id ? 'Buying...' : 'Buy'}
              {buyNftBadgeMutation.isPending && nftBadgeBuying.current === listing.id && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </Button>
          </div>
        ))}
      </div>
      ) : activeListings?.length === 0 && (
        <div className="flex items-center w-full h-[360px] justify-center">
          <p className="text-gray-500 text-lg">No active listings found</p>
        </div>
      )}
    </Card>
  )
}

