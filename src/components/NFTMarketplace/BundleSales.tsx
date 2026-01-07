import React from 'react'
import { Card, Button } from '../ui'

interface Bundle {
  id: string
  name: string
  price: number
  discount: number
  count: number
  type: 'elite' | 'starter'
}

interface BundleSalesProps {
  bundles: Bundle[]
  onBuy: (id: string) => void
}

export const BundleSales: React.FC<BundleSalesProps> = ({ bundles, onBuy }) => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 9.4L7.5 4.21" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 16V8C20.9996 7.6493 20.9071 7.3048 20.7315 7.00017C20.556 6.69555 20.3037 6.44158 20 6.264L13 2.264C12.696 2.08624 12.3511 1.99292 12 1.99292C11.6489 1.99292 11.304 2.08624 11 2.264L4 6.264C3.69626 6.44158 3.44398 6.69555 3.26846 7.00017C3.09294 7.3048 3.00036 7.6493 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9998C3.44398 17.3044 3.69626 17.5584 4 17.736L11 21.736C11.304 21.9138 11.6489 22.0071 12 22.0071C12.3511 22.0071 12.696 21.9138 13 21.736L20 17.736C20.3037 17.5584 20.556 17.3044 20.7315 16.9998C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22.08V12" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            Bundle Sales
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          </h3>
          <p className="text-gray-500 text-sm">Purchase all KTB NFTs owned by your wallet using ERC721Enumerable link</p>
        </div>
      </div>

      <div className="space-y-3">
        {bundles.map((bundle) => (
          <div 
            key={bundle.id}
            className="flex items-center justify-between p-4 bg-[#111111] rounded-xl"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                bundle.type === 'elite' 
                  ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' 
                  : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
              }`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={bundle.type === 'elite' ? '#F59E0B' : '#00F5D4'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-white font-medium">{bundle.name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    bundle.type === 'elite'
                      ? 'bg-amber-500/20 text-amber-400'
                      : 'bg-cyan-500/20 text-cyan-400'
                  }`}>
                    -{bundle.discount}% OFF
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{bundle.count} for Bundle</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-cyan-400 font-semibold">{bundle.price} USDT</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

