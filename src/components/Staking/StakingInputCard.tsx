import { useMemo, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { StatRow } from "../ui/StatRow";
import { FeatureList } from "./FeatureList";
import { useStakingQuery } from "@/hooks/staking/queries/useStakingQuery";
import { useConnection } from "wagmi";
import { useStakeTokensMutation } from "@/hooks/staking/mutation/useStakeTokensMutation";
import { ClipLoader } from "react-spinners";
import { ConnectKitButton } from "connectkit";

const ChartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 3v18h18" />
    <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
  </svg>
);

const LockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const StakingInputCard = () => {
  const connection = useConnection();
  const { data: stakingData } = useStakingQuery(connection.address);
  const { stakeTokens } = useStakeTokensMutation();
  const [amount, setAmount] = useState(stakingData?.userKolsBalance??'');
  
  const isStakeable = useMemo(
    () =>
      stakingData?.userKolsBalance && Number(stakingData?.userKolsBalance) > 0 && Number(amount) > 0 && Number(amount) <= Number(stakingData?.userKolsBalance) && Number(amount) >= Number(stakingData?.minStakeKOLS),
    [stakingData?.userKolsBalance, amount]
  );
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: num % 1 !== 0 ? 2 : 0,
    });
  };

  const handleMax = () => {
    setAmount(stakingData?.userKolsBalance ?? "0");
  };

  const handleStake = async () => {
    try {
      const res = await stakeTokens.mutateAsync(amount?.toString() ?? "0");
      if (res?.success) {
        console.log("Tokens staked successfully");
      } else {
        console.error("Failed to stake tokens");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs text-gray-500 uppercase tracking-wider font-medium">
          KOLS Staking
        </h3>
        <button className="w-10 h-10 rounded-xl bg-[#1a1a1a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#252525] transition-colors">
          <ChartIcon />
        </button>
      </div>

      {/* Input Section */}
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value;
              // Allow digits and single decimal point
              if (/^\d*\.?\d*$/.test(value)) {
                setAmount(value);
              }
            }}
            className={`w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-4 text-white text-2xl font-semibold font-mono focus:outline-none placeholder-gray-600  ${isStakeable ? ' focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30' : amount.length>0?'border-red-500/50':''}`}
            placeholder="0"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMax}
              className="text-xs px-3 py-1.5 rounded-lg text-[#0d0d0d]"
            >
              MAX
            </Button>
            <span className="text-gray-400 font-semibold">KOLS</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Minimum total stake:{" "}
          {formatNumber(Number(stakingData?.minStakeKOLS ?? "0"))} KOLS per
          wallet
        </p>
      </div>

      {/* Stats Section */}
      <div className="space-y-3 mt-4">
        <StatRow
          label="Your Balance"
          value={formatNumber(Number(stakingData?.userKolsBalance ?? "0"))}
          suffix="KOLS"
          suffixColor="cyan"
        />

        <StatRow
          label="Est. Daily Rewards"
          value={formatNumber(
            Number(stakingData?.estimatedDailyRewardsUSDT ?? "0")
          )}
          suffix="USDT"
          suffixColor="cyan"
        />

        <StatRow
          label="Est. Monthly Rewards"
          value={formatNumber(
            Number(stakingData?.estimatedMonthlyRewardsUSDT ?? "0")
          )}
          suffix="USDT"
          suffixColor="cyan"
        />
      </div>

      {/* Stake Button */}
      <div className="mt-6">
        {
          connection.address ?(
            <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleStake}
            disabled={
              !isStakeable || stakeTokens.isPending
            }
            className="py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!stakeTokens.isPending && <LockIcon />}
            {stakeTokens.isPending && <ClipLoader color="white" size={16} loading={stakeTokens.isPending} />}
            {stakeTokens.isPending ? 'Staking...' : 'Stake Now'}
          </Button>
          ):(
            <ConnectKitButton.Custom>
              {({ isConnecting, show }) => (
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={show}
                  disabled={isConnecting}
                  className="py-4"
                >
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              )}
            </ConnectKitButton.Custom>
          )
        }
      
      </div>

      {/* Features */}
      <div className="mt-6 pt-6 border-t border-[#1a1a1a]">
        <FeatureList />
      </div>
    </Card>
  );
};
