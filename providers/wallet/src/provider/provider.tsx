import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { Web3ReactProvider, Web3ReactHooks, Web3ContextType } from "@web3-react/core";

import type { INetwork } from "@gemunion/types-blockchain";
import { useLicense } from "@gemunion/provider-license";
import { useUser } from "@gemunion/provider-user";
import { useAppDispatch, useAppSelector } from "@gemunion/redux";

import { ConnectorsTypes } from "../connectors";
import { metaMask, hooks as metaMaskHooks } from "../connectors/meta-mask";
import { particleAuth, hooks as particleHooks } from "../connectors/particle";
import { WalletContext } from "./context";
import { getNetworkForWeb3Provider } from "./constants";
import { Reconnect } from "../reconnect";
import { CheckNetwork } from "../check-network";
import { OnWalletConnect } from "../on-wallet-connect";
import { walletSelectors, walletActions, TWalletConnectorTuple } from "../reducer";
import { useReferrer } from "../hooks";
import { withNetworksFetching } from "./withNetworksFetching";

const _WalletProvider: FC<PropsWithChildren> = props => {
  const { children } = props;

  const license = useLicense();
  const { profile } = useUser<any>();
  const network = useAppSelector<INetwork>(walletSelectors.networkSelector);
  const networks = useAppSelector<Record<number, INetwork>>(walletSelectors.networksSelector);
  const [walletConnect, walletConnectHooks] = useAppSelector<TWalletConnectorTuple>(
    walletSelectors.walletConnectorSelector,
  );
  const { setIsDialogOpen, setNetwork } = walletActions;
  const dispatch = useAppDispatch();
  useReferrer(dispatch);

  const [resolve, setResolve] = useState<((context: Web3ContextType) => void) | null>(null);

  const connectors: [ConnectorsTypes, Web3ReactHooks][] = [
    [metaMask, metaMaskHooks],
    [particleAuth, particleHooks],
    [walletConnect, walletConnectHooks],
  ];

  const openConnectWalletDialog = (): Promise<any> => {
    dispatch(setIsDialogOpen(true));

    return new Promise(_resolve => {
      setResolve(() => _resolve);
    });
  };

  const resetConnect = (): void => {
    setResolve(null);
  };

  const closeConnectWalletDialog = (): void => {
    dispatch(setIsDialogOpen(false));
    resetConnect();
  };

  const connectCallback = useCallback(async (fn: () => Promise<any>) => fn(), [resolve]);

  useEffect(() => {
    if (profile?.chainId && networks[profile.chainId]) {
      dispatch(setNetwork(networks[profile.chainId]));
    }
  }, [profile?.chainId, networks]);

  if (!license.isValid()) {
    return null;
  }

  const providerNetwork = network ? getNetworkForWeb3Provider(network.chainId, networks) : undefined;

  return (
    <Web3ReactProvider connectors={connectors} network={providerNetwork}>
      <WalletContext.Provider
        value={{
          openConnectWalletDialog,
          closeConnectWalletDialog,
          connectCallback,
        }}
      >
        <>
          {children}
          <Reconnect />
          <CheckNetwork />
          <OnWalletConnect resolveContext={resolve} resetConnect={resetConnect} />
        </>
      </WalletContext.Provider>
    </Web3ReactProvider>
  );
};

export const WalletProvider = withNetworksFetching(_WalletProvider);
