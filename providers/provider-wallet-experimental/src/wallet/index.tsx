import { FC, useContext } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import { UserContext } from "@gemunion/provider-user";

import { WalletDialog } from "../dialog";
import { WalletIcon } from "../icon";
import { WalletContext } from "../provider";

export const Wallet: FC = () => {
  const user = useContext(UserContext);
  const wallet = useContext(WalletContext);

  const { formatMessage } = useIntl();

  const handleOpenConnectDialog = () => {
    wallet.setWalletConnectDialogOpen(true);
  };

  const handleCloseConnectDialog = () => {
    wallet.setWalletConnectDialogOpen(false);
  };

  if (!user.isAuthenticated()) {
    return null;
  }

  return (
    <Box mx={1}>
      <Tooltip title={formatMessage({ id: "components.header.wallet.connect" })} enterDelay={300}>
        <IconButton color="inherit" onClick={handleOpenConnectDialog}>
          <WalletIcon />
        </IconButton>
      </Tooltip>
      <WalletDialog onClose={handleCloseConnectDialog} open={wallet.getWalletConnectDialogOpen()} />
    </Box>
  );
};
