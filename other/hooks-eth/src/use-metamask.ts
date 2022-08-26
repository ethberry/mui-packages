import { useMetamaskWallet } from "./use-metamask-wallet";

export type MetamaskOptionsParams = {
  success?: boolean;
  error?: boolean;
};

export const useMetamask = (fn: (...args: Array<any>) => Promise<any>, options: MetamaskOptionsParams = {}) => {
  const metaFn = useMetamaskWallet?.(fn, options);

  return (...args: Array<any>) => {
    return metaFn?.(...args) as Promise<void>;
  };
};
