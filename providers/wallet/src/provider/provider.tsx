import { FC, useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";

import { WalletContext } from "./context";

export const WalletProvider: FC = props => {
  const { children } = props;

  const [isWalletConnectDialogOpen, setWalletConnectDialogOpen] = useState(false);

  const getLibrary = (provider: any) => {
    return new providers.Web3Provider(provider);
  };

  const getWalletConnectDialogOpen = (): boolean => {
    return isWalletConnectDialogOpen;
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletContext.Provider
        value={{
          getWalletConnectDialogOpen,
          setWalletConnectDialogOpen,
        }}
      >
        {children}
      </WalletContext.Provider>
    </Web3ReactProvider>
  );
};
