import { MetamaskOptionsParams } from "./use-metamask";
import { useMetamaskWallet } from "./use-metamask-wallet";

export const useMetamaskValue = <T = any>(
  fn: (...args: Array<any>) => Promise<T>,
  options: MetamaskOptionsParams = {},
) => {
  const metaFn = useMetamaskWallet?.(fn, options);

  return (...args: Array<any>): Promise<T> => {
    return metaFn?.(...args) as Promise<T>;
  };
};
