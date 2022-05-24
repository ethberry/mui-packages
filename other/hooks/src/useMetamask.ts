import { useMetamaskValue } from "./useMetamaskValue";

export const useMetamask = (fn: (...args: Array<any>) => Promise<unknown>) => {
  const metaFn = useMetamaskValue(fn);

  return async (...args: Array<any>) => {
    return metaFn(...args);
  };
};
