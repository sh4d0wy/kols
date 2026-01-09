import { useMemo } from 'react';
import { Contract } from 'ethers';
import { useEthers } from './useEthers';

const CONTRACT_ADDRESS = "0x09bdacb98a9d9026352616760f07dab430e6fdc3";

const ABI = [
  "function stake(uint256 _amount) external",
  "function requestUnstake() external",
  "function withdrawUnstaked() external",
  "function claimReward() external",
  "function claimRewardAndUnstake() external",
  "function userActiveStaked(address) view returns (uint256)",
  "function userUnstaking(address) view returns (uint256,uint256)",
  "function isUnstaking(address) view returns (bool)",
  "function pendingReward(address) view returns (uint256)",
  "function pendingRewardAfterFee(address) view returns (uint256)",
  "function totalActiveStaked() view returns (uint256)",
  "function totalUnstakingPending() view returns (uint256)",
  "function totalStakerCount() view returns (uint256)",
  "function todayReward() view returns (uint256)",
  "function yesterdayReward() view returns (uint256)",
  "function thisWeekReward() view returns (uint256)",
  "function lastWeekReward() view returns (uint256)",
  "function thisMonthReward() view returns (uint256)",
  "function lastMonthReward() view returns (uint256)",
  "function totalDistributed() view returns (uint256)",
  "function contractUsdtBalance() view returns (uint256)",
  "function insurancePoolBalance() view returns (uint256)",
  "function totalUserClaimed() view returns (uint256)",
  "function totalFeeStats() view returns (uint256,uint256,uint256)",
  "function minStakeAmount() external view returns (uint256)",
  "function feeRate() external view returns (uint256,uint256)",
  "function insuranceRate() external view returns (uint256,uint256)",
  "function insuranceCap() external view returns (uint256)",
  "function kolsToken() view returns (address)"
];

export function useStakingContract() {
  const { provider, signer } = useEthers();

  const readContract = useMemo(() => {
    if (!provider) return null;
    return new Contract(CONTRACT_ADDRESS, ABI, provider);
  }, [provider]);

  const writeContract = useMemo(() => {
    if (!signer) return null;
    return new Contract(CONTRACT_ADDRESS, ABI, signer);
  }, [signer]);

  return {
    readContract,
    writeContract,
    CONTRACT_ADDRESS
  };
}