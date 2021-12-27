import { FC, useContext, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useIntl } from "react-intl";

import { UserContext } from "@gemunion/provider-user";

import { WalletDialog } from "./dialog";
import { WalletIcon } from "./icon";
import { WalletMenuDialog } from "./menu-dialog";

export const Wallet: FC = () => {
  const user = useContext(UserContext);

  const { active, account } = useWeb3React();
  const { formatMessage } = useIntl();
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);

  const handleOpenConnectDialog = () => {
    setIsConnectDialogOpen(true);
  };

  const handleCloseConnectDialog = () => {
    setIsConnectDialogOpen(false);
  };

  const handleOpenWalletDialog = () => {
    setIsWalletDialogOpen(true);
  };

  const handleCloseWalletDialog = () => {
    setIsWalletDialogOpen(false);
  };

  if (!user.isAuthenticated()) {
    return null;
  }

  return (
    <Box mx={1}>
      {active ? (
        <Tooltip title={account ?? ""} enterDelay={300}>
          <IconButton color="inherit" onClick={handleOpenWalletDialog}>
            <WalletIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={formatMessage({ id: "components.header.wallet.connect" })} enterDelay={300}>
          <IconButton color="inherit" onClick={handleOpenConnectDialog}>
            <WalletIcon />
          </IconButton>
        </Tooltip>
      )}
      <WalletDialog onClose={handleCloseConnectDialog} open={isConnectDialogOpen} />
      <WalletMenuDialog onClose={handleCloseWalletDialog} open={isWalletDialogOpen} />
    </Box>
  );
};
