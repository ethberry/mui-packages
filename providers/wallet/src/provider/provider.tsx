import { FC, useContext, useState } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";

import { usePopup } from "@gemunion/provider-popup";

import { IConnectorsArgs, TConnectors } from "../connectors";
import { WalletContext } from "./context";
import { Reconnect } from "../reconnect";
import { STORE_CONNECTOR } from "./constants";
import { CheckNetwork } from "../checkNetwork";
import { INetwork } from "../interfaces";

interface IWalletProviderProps {
  connectPopupType: symbol;
  targetNetwork: INetwork;
  connectorsArgs?: IConnectorsArgs;
}

export const WalletProvider: FC<IWalletProviderProps> = props => {
  const { connectPopupType, targetNetwork, connectorsArgs, children } = props;

  const { isOpenPopup, openPopup, closePopup } = usePopup();

  const [activeConnector, setActiveConnector] = useState<TConnectors | null>(
    localStorage.getItem(STORE_CONNECTOR) as TConnectors | null,
  );

  const getLibrary = (provider: any) => {
    return new providers.Web3Provider(provider);
  };

  const getWalletConnectDialogOpen = (): boolean => {
    return isOpenPopup(connectPopupType);
  };

  const setWalletConnectDialogOpen = (value: boolean) => {
    if (value) {
      openPopup(connectPopupType);
    } else {
      closePopup();
    }
  };

  const resetActiveConnector = () => {
    setActiveConnector(null);
    localStorage.removeItem(STORE_CONNECTOR);
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletContext.Provider
        value={{
          connectPopupType,
          activeConnector,
          resetActiveConnector,
          getWalletConnectDialogOpen,
          setWalletConnectDialogOpen,
        }}
      >
        <>
          {children}
          <Reconnect activeConnector={activeConnector} connectorsArgs={connectorsArgs} />
          <CheckNetwork network={targetNetwork} />
        </>
      </WalletContext.Provider>
    </Web3ReactProvider>
  );
};

export function useWallet() {
  return useContext(WalletContext);
}
