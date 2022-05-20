import { FC, useContext, useState } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";

import { usePopup } from "@gemunion/provider-popup";

import { IConnectorsArgs, TConnectors } from "../connectors";
import { WalletContext } from "./context";
import { Reconnect } from "../reconnect";
import { STORE_CONNECTOR } from "./constants";
import { CheckNetwork } from "../checkNetwork";
import { Authorization } from "../authorization";
import { INetwork } from "../interfaces";
import { useApi } from "@gemunion/provider-api";
import { useUser } from "@gemunion/provider-user";

interface IWalletProviderProps {
  connectPopupType: symbol;
  targetNetwork: INetwork;
  connectorsArgs?: IConnectorsArgs;
  disableMetamaskAuthorization?: boolean;
}

export const WalletProvider: FC<IWalletProviderProps> = props => {
  const { connectPopupType, targetNetwork, connectorsArgs, disableMetamaskAuthorization, children } = props;

  const { isOpenPopup, openPopup, closePopup } = usePopup();

  const [network, setNetwork] = useState<INetwork>(targetNetwork);
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
    value ? openPopup(connectPopupType) : closePopup();
  };

  const setActiveConnectorHandle = (value: TConnectors | null) => {
    setActiveConnector(value);
    localStorage.setItem(STORE_CONNECTOR, JSON.stringify(value));
  };

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletContext.Provider
        value={{
          connectPopupType,
          activeConnector,
          setActiveConnector: setActiveConnectorHandle,
          getWalletConnectDialogOpen,
          setWalletConnectDialogOpen,
          network,
          setNetwork,
        }}
      >
        <>
          {children}
          <Reconnect activeConnector={activeConnector} connectorsArgs={connectorsArgs} />
          <CheckNetwork network={network} />
          {!disableMetamaskAuthorization && <Authorization targetChainIdHex={network.chainId} />}
        </>
      </WalletContext.Provider>
    </Web3ReactProvider>
  );
};

export function useWallet() {
  const api = useApi();
  const user = useUser();
  const { deactivate } = useWeb3React();
  const wallet = useContext(WalletContext);

  const handleLogout = async () => {
    deactivate();
    wallet.setActiveConnector(null);
    if (api.getToken()) {
      await user.logOut();
    }
  };

  const handleDisconnect = () => {
    deactivate();
    wallet.setActiveConnector(null);
  };

  return { ...wallet, handleLogout, handleDisconnect };
}
