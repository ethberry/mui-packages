import { FC, useState } from "react";
import { Connector } from "@web3-react/types";
import { metaMask, walletConnect, metaMaskHooks, walletConnectHooks } from "../connectors";

import { WalletContext } from "./context";

export const WalletProvider: FC = props => {
  const { children } = props;

  const [isWalletConnectDialogOpen, setWalletConnectDialogOpen] = useState(false);

  const getWalletConnectDialogOpen = (): boolean => {
    return isWalletConnectDialogOpen;
  };

  const isActive = (): boolean => {
    return metaMaskHooks.useIsActive() || walletConnectHooks.useIsActive();
  };

  const getConnector = (): Connector | null => {
    if (metaMaskHooks.useIsActive()) {
      return metaMask;
    }
    if (walletConnectHooks.useIsActive()) {
      // @ts-ignore
      return walletConnect;
    }
    return null;
  };

  return (
    <WalletContext.Provider
      value={{
        isActive,
        getConnector,
        getWalletConnectDialogOpen,
        setWalletConnectDialogOpen,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
