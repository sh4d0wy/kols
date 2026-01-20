import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { StatRow } from '@/components/ui/StatRow'
import { useWalletStatsQuery } from '@/hooks/staking/queries/useWalletStatsQuery'
import { useConnection } from 'wagmi'




export const WalletStateCard = () => {
  const connection = useConnection();
  const { data: walletStats } = useWalletStatsQuery(connection.address);
  
  return (
    <Card className="p-6 h-full w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">My Wallet State</h3>
        <Badge variant={walletStats?.isActive ? 'success' : 'danger'}>{walletStats?.isActive ? 'ACTIVE' : 'INACTIVE'}</Badge>
      </div>
      
      <div className="space-y-3">
        <StatRow
          label="Active Stake"
          value={walletStats?.activeStake ?? '0'}
          suffix="KOLS"
          suffixColor="cyan"
        />
        
        <StatRow
          label="My Share"
          value={`${walletStats?.myShare ?? '0'}%`}
          valueColor="cyan"
        />
        
        <StatRow
          label="Pending Unstake"
          value={walletStats?.pendingUnstake ?? '0'}
          suffix="KOLS"
          suffixColor="cyan"
        />
        
        <div className="flex justify-between items-center py-3.5 px-4 bg-[#111111] rounded-xl">
          <span className="text-gray-400 text-sm">Unlock Time</span>
          <span className="text-[#00FFD1]">
            {walletStats?.unlockTime 
              ? new Date(walletStats.unlockTime * 1000).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }) + ' • ' + new Date(walletStats.unlockTime * 1000).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })
              : '-'}
          </span>
        </div>
        
        <StatRow
          label="Withdrawable Rewards"
          value={walletStats?.withdrawableRewards ?? '0'}
          suffix="USDT"
          suffixColor="cyan"
        />
        
        <StatRow
          label="Total Earnings"
          value={walletStats?.totalEarnings ?? '0'}
          suffix="USDT"
          suffixColor="cyan"
        />
      </div>
      
      <div className="mt-6">
        <p 
          className="text-gray-400 text-lg text-center border border-gray-500/20 rounded-full p-2"
        >
          Net amount after 2% fee (Actual amount you receive)
        </p>
      </div>
    </Card>
  )
}

