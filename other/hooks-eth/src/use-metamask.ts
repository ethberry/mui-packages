import { useMetamaskValue } from "./use-metamask-value";

export const useMetamask = (fn: (...args: Array<any>) => Promise<void>) => {
  const metaFn = useMetamaskValue(fn);

  return async (...args: Array<any>) => {
    return metaFn(...args);
  };
};
