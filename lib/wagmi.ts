import { http, createConfig } from "wagmi";
import { base, baseSepolia, mainnet } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

// Define Niche Network (local Optimism testnet)
const nicheNetwork = {
  id: 901,
  name: "Niche Network",
  network: "niche-network",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["http://localhost:8545"],
    },
    public: {
      http: ["http://localhost:8545"],
    },
  },
  blockExplorers: {
    default: { name: "Niche Explorer", url: "" },
  },
  testnet: true,
};

export const config = createConfig({
  chains: [nicheNetwork, base, baseSepolia, mainnet],
  connectors: [
    coinbaseWallet({
      appName: "LUXBIN",
      preference: "all",
    }),
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "c5ca7a3d3e1c52b7abfbc0e7c1e8f1d4",
      showQrModal: true,
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
});
