import { FC } from "react";
import { BadgeProps, IconButton, IconButtonProps } from "@mui/material";
import {
  UserRejectedRequestError,
  WalletConnectConnector,
  WalletConnectConnectorArguments,
} from "@web3-react/walletconnect-connector";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { WalletConnectIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";
import { getWalletConnectConnector } from "../../connectors/wallet-connect";
import { useWallet } from "../../provider";

export interface IWalletConnectButtonProps {
  disabled?: boolean;
  onClick: () => void;
  BadgeProps?: BadgeProps;
  IconButtonProps?: IconButtonProps;
  connectorArgs?: WalletConnectConnectorArguments;
  onUserRejectedHandle?: (error: Error) => void;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/walletconnect.md
export const WalletConnectButton: FC<IWalletConnectButtonProps> = props => {
  const { disabled, onClick, BadgeProps, IconButtonProps, connectorArgs, onUserRejectedHandle } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { activate, active, error, connector } = useWeb3React();
  const { setActiveConnector } = useWallet();

  if (error instanceof UserRejectedRequestError) {
    setActiveConnector(null);
    if (onUserRejectedHandle) {
      onUserRejectedHandle(error);
    } else {
      enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
    }
  }

  const handleClick = async () => {
    await activate(getWalletConnectConnector(connectorArgs), error => {
      if (error instanceof UserRejectedRequestError) {
        setActiveConnector(null);
        if (onUserRejectedHandle) {
          onUserRejectedHandle(error);
        } else {
          enqueueSnackbar(formatMessage({ id: "snackbar.rejectedByUser" }), { variant: "warning" });
        }
      } else {
        enqueueSnackbar(error.message, { variant: "error" });
      }
    });
    onClick();
  };

  return (
    <CustomBadge invisible={!active || !(connector instanceof WalletConnectConnector)} BadgeProps={BadgeProps}>
      <IconButton disabled={disabled} onClick={handleClick} {...IconButtonProps}>
        <WalletConnectIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
