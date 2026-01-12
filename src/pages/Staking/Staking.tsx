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
        />
        
        <StatsGrid />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
          <WalletStateCard/>
          
          <StakingInputCard />
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
          <FeeStructure/>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <RecentTransactions />
          <TopStakers />
        </div>

        <div className="mt-6">
          <APYCalculator />
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
