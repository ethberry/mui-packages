import { FC, useContext, useState } from "react";
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { providers } from "ethers";

import { usePopup } from "@gemunion/provider-popup";
import { useLicense } from "@gemunion/provider-license";
import { useApi } from "@gemunion/provider-api";
import { useUser } from "@gemunion/provider-user";

import { IConnectorsArgs, TConnectors } from "../connectors";
import { INetwork } from "../interfaces";
import { WalletContext } from "./context";
import { STORE_CONNECTOR, CONNECT_POPUP_TYPE, networks } from "./constants";
import { Reconnect } from "../reconnect";
import { CheckNetwork } from "../checkNetwork";
import { Authorization } from "../authorization";

interface IWalletProviderProps {
  targetNetwork?: INetwork;
  connectorsArgs?: IConnectorsArgs;
  disableMetamaskAuthorization?: boolean;
}

const targetNetworkId = parseInt(process.env.CHAIN_ID ?? "1");

export const WalletProvider: FC<IWalletProviderProps> = props => {
  const { targetNetwork = networks[targetNetworkId], connectorsArgs, disableMetamaskAuthorization, children } = props;

  const { isOpenPopup, openPopup, closePopup } = usePopup();
  const license = useLicense();

  const [network, setNetwork] = useState<INetwork>(targetNetwork);
  const [activeConnector, setActiveConnector] = useState<TConnectors | null>(
    localStorage.getItem(STORE_CONNECTOR) as TConnectors | null,
  );

  const getLibrary = (provider: any) => {
    return new providers.Web3Provider(provider);
  };

  const getWalletConnectDialogOpen = (): boolean => {
    return isOpenPopup(CONNECT_POPUP_TYPE);
  };

  const setWalletConnectDialogOpen = (value: boolean) => {
    value ? openPopup(CONNECT_POPUP_TYPE) : closePopup();
  };

  const setActiveConnectorHandle = (value: TConnectors | null) => {
    setActiveConnector(value);
    localStorage.setItem(STORE_CONNECTOR, JSON.stringify(value));
  };

  if (!license.isValid()) {
    return null;
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <WalletContext.Provider
        value={{
          connectPopupType: CONNECT_POPUP_TYPE,
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
          {!disableMetamaskAuthorization && <Authorization network={network} />}
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
