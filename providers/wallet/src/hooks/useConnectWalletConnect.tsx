import { useCallback } from "react";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";

import { TConnectors, useAppDispatch, useAppSelector, walletActions } from "@gemunion/redux";

import { useWallet } from "../provider";
import { walletConnect } from "../connectors/wallet-connect";

export interface IUseConnectWalletConnect {
  onClick?: () => void;
}

/* javascript-obfuscator:disable */
const WALLET_CONNECT_DEFAULT_CHAIN_ID = Number(process.env.WALLET_CONNECT_DEFAULT_CHAIN_ID);
/* javascript-obfuscator:enable */

export const useConnectWalletConnect = (props: IUseConnectWalletConnect) => {
  const { onClick } = props;

  const { formatMessage } = useIntl();

  const { network } = useAppSelector(state => state.wallet);
  const { setActiveConnector } = walletActions;
  const dispatch = useAppDispatch();
  const { connectCallback } = useWallet();

  return useCallback(() => {
    return connectCallback(async () => {
      return walletConnect
        .activate(network ? network.chainId : WALLET_CONNECT_DEFAULT_CHAIN_ID)
        .then(() => {
          dispatch(setActiveConnector(TConnectors.WALLETCONNECT));
          onClick && onClick();
        })
        .catch(e => {
          console.error("error", e);
          dispatch(setActiveConnector(null));
          if (e && e.code === 4001) {
            enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
          } else {
            enqueueSnackbar(formatMessage({ id: "snackbar.blockchainError" }), { variant: "error" });
          }
        });
    });
  }, [network]);
};
