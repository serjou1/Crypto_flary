import { RainbowKitProvider, darkTheme, getDefaultConfig } from '@rainbow-me/rainbowkit';
import React from 'react';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
// import {configureChain,createConfig, WagmiConfig} from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { bsc, mainnet, sepolia } from 'wagmi/chains';

// // import {publicProvider} from 'wagmi/pro'
const projectId = '95b12f1450eb1b99e25683fb739ccb3e';
const connectors  = connectorsForWallets([
  {groupName:'ENV',
    wallets:[rainbowWallet,walletConnectWallet,rabbyWallet,metaMaskWallet]
  },
  {groupName:'Solana',
    wallets:[phantomWallet]
  },
],{appName: 'RainbowKit demo',
  projectId: projectId,})


export const config = createConfig({
  connectors,
  
  chains: [mainnet, bsc],
  
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
const queryClient = new QueryClient();
const Providers = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          locale="en-US"
          theme={darkTheme({
            overlayBlur: 'small',
            accentColor: 'linear-gradient(90deg, #ff6e48, #fe9452)',
            accentColorForeground: 'white',
            borderRadius: 'medium',
          })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Providers;
