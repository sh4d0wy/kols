import { WagmiProvider, createConfig, http } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const config = createConfig(
  getDefaultConfig({
    chains: [bscTestnet],
    transports: {
        [bscTestnet.id]: http(
        // `https://bnb-testnet.g.alchemy.com/v2/${import.meta.env.VITE_ALCHEMY_ID}`,
        'https://bsc-testnet-dataseed.bnbchain.org'
      ),
    },

    walletConnectProjectId: import.meta.env.VITE_PROJECT_ID,
    appName: "KOLS",

    appDescription: "Your App Description",
    appUrl: "https://family.co", 
    appIcon: "https://family.co/logo.png", 
  }),
);

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