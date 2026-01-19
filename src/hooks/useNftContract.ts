import { useMemo } from "react";
import { Contract } from "ethers";
import { useEthers } from "./useEthers";
import { NFT_CONTRACT_ABI,NFT_CONTRACT_ADDRESS } from "@/utils/nftdata";

export function useNftContract() {
  const { provider, signer } = useEthers();
    
  const readContract = useMemo(() => {
    if (!provider) return null;
    return new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, provider);
  }, [provider]);

  const writeContract = useMemo(() => {
    if (!signer) return null;
    return new Contract(NFT_CONTRACT_ADDRESS, NFT_CONTRACT_ABI, signer);
  }, [signer]);

  return {
    readContract,
    writeContract,
    NFT_CONTRACT_ADDRESS,
  };
}
