import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { useWeb3React } from "@web3-react/core";

import { WALLET_CONNECT_POPUP_TYPE } from "@gemunion/provider-wallet";
import { usePopup } from "@gemunion/provider-popup";

export const useMetamask = (fn: (...args: Array<any>) => Promise<unknown>) => {
  const { account } = useWeb3React();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { openPopup } = usePopup();

  return async (...args: Array<any>) => {
    if (!account) {
      openPopup(WALLET_CONNECT_POPUP_TYPE);
      enqueueSnackbar(formatMessage({ id: "snackbar.walletIsNotConnected" }), { variant: "error" });
      return;
    }

    return fn(...args)
      .then((result: unknown) => {
        enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
        return result;
      })
      .catch((error: any) => {
        if (error.code === 4001) {
          enqueueSnackbar(formatMessage({ id: "snackbar.denied" }), { variant: "warning" });
        } else {
          console.error(error);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
  };
};
