import { Navbar } from "@/components/Navbar";
import {
  StakingHeader,
  StatsGrid,
  WalletStateCard,
  StakingInputCard,
  RewardsManagement,
  FeeStructure,
  StakingProgress,
  NetworkStats,
  ExternalDAppRevenue,
  ContractRules,
  GlobalStatisticsCard,
  AddressInfoCard,
} from "@/components/Staking";
import type { DAppItem } from "@/components/Staking/ExternalDAppRevenue";
import use7KolsGlobalStats from "@/hooks/7kols/queries/use7KolsGlobalStats";

const Staking = () => {
  const {data:globalStats} = use7KolsGlobalStats()
  const items: DAppItem[] = [
    {
      url: '/kols',
      title: '7KOLS',
      metricTitle: 'Total Revenue',
      metricValue: (Number(globalStats?.totalDeposited??0)).toFixed(2) + ' USDT'
    },
    {
      title: 'Coming Soon #2',
      description: 'Multiple external sources will connect here to share real revenue streams.'
    },
    {
      title: 'Coming Soon #3',
      description: 'Performance of external projects will be reflected in near-real-time.'
    }
  ]
  return (
    <div className="w-full bg-black min-h-screen pb-10">
      <div className="w-[80%] max-w-[1400px] mx-auto">
        <Navbar />

        <StakingHeader
          title="Global Staking Overview"
          subtitle="Real-time statistics and performance metrics"
        />

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-6">
          <WalletStateCard />

          <StakingInputCard />
        </div>

        <div className="mt-6">
          <RewardsManagement />
        </div>

        <div className="mt-6">
          <FeeStructure />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GlobalStatisticsCard />
          <AddressInfoCard />
        </div>

        {/* <div className="mt-6">
          <APYCalculator />
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <StakingProgress />
          <NetworkStats />
        </div>

        <div className="mt-6">
          <ExternalDAppRevenue items={items} />
        </div>

        <div className="mt-6">
          <ContractRules />
        </div>
      </div>
    </div>
  );
};

export default Staking;
