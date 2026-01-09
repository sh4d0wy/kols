import { useMemo } from 'react';
import { useWalletClient, usePublicClient } from 'wagmi';
import { BrowserProvider, JsonRpcSigner, JsonRpcProvider } from 'ethers';
import type { Account, Chain, Client, Transport } from 'viem';
import { bscTestnet } from 'viem/chains';

export function useEthers({ chainId=bscTestnet.id }: { chainId: number } = { chainId: bscTestnet.id }) {
  const { data: walletClient } = useWalletClient({ chainId });
  const publicClient = usePublicClient({ chainId });

  function clientToProvider(client: Client<Transport, Chain>) {
    const { chain, transport } = client;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    
    if (transport.type === 'fallback') {
      return new JsonRpcProvider(transport.transports[0].value.url, network);
    }
    return new JsonRpcProvider(transport.url, network);
  }
  function clientToSigner(client: Client<Transport, Chain, Account>) {
    const { account, chain, transport } = client;
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    };
    const provider = new BrowserProvider(transport, network);
    return new JsonRpcSigner(provider, account.address);
  }
    
    const provider =  useMemo(
      () => (publicClient ? clientToProvider(publicClient) : undefined),
      [publicClient]
    );
  
  const signer = useMemo(
    () => (walletClient ? clientToSigner(walletClient) : undefined),
    [walletClient]
  );
  return { provider, signer };
}