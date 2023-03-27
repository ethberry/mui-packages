import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { utils } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { ErrorCode } from "@ethersproject/logger";
import { SERVER_ERROR_CODE_RANGE, RESERVED_ERROR_CODES, STANDARD_ERROR_MAP } from "@json-rpc-tools/utils";

import { downForMaintenance } from "@gemunion/license-messages";
import { useLicense } from "@gemunion/provider-license";
import { useWallet } from "@gemunion/provider-wallet";

import { IHandlerOptionsParams } from "./interfaces";

export const useMetamaskWallet = <T = any>(
  fn: (...args: Array<any>) => Promise<T>,
  options: IHandlerOptionsParams = {},
) => {
  const license = useLicense();

  const web3ContextGlobal = useWeb3React();
  const { isActive } = web3ContextGlobal;
  const { openConnectWalletDialog, isDialogOpen, closeConnectWalletDialog } = useWallet();

  const { formatMessage } = useIntl();
  const { success = true, error = true } = options;

  return async (...args: Array<any>): Promise<T> => {
    if (!license.isValid()) {
      return Promise.reject(downForMaintenance()).catch((e: string) => {
        enqueueSnackbar(e, { variant: "error" });
        return null as unknown as T;
      });
    }

    let context = web3ContextGlobal;
    if (!isActive) {
      context = await openConnectWalletDialog();
    } else if (isDialogOpen()) {
      closeConnectWalletDialog();
    }

    return fn(...args, context)
      .then((result: any) => {
        if (success && result !== null) {
          enqueueSnackbar(formatMessage({ id: "snackbar.transactionSent" }), { variant: "info" });
        }
        return result as T;
      })
      .catch((e: any) => {
        if (error) {
          if (e.code === 4001 || e.code === ErrorCode.ACTION_REJECTED) {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else if ([...SERVER_ERROR_CODE_RANGE, ...RESERVED_ERROR_CODES].includes(e.code)) {
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
            const errorType = Object.values(STANDARD_ERROR_MAP).find(({ code }) => code === e.code)?.message;
            console.error(`[blockchain error]${errorType ? ` [${errorType}]` : ""}`, e.message);
          } else if (e.error?.data?.data) {
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
            const data = e.error?.data?.data as string;
            const decodedMessage = utils.toUtf8String(`0x${data.substr(138)}`);
            console.error("[blockchain error]", decodedMessage);
          }
          return null;
        }

        throw e;
      }) as Promise<T>;
  };
};
