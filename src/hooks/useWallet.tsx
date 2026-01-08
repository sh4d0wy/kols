// src/hooks/useWallet.js
import { useState, useEffect } from 'react';
import { ethers, BrowserProvider, JsonRpcSigner } from 'ethers';

export const useWallet = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [chainId, setChainId] = useState<bigint | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (!(window as any).ethereum) {
        setError(new Error('Please install MetaMask or another Web3 wallet'));
        setIsConnecting(false);
        return;
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      const message = `Welcome! Please sign this message to verify your wallet.\n\nNonce: ${Date.now()}`;
      
      try {
        const signature = await signer.signMessage(message);
        console.log('Signature:', signature);
        
        // You can verify the signature here if needed
        const recoveredAddress = ethers.verifyMessage(message, signature);
        console.log('Recovered address:', recoveredAddress);

        setProvider(provider);
        setSigner(signer);
        setAccount(accounts[0]);
        setChainId(network.chainId as bigint);
        setError(null);
      } catch (signError) {
        setError(new Error('Signature rejected. Please sign the message to connect.'));
        console.error('Signature error:', signError);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      console.error('Error connecting wallet:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  useEffect(() => {
    if ((window as any).ethereum) {
      (window as any).ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          disconnectWallet();
        }
      });

      (window as any).ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if ((window as any).ethereum) {
        (window as any).ethereum.removeAllListeners('accountsChanged');
        (window as any).ethereum.removeAllListeners('chainChanged');
      }
    };
  }, []);

  return {
    account,
    provider,
    signer,
    chainId,
    error,
    isConnecting,
    connectWallet,
    disconnectWallet,
    isConnected: !!account,
  };
};