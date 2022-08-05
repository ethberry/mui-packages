import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { utils } from "ethers";

import { MetamaskOptionsParams } from "./use-metamask";

export const useMetamaskValue = <T = any>(fn: (...args: Array<any>) => Promise<T>, options: MetamaskOptionsParams) => {
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { success = true, error = true } = options;

  return async (...args: Array<any>) => {
    return fn(...args)
      .then((result: any) => {
        if (success && result !== null) {
          enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      })
      .catch((e: any) => {
        if (error) {
          if (e.code === 4001) {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
            return null;
          } else if (e.error?.data?.data) {
            const data = e.error?.data?.data as string;
            const decodedMessage = utils.toUtf8String(`0x${data.substr(138)}`);
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
            console.error("blockchain error", decodedMessage);
            return null;
          }
        }

        throw e;
      });
  };
};
