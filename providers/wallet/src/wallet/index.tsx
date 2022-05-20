import { FC, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useIntl } from "react-intl";

import { usePopup } from "@gemunion/provider-popup";
import { useLicense } from "@gemunion/provider-license";

import { WalletIcon } from "../icon";
import { WalletMenuDialog } from "../menu-dialog";
import { useWallet } from "../provider";
import { IWalletConnectDialogProps, WalletDialog } from "../dialog";

interface IWalletProps {
  walletConnectDialogProps?: Pick<IWalletConnectDialogProps, "componentsProps" | "ButtonsProps">;
}

export const Wallet: FC<IWalletProps> = props => {
  const { walletConnectDialogProps = {} } = props;
  const { componentsProps, ButtonsProps = {} } = walletConnectDialogProps;

  const { isOpenPopup, openPopup, closePopup } = usePopup();
  const { connectPopupType } = useWallet();
  const { active, account } = useWeb3React();
  const { formatMessage } = useIntl();
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const license = useLicense();

  const handleOpenWalletDialog = () => {
    setIsWalletDialogOpen(true);
  };

  const handleCloseWalletDialog = () => {
    setIsWalletDialogOpen(false);
  };

  const handleOpenConnectDialog = () => {
    openPopup(connectPopupType);
  };

  if (!license.isValid()) {
    return null;
  }

  return (
    <Box mx={1}>
      {active ? (
        <Tooltip title={account!} enterDelay={300}>
          <IconButton color="inherit" onClick={handleOpenWalletDialog} data-testid="openWalletOptionsDialog">
            <WalletIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={formatMessage({ id: "components.header.wallet.connect" })} enterDelay={300}>
          <IconButton color="inherit" onClick={handleOpenConnectDialog} data-testid="openWalletConnectDialog">
            <WalletIcon />
          </IconButton>
        </Tooltip>
      )}
      <WalletDialog
        onClose={closePopup}
        open={isOpenPopup(connectPopupType)}
        componentsProps={componentsProps}
        ButtonsProps={ButtonsProps}
      />
      <WalletMenuDialog onClose={handleCloseWalletDialog} open={isWalletDialogOpen} />
    </Box>
  );
};
