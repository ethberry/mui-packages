import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { chainInfoByChainId, useCosmos } from "@gemunion/provider-cosmos";

import { ICosmosParams, IHandlerOptionsParams } from "./interfaces";

export const useKeplr = <T = any>(
  fn: (cosmosParams: ICosmosParams, ...args: Array<any>) => Promise<T>,
  options: IHandlerOptionsParams = {},
) => {
  const { formatMessage } = useIntl();
  const { enabledChains } = useCosmos();
  const { success = true, error = true } = options;

  return async (...args: Array<any>): Promise<T> => {
    const { keplr, getOfflineSigner, open } = window;

    if (!keplr || !getOfflineSigner) {
      open("https://www.keplr.app/download", "_blank", "noopener noreferrer");
      enqueueSnackbar("Keplr not found", { variant: "error" });
      return null as unknown as T;
    }

    for (const chainId of enabledChains) {
      await keplr.experimentalSuggestChain(chainInfoByChainId[chainId]);
    }
    await keplr.enable(enabledChains);

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
