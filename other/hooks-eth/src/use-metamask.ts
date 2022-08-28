import { useSnackbar } from "notistack";

import { downForMaintenance } from "@gemunion/license-messages";

import { useMetamaskWallet } from "./use-metamask-wallet";

export type MetamaskOptionsParams = {
  success?: boolean;
  error?: boolean;
};

export const useMetamask = (fn: (...args: Array<any>) => Promise<any>, options: MetamaskOptionsParams = {}) => {
  const { enqueueSnackbar } = useSnackbar();
  const metaFn = useMetamaskWallet(fn, options);

  return (...args: Array<any>) => {
    return metaFn(...args).catch((e: any) => {
      if (e.message === downForMaintenance()) {
        enqueueSnackbar(downForMaintenance(), { variant: "error" });
      }
    }) as Promise<void>;
  };
};
