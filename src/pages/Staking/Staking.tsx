import { Navbar } from '../../components/Navbar'
import { 
  StakingHeader, 
  StatsGrid, 
  WalletStateCard, 
  StakingInputCard,
  RewardsManagement,
  FeeStructure,
  RecentTransactions,
  TopStakers,
  APYCalculator,
  StakingProgress,
  NetworkStats,
  ExternalDAppRevenue,
  ContractRules,
} from '../../components/Staking'

const Staking = () => {
  const handleStake = (amount: number) => {
    console.log('Staking amount:', amount)
  }

  const handleWithdraw = () => {
    console.log('Withdrawing rewards')
  }

  const handleClaimRewards = () => {
    console.log('Claiming rewards')
  }

  const handleRequestUnstake = () => {
    console.log('Requesting unstake')
  }

  const handleWithdrawUnstaked = () => {
    console.log('Withdrawing unstaked')
  }

  const handleClaimAndUnstake = () => {
    console.log('Claiming and unstaking')
  }

  return (
    <div className="w-full bg-black min-h-screen pb-10">
      <div className="w-[95%] max-w-[1400px] mx-auto">
        <Navbar />
        
        <StakingHeader 
          title="Global Staking Overview"
          subtitle="Real-time statistics and performance metrics"
          apy="24.5%"
          tvl="$8.9M"
        />
        
        <StatsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
          <WalletStateCard 
            onWithdraw={handleWithdraw}
            data={{
              isActive: true,
              activeStake: 2450,
              myShare: 3.42,
              pendingUnstake: 0,
              unlockTime: null,
              withdrawableRewards: 127.84,
              totalEarnings: 1456.32
            }}
          />
          
          <StakingInputCard 
            balance={15789}
            minStake={1000}
            estimatedDailyRewards={2.45}
            estimatedMonthlyRewards={73.50}
            onStake={handleStake}
          />
        </div>

        <div className="mt-6">
          <RewardsManagement
            onClaimRewards={handleClaimRewards}
            onRequestUnstake={handleRequestUnstake}
            onWithdrawUnstaked={handleWithdrawUnstaked}
            onClaimAndUnstake={handleClaimAndUnstake}
          />
        </div>

        <div className="mt-6">
          <FeeStructure
            data={{
              contractBalance: 12456,
              totalWithdrawals: 489234,
              redistributionFee: 9872,
              insuranceFee: 1097
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentTransactions />
          <TopStakers />
        </div>

        <div className="mt-6">
          <APYCalculator apy={24.5} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <StakingProgress
            data={{
              poolUtilization: 67.3,
              yourContribution: 3.42,
              rewardRate: 24.5
            }}
          />
          <NetworkStats
            data={{
              totalStakedValue: '$8.9M',
              volume24h: '$234.5K',
              averageStake: '57.4 KOLS',
              networkFee: '2.0%'
            }}
          />
        </div>

        <div className="mt-6">
          <ExternalDAppRevenue />
        </div>

        <div className="mt-6">
          <ContractRules />
        </div>

      </div>
    </div>
  )
}

export default Staking
