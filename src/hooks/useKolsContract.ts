import { useMemo } from "react";
import { Contract } from "ethers";
import { useEthers } from "./useEthers";
import { KOLS_ABI, KOLS_CONTRACT_ADDRESS } from "../utils/kolsdata";

export function useKolsContract() {
  const { provider, signer } = useEthers();
    
  const readContract = useMemo(() => {
    if (!provider) return null;
    return new Contract(KOLS_CONTRACT_ADDRESS, KOLS_ABI, provider);
  }, [provider]);

  const writeContract = useMemo(() => {
    if (!signer) return null;
    return new Contract(KOLS_CONTRACT_ADDRESS, KOLS_ABI, signer);
  }, [signer]);

  return {
    readContract,
    writeContract,
    KOLS_CONTRACT_ADDRESS,
  };
}
