import { useWallet } from "@gemunion/provider-wallet";
import { useWeb3React } from "@web3-react/core";

import { useMetamaskValue } from "./use-metamask-value";

export const useMetamask = (fn: (...args: Array<any>) => Promise<void>) => {
  const metaFn = useMetamaskValue(fn);

  const { active } = useWeb3React();

  const { openConnectWalletDialog, ensureWallet } = useWallet();

  return async (...args: Array<any>) => {
    if (!active) {
      ensureWallet(async () => await metaFn(...args));
      await openConnectWalletDialog();
    }
    return metaFn(...args);
  };
};
