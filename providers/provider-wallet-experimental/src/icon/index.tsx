import { FC } from "react";
import { AccountBalanceWallet } from "@mui/icons-material";

import { MetaMaskIcon, WalletConnectIcon } from "../dialog/wallet-icons";
import { metaMaskHooks, walletConnectHooks } from "../connectors";

export const WalletIcon: FC = () => {
  if (metaMaskHooks.useIsActive()) {
    return <MetaMaskIcon viewBox="0 0 60 60" sx={{ fontSize: 24 }} />;
  }

  if (walletConnectHooks.useIsActive()) {
    return <WalletConnectIcon viewBox="0 0 60 60" sx={{ fontSize: 24 }} />;
  }

  return <AccountBalanceWallet />;
};
