import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Keplr, OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";

import { useCosmos } from "@gemunion/provider-cosmos";

import { IHandlerOptionsParams } from "./interfaces";

export const useKeplrWallet = <T = any>(
  fn: (keplr: Keplr, offlineSigner: OfflineAminoSigner & OfflineDirectSigner, ...args: Array<any>) => Promise<T>,
  options: IHandlerOptionsParams = {},
) => {
  const { setAccount, setIsKeplrConnected } = useCosmos();

  const { formatMessage } = useIntl();
  const { success = true, error = true } = options;

  return async (...args: Array<any>): Promise<T> => {
    const { keplr, getOfflineSigner, open } = window;

    const chainId = "haqq_11235-1";

    if (!keplr || !getOfflineSigner) {
      open("https://www.keplr.app/download", "_blank", "noopener noreferrer");
      enqueueSnackbar("Keplr not found", { variant: "error" });
      return null as unknown as T;
    }

    const offlineSigner = getOfflineSigner(chainId);
    await keplr.enable(chainId);
    const accounts = await offlineSigner.getAccounts();
    const account = accounts[0].address;
    setAccount(account);
    setIsKeplrConnected(true);

    return fn(keplr, offlineSigner, ...args)
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
