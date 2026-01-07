import React from 'react'
import { Card, Button } from '../ui'

interface Listing {
  id: string
  name: string
  price: number
  status: 'verified' | 'pending'
  seller: string
}

interface SingleSalesProps {
  listings: Listing[]
  onBuy: (id: string) => void
}

export const SingleSales: React.FC<SingleSalesProps> = ({ listings, onBuy }) => {
  return (
    <Card className="p-6">
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
          <p className="text-gray-500 text-sm">Purchase all KTB NFTs owned by your wallet using ERC721Enumerable</p>
        </div>
      </div>

      <div className="space-y-2">
        {listings.map((listing) => (
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
                <p className="text-white font-medium">{listing.name}</p>
                <p className={`text-xs ${listing.status === 'verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {listing.seller}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {listing.price > 0 ? (
                <span className="text-purple-400 font-semibold">{listing.price} USDT</span>
              ) : (
                <span className="text-gray-500 text-sm">—</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

