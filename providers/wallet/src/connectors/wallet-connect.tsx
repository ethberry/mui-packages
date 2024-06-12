import { initializeConnector, Web3ReactHooks } from "@web3-react/core";
import { Web3ReactStore } from "@web3-react/types";
import { WalletConnect } from "@web3-react/walletconnect";

// do not import from provider
import { rpcUrls } from "../provider/constants";

export const [walletConnect, hooks, store]: [WalletConnect, Web3ReactHooks, Web3ReactStore] =
  initializeConnector<WalletConnect>(
    (actions): WalletConnect =>
      new WalletConnect({
        actions,
        options: {
          rpc: rpcUrls,
          qrcode: true,
        },
      }),
  );
