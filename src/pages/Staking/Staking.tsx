import { Navbar } from "@/components/Navbar";
import {
  StakingHeader,
  StatsGrid,
  WalletStateCard,
  StakingInputCard,
  RewardsManagement,
  FeeStructure,
  APYCalculator,
  StakingProgress,
  NetworkStats,
  ExternalDAppRevenue,
  ContractRules,
  GlobalStatisticsCard,
  AddressInfoCard,
} from "@/components/Staking";

const Staking = () => {
  return (
    <div className="w-full bg-black min-h-screen pb-10">
      <div className="w-[90%] max-w-[1400px] mx-auto">
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

        <div className="mt-6">
          <APYCalculator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <StakingProgress />
          <NetworkStats />
        </div>

        <div className="mt-6">
          <ExternalDAppRevenue />
        </div>

        <div className="mt-6">
          <ContractRules />
        </div>
      </div>
    </div>
  );
};

export default Staking;
