import { FC, useMemo } from "react";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useIntl } from "react-intl";

import { usePopup } from "@gemunion/provider-popup";
import { useLicense } from "@gemunion/provider-license";
import { useUser } from "@gemunion/provider-user";

import { WalletIcon } from "../icon";
import { WalletMenuDialog } from "../menu-dialog";
import { useWallet, WALLET_CONNECT_POPUP_TYPE, WALLET_MENU_POPUP_TYPE } from "../provider";
import { WalletDialog } from "../dialog";

export const Wallet: FC = () => {
  const { isOpenPopup, openPopup, closePopup } = usePopup();
  const { chainId, isActive, account } = useWeb3React();
  const { formatMessage } = useIntl();
  const license = useLicense();
  const { profile } = useUser<any>();
  const { closeConnectWalletDialog } = useWallet();

  const handleOpenWalletDialog = () => {
    openPopup(WALLET_MENU_POPUP_TYPE);
  };

  const handleCloseWalletDialog = () => {
    closePopup();
  };

  const handleOpenConnectDialog = () => {
    openPopup(WALLET_CONNECT_POPUP_TYPE);
  };

  if (!license.isValid()) {
    return null;
  }

  const isChainValid = !chainId || profile?.chainId === chainId;

  const tooltipTitle = useMemo(
    () => (
      <Box sx={{ textAlign: "center" }}>
        {isChainValid
          ? isActive
            ? account!
            : formatMessage({ id: "components.header.wallet.connect" })
          : formatMessage({ id: "components.header.wallet.notValid" })}
      </Box>
    ),
    [account, isActive, isChainValid, profile],
  );

  return (
    <Box mx={1}>
      {isActive ? (
        <Tooltip title={tooltipTitle} enterDelay={300}>
          <IconButton color="inherit" onClick={handleOpenWalletDialog} data-testid="OpenWalletOptionsDialog">
            <Badge color="error" badgeContent="!" invisible={isChainValid}>
              <WalletIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title={tooltipTitle} enterDelay={300}>
          <IconButton color="inherit" onClick={handleOpenConnectDialog} data-testid="OpenWalletConnectDialog">
            <Badge color="error" badgeContent="!" invisible={isChainValid}>
              <WalletIcon />
            </Badge>
          </IconButton>
        </Tooltip>
      )}
      <WalletDialog onClose={closeConnectWalletDialog} open={isOpenPopup(WALLET_CONNECT_POPUP_TYPE)} />
      <WalletMenuDialog onClose={handleCloseWalletDialog} open={isOpenPopup(WALLET_MENU_POPUP_TYPE)} />
    </Box>
  );
};
