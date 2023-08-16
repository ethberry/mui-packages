import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { Keplr, OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";

import { downForMaintenance } from "@gemunion/license-messages";
import { useCosmos } from "@gemunion/provider-cosmos";
import { useLicense } from "@gemunion/provider-license";

import { IHandlerOptionsParams } from "./interfaces";

export const useKeplrWallet = <T = any>(
  fn: (keplr: Keplr, offlineSigner: OfflineAminoSigner & OfflineDirectSigner, ...args: Array<any>) => Promise<T>,
  options: IHandlerOptionsParams = {},
) => {
  const license = useLicense();
  const { setAccount, setIsKeplrConnected } = useCosmos();

  const { formatMessage } = useIntl();
  const { success = true, error = true } = options;

  return async (...args: Array<any>): Promise<T> => {
    if (!license.isValid()) {
      return Promise.reject(downForMaintenance()).catch((e: string) => {
        enqueueSnackbar(e, { variant: "error" });
        return null as unknown as T;
      });
    }

    let keplr;
    let offlineSigner;

    if (window.keplr && window.getOfflineSigner) {
      const chainId = "haqq_11235-1";
      keplr = window.keplr;
      offlineSigner = window.getOfflineSigner(chainId);
      await window.keplr.enable(chainId);
      const accounts = await offlineSigner.getAccounts();
      const account = accounts[0].address;
      setAccount(account);
      setIsKeplrConnected(true);
    } else {
      window.open("https://www.keplr.app/download", "_blank", "noopener noreferrer");
      return Promise.reject(new Error("Keplr not found")).catch((e: string) => {
        enqueueSnackbar(e, { variant: "error" });
        return null as unknown as T;
      });
    }

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
