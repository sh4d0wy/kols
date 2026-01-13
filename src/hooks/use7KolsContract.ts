import { useMemo } from "react";
import { Contract } from "ethers";
import { useEthers } from "./useEthers";
import { SEVEN_KOLS_ABI, SEVEN_KOLS_CONTRACT_ADDRESS } from "@/utils/7kolsdata";

export function use7KolsContract() {
  const { provider, signer } = useEthers();
    
  const readContract = useMemo(() => {
    if (!provider) return null;
    return new Contract(SEVEN_KOLS_CONTRACT_ADDRESS, SEVEN_KOLS_ABI, provider);
  }, [provider]);

  const writeContract = useMemo(() => {
    if (!signer) return null;
    return new Contract(SEVEN_KOLS_CONTRACT_ADDRESS, SEVEN_KOLS_ABI, signer);
  }, [signer]);

  return {
    readContract,
    writeContract,
    SEVEN_KOLS_CONTRACT_ADDRESS,
  };
}
