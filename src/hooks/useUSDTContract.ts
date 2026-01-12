import { useMemo } from 'react';
import { Contract } from 'ethers';
import { useEthers } from './useEthers';
import { USDT_CONTRACT_ABI, USDT_CONTRACT_ADDRESS } from '@/utils/usdtData';

export function useUSDTContract() {
  const { provider, signer } = useEthers();

  const readContract = useMemo(() => {
    if (!provider) return null;
    return new Contract(USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI, provider);
  }, [provider]);

  const writeContract = useMemo(() => {
    if (!signer) return null;
        return new Contract(USDT_CONTRACT_ADDRESS, USDT_CONTRACT_ABI, signer);
  }, [signer]);

  return {
    readContract,
    writeContract,
    USDT_CONTRACT_ADDRESS
  };
}