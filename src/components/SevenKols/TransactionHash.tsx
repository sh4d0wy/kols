import React, { useState } from 'react'
import { Card, Button } from '../ui'

interface Transaction {
  hash: string
  status: 'pending' | 'confirmed' | 'failed'
  timestamp?: string
}

interface TransactionHashProps {
  transactions: Transaction[]
}

const statusStyles = {
  pending: 'text-amber-400',
  confirmed: 'text-emerald-400',
  failed: 'text-red-400',
}

export const TransactionHash: React.FC<TransactionHashProps> = ({ transactions }) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null)

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash)
    setCopiedHash(hash)
    setTimeout(() => setCopiedHash(null), 2000)
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 13C10.4295 13.5741 10.9774 14.0491 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4508 9.59695 21.9548 8.33394 21.9434 7.02296C21.932 5.71198 21.4061 4.45791 20.479 3.53087C19.552 2.60383 18.2979 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55916 13.47 3.46997L11.75 5.17997" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 11C13.5705 10.4259 13.0226 9.9508 12.3934 9.60706C11.7642 9.26331 11.0684 9.05886 10.3533 9.00765C9.63816 8.95643 8.92037 9.05961 8.24861 9.3102C7.57685 9.56079 6.96684 9.95291 6.45996 10.46L3.45996 13.46C2.54915 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#00F5D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <h3 className="text-white font-semibold text-lg">Transaction Hash</h3>
          <p className="text-gray-500 text-sm">Latest ref only</p>
        </div>
      </div>

      <div className="space-y-3">
        {transactions.map((tx, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-[#111111] rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/30 to-purple-500/30 flex items-center justify-center">
                <span className="text-white text-xs font-bold">TX</span>
              </div>
              <div>
                <p className="text-white font-mono text-sm">{tx.hash}</p>
                <p className={`text-xs ${statusStyles[tx.status]}`}>{tx.status}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopy(tx.hash)}
            >
              {copiedHash === tx.hash ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

