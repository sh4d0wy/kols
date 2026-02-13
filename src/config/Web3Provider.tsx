import { WagmiProvider, createConfig, http } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { coinbaseWallet, injected, metaMask } from "wagmi/connectors";

const config = createConfig({

  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(
      // `https://bnb-testnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
      'https://bsc-testnet-dataseed.bnbchain.org'
    ),
  },
  connectors: [
    injected(),
  ],
});

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};