import { http, createConfig } from "wagmi";
import { bsc, mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, bsc, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
});
