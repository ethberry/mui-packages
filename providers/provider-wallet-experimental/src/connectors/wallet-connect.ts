import { initializeConnector } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect";
import { URLS } from "./chains";

// @ts-ignore
export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
  actions =>
    new WalletConnect(actions, {
      rpc: Object.keys(URLS).reduce((accumulator, chainId) => {
        accumulator[chainId] = URLS[Number(chainId)][0];
        return accumulator;
      }, {} as Record<string, string>),
    }),
  Object.keys(URLS).map(chainId => Number(chainId)),
);
