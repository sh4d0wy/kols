import React from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { RuleItem } from './RuleItem'

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

export const ContractRules: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-cyan-400">
          <InfoIcon />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Staking Contract Rules</h2>
          <p className="text-xs text-gray-500">Important guidelines for staking participation</p>
        </div>
      </div>

      <div className="mt-6 bg-[#111111] rounded-xl p-5">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#1a1a1a] flex items-center justify-center text-gray-400">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <span className="text-sm font-medium text-white">KOLS STAKING RULES</span>
          </div>
          <Button variant="outline" size="sm">READ CAREFULLY</Button>
        </div>

        <div className="space-y-4">
          <RuleItem text="Minimum total stake is 1000 KOLS per wallet." />
          <RuleItem text="Staking becomes active immediately and participates in reward distribution." />
          <RuleItem text="Once you request unstake, your stake stops participating in rewards." />
          <RuleItem text="After requesting unstake, there is a 7-day lockup before withdrawal." />
          <RuleItem text="You cannot stake additional KOLS while in pending unstake state." />
          <RuleItem text="2.0% fee is applied on each reward claim:" />
          <RuleItem text="1.8% is redistributed back to the staking pool" indent />
          <RuleItem text="0.2% is allocated to the Insurance pool" indent />
          <RuleItem text="The insurance pool is capped at 100 USDT." />
          <RuleItem text="Any excess amount is automatically redistributed to all stakers." />
          <RuleItem text="External DApps will periodically send USDT to the pool," />
          <RuleItem text="which is then distributed to stakers in proportion to their share." />
          <RuleItem text="The contract is designed to operate in a non-custodial, autonomous manner" highlight />
          <RuleItem text="without centralized admin control over user funds." indent />
        </div>
      </div>
    </Card>
  )
}

