import { useSnackbar } from "notistack";

import { downForMaintenance } from "@gemunion/license-messages";

import { MetamaskOptionsParams } from "./use-metamask";
import { useMetamaskWallet } from "./use-metamask-wallet";

export const useMetamaskValue = <T = any>(
  fn: (...args: Array<any>) => Promise<T>,
  options: MetamaskOptionsParams = {},
) => {
  const { enqueueSnackbar } = useSnackbar();
  const metaFn = useMetamaskWallet(fn, options);

  return (...args: Array<any>): Promise<T | null> => {
    return metaFn(...args).catch((e: any) => {
      if (e.message === downForMaintenance()) {
        enqueueSnackbar(downForMaintenance(), { variant: "error" });
        return null;
      }
      throw e;
    });
  };
};
