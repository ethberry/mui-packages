import { FC } from "react";
import { AccountBalanceWallet } from "@mui/icons-material";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { useWeb3React } from "@web3-react/core";

import { MetaMask, WalletConnect } from "../dialog/icons";

export const WalletIcon: FC = () => {
  const { connector } = useWeb3React();

  switch (true) {
    case connector instanceof InjectedConnector:
      return <MetaMask viewBox="0 0 24 24" sx={{ fontSize: 24 }} />;
    case connector instanceof WalletConnectConnector:
      return <WalletConnect viewBox="0 0 24 24" sx={{ fontSize: 24 }} />;
    default:
      return <AccountBalanceWallet />;
  }
};
