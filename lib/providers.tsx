"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { CDPReactProvider, type Config as CDPConfig } from "@coinbase/cdp-react";
import { base } from "wagmi/chains";
import { config } from "./wagmi";
import { useState } from "react";

// CDP Embedded Wallet config
const cdpConfig: CDPConfig = {
  projectId: process.env.NEXT_PUBLIC_COINBASE_PROJECT_ID || "",
  appName: "NicheAI",
  appLogoUrl: "https://nicheai-nx5p.vercel.app/nicheai-logo.jpg",
  ethereum: {
    createOnLogin: "eoa",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <CDPReactProvider config={cdpConfig}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_CDP_API_KEY}
            chain={base}
            config={{
              appearance: {
                mode: "auto",
              },
              wallet: {
                display: "modal",
                preference: "smartWalletOnly",
              },
            }}
            miniKit={{ enabled: true }}
          >
            {children}
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </CDPReactProvider>
  );
}
