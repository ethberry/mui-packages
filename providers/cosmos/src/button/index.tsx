import { FC, useMemo } from "react";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { useIntl } from "react-intl";

import { usePopup } from "@gemunion/provider-popup";
import { useLicense } from "@gemunion/provider-license";
import { useUser } from "@gemunion/provider-user";

import { WalletIcon } from "../icon";
import { useCosmos, COSMOS_CONNECT_POPUP_TYPE } from "../provider";
import { WalletDialog } from "../dialog";

export const KeplrButton: FC = () => {
  const { isOpenPopup, openPopup } = usePopup();
  const { formatMessage } = useIntl();
  const license = useLicense();
  const { profile } = useUser<any>();
  const { account, closeConnectCosmosDialog, isKeplrConnected, chain } = useCosmos();

  const handleOpenDialog = () => {
    openPopup(COSMOS_CONNECT_POPUP_TYPE);
  };

  if (!license.isValid()) {
    return null;
  }

  const isChainValid = !profile || !chain?.chain_id || profile?.chainId === chain?.chain_id;

  const tooltipTitle = useMemo(
    () => (
      <Box sx={{ textAlign: "center" }}>
        {isChainValid
          ? isKeplrConnected
            ? account!
            : formatMessage({ id: "components.header.wallet.connect" })
          : formatMessage({ id: "components.header.wallet.notValid" })}
      </Box>
    ),
    [account, isKeplrConnected, isChainValid, profile],
  );

  return (
    <Box>
      <Tooltip title={tooltipTitle} enterDelay={300}>
        <IconButton color="inherit" onClick={handleOpenDialog} data-testid="OpenWalletOptionsDialog">
          <Badge color="error" badgeContent="!" invisible={isChainValid}>
            <WalletIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <WalletDialog onClose={closeConnectCosmosDialog} open={isOpenPopup(COSMOS_CONNECT_POPUP_TYPE)} />
    </Box>
  );
};
