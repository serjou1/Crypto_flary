import { http, createConfig } from '@wagmi/core'
import { bsc, mainnet, sepolia } from '@wagmi/core/chains'

export const config1 = createConfig({
  chains: [mainnet, sepolia,bsc],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
})