import { Network } from "alchemy-sdk";

export const Config = {
  alchemy: {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  },
};
