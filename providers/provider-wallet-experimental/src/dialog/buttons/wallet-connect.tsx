import { FC } from "react";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";

import { walletConnect, walletConnectHooks } from "../../connectors";
import { WalletConnectIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface IWalletConnectButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/main/packages/walletconnect/README.md
export const WalletConnectButton: FC<IWalletConnectButtonProps> = props => {
  const { disabled, onClick } = props;

  const error = walletConnectHooks.useError();
  const isActive = walletConnectHooks.useIsActive();

  const { enqueueSnackbar } = useSnackbar();

  if (error) {
    enqueueSnackbar(error.message, { variant: "error" });
  }

  const handleClick = async () => {
    if (isActive) {
      if (walletConnect.deactivate) {
        await walletConnect.deactivate();
      }
    } else {
      await walletConnect.activate();
    }
    onClick();
  };

  return (
    <CustomBadge invisible={!isActive}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <WalletConnectIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
