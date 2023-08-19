import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { downForMaintenance } from "@gemunion/license-messages";
import { useLicense } from "@gemunion/provider-license";
import { useCosmos, chainInfoByChainId } from "@gemunion/provider-cosmos";

import { ICosmosParams, IHandlerOptionsParams } from "./interfaces";

export const useKeplr = <T = any>(
  fn: (cosmosParams: ICosmosParams, ...args: Array<any>) => Promise<T>,
  options: IHandlerOptionsParams = {},
) => {
  const license = useLicense();

  const { formatMessage } = useIntl();
  const { enabledChains } = useCosmos();
  const { success = true, error = true } = options;

  return async (...args: Array<any>): Promise<T> => {
    if (!license.isValid()) {
      return Promise.reject(downForMaintenance()).catch((e: string) => {
        enqueueSnackbar(e, { variant: "error" });
        return null as unknown as T;
      });
    }

    let keplr;
    let getOfflineSigner;

    if (window.keplr && window.getOfflineSigner) {
      keplr = window.keplr;
      getOfflineSigner = window.getOfflineSigner;

      for (const chainId of enabledChains) {
        await window.keplr.experimentalSuggestChain(chainInfoByChainId[chainId]);
      }
      await window.keplr.enable(enabledChains);
    } else {
      window.open("https://www.keplr.app/download", "_blank", "noopener noreferrer");
      return Promise.reject(new Error("Keplr not found")).catch((e: string) => {
        enqueueSnackbar(e, { variant: "error" });
        return null as unknown as T;
      });
    }

    return fn({ keplr, getOfflineSigner }, ...args)
      .then((result: any) => {
        if (success && result !== null) {
          enqueueSnackbar(formatMessage({ id: "snackbar.transactionSent" }), { variant: "info" });
        }
        return result as T;
      })
      .catch((e: any) => {
        if (error) {
          console.error(error);
        } else {
          throw e;
        }
      }) as Promise<T>;
  };
};
