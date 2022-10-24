import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Web3ReactProvider, Web3ReactHooks, Web3ContextType } from "@web3-react/core";

import { useLicense } from "@gemunion/provider-license";
import { usePopup } from "@gemunion/provider-popup";
import { useUser } from "@gemunion/provider-user";

import { ConnectorsTypes } from "../connectors";
import { TConnectors } from "../connectors/types";
import { metaMask, hooks as metaMaskHooks } from "../connectors/meta-mask";
import { walletConnect, hooks as walletConnectHooks } from "../connectors/wallet-connect";
import { INetwork } from "../interfaces";
import { WalletContext } from "./context";
import { getNetworkForWeb3Provider, networks, STORE_CONNECTOR, WALLET_CONNECT_POPUP_TYPE } from "./constants";
import { Reconnect } from "../reconnect";
import { CheckNetwork } from "../check-network";
import { OnWalletConnect } from "../on-wallet-connect";

const connectors: [ConnectorsTypes, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
];

export const WalletProvider: FC<PropsWithChildren> = props => {
  const { children } = props;

  const license = useLicense();
  const { openPopup, closePopup, isOpenPopup } = usePopup();
  const { profile } = useUser<any>();

  const [network, setNetwork] = useState<INetwork | null>(null);

  const storedConnector = localStorage.getItem(STORE_CONNECTOR);
  const [activeConnector, setActiveConnector] = useState<TConnectors | null>(
    storedConnector ? (JSON.parse(storedConnector) as TConnectors) : null,
  );

  const [resolve, setResolve] = useState<((context: Web3ContextType) => void) | null>(null);

  const openConnectWalletDialog = (): Promise<any> => {
    openPopup(WALLET_CONNECT_POPUP_TYPE);

    return new Promise(_resolve => {
      setResolve(() => {
        return _resolve;
      });
    });
  };

  const resetConnect = (): void => {
    setResolve(null);
  };

  const isDialogOpen = (): boolean => {
    return isOpenPopup(WALLET_CONNECT_POPUP_TYPE);
  };

  const closeConnectWalletDialog = (): void => {
    closePopup();
    resetConnect();
  };

  const setActiveConnectorHandle = (value: TConnectors | null) => {
    setActiveConnector(value);
    localStorage.setItem(STORE_CONNECTOR, JSON.stringify(value));
  };

  const connectCallback = useCallback(
    async (fn: () => Promise<any>) => {
      await fn();
    },
    [resolve],
  );

  useEffect(() => {
    if (profile?.chainId) {
      setNetwork(networks[profile.chainId]);
    }
  }, [profile]);

  if (!license.isValid()) {
    return null;
  }

  const providerNetwork = network ? getNetworkForWeb3Provider(network.chainId) : undefined;

  return (
    <Web3ReactProvider connectors={connectors} network={providerNetwork}>
      <WalletContext.Provider
        value={{
          activeConnector,
          setActiveConnector: setActiveConnectorHandle,
          openConnectWalletDialog,
          isDialogOpen,
          closeConnectWalletDialog,
          network,
          setNetwork,
          connectCallback,
        }}
      >
        <>
          {children}
          <Reconnect activeConnector={activeConnector} />
          <CheckNetwork />
          <OnWalletConnect resolveContext={resolve} resetConnect={resetConnect} />
        </>
      </WalletContext.Provider>
    </Web3ReactProvider>
  );
};
