import { FC } from "react";
import { BadgeProps, IconButton, IconButtonProps } from "@mui/material";
import { UserRejectedRequestError, WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";

import { WalletConnectIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";
import { walletConnectConnector } from "../../connectors/wallet-connect";

export interface IWalletConnectButtonProps {
  disabled?: boolean;
  onClick: () => void;
  BadgeProps?: BadgeProps;
  IconButtonProps?: IconButtonProps;
}

// https://github.com/NoahZinsmeister/web3-react/blob/v6/docs/connectors/walletconnect.md
export const WalletConnectButton: FC<IWalletConnectButtonProps> = props => {
  const { disabled, onClick, BadgeProps, IconButtonProps } = props;

  const { enqueueSnackbar } = useSnackbar();
  const { activate, active, error, connector } = useWeb3React();

  if (error instanceof UserRejectedRequestError) {
    enqueueSnackbar(error.message, { variant: "warning" });
  }

  const handleClick = async () => {
    await activate(walletConnectConnector, console.error);
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
