import { FC, useCallback, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import type { INetwork } from "@gemunion/types-blockchain";
import { useUser } from "@gemunion/provider-user";
import { useAppDispatch, useAppSelector } from "@gemunion/redux";

import { particleAuth } from "../connectors/particle";
import { TConnectors, walletActions, walletSelectors } from "../reducer";

export const CheckNetwork: FC = () => {
  const { isActive, chainId, connector } = useWeb3React();
  const network = useAppSelector<INetwork>(walletSelectors.networkSelector);
  const activeConnector = useAppSelector(walletSelectors.activeConnectorSelector);
  const { setActiveConnector } = walletActions;
  const dispatch = useAppDispatch();
  const user = useUser<any>();
  const userIsAuthenticated = user.isAuthenticated();

  const handleDisconnect = () => {
    if (connector?.deactivate) {
      void connector.deactivate();
    } else {
      void connector.resetState();
    }
    dispatch(setActiveConnector(null));
  };

  const checkChainId = useCallback(async () => {
    if (!network) {
      return;
    }

    if (activeConnector === TConnectors.PARTICLE) {
      return particleAuth.switchChain(network.chainId);
    }

    try {
      await connector?.provider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${network.chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await connector?.provider?.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${network.chainId.toString(16)}`,
                chainName: network.chainName,
                blockExplorerUrls: network.blockExplorerUrls,
                rpcUrls: network.rpcUrls,
                nativeCurrency: network.nativeCurrency,
              },
            ],
          });
          await connector?.provider?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${network.chainId.toString(16)}` }],
          });
        } catch (addError: any) {
          handleDisconnect();
          console.error(addError);
        }
      } else if (error.code === 4001) {
        handleDisconnect();
        console.error(error);
      }
    }
  }, [activeConnector, connector, network]);

  useEffect(() => {
    if (connector && isActive && chainId) {
      void checkChainId();
    }
  }, [connector, isActive, chainId, network]);

  useEffect(() => {
    if (network && !userIsAuthenticated) {
      handleDisconnect();
    }
  }, [network, userIsAuthenticated]);

  return null;
};
