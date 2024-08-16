import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import React from 'react';
// import {argentWallet,trustWallet,ledgerWallet} from "@rainbow-me/rainbowkit/wallets"
// import {configureChain,createConfig, WagmiConfig} from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, http } from 'wagmi';
import { bsc, mainnet,sepolia } from 'wagmi/chains';

// // import {publicProvider} from 'wagmi/pro'

const projectId = '95b12f1450eb1b99e25683fb739ccb3e';
const config = getDefaultConfig({
  appName: 'RainbowKit demo',
  projectId: projectId,
  chains: [mainnet, bsc,sepolia],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sepolia.id]: http(),
  },
});
 const queryClient = new QueryClient()
const Providers = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize='compact' >{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
