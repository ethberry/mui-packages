import { FC, useCallback, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ProviderRpcError } from "@web3-react/types";

import { getConnectorName, getConnectorByName } from "../connectors";
import { STORE_CONNECTOR, useWallet } from "../provider";
import { TConnectors } from "../connectors/types";

interface IReconnectProps {
  activeConnector: TConnectors | null;
}

export const Reconnect: FC<IReconnectProps> = props => {
  const { activeConnector } = props;

  const { isActive, chainId, connector } = useWeb3React();
  const { network } = useWallet();

  const handleConnect = useCallback(async () => {
    if ((!isActive || network?.chainId !== chainId) && activeConnector && network) {
      await getConnectorByName(activeConnector)
        ?.activate(network.chainId)
        .catch((error: ProviderRpcError) => {
          console.error("Reconnect error", error);
        });
    }
  }, [chainId, network]);

  useEffect(() => {
    void handleConnect();
  }, [chainId, network]);

  useEffect(() => {
    if (isActive) {
      const newConnector = getConnectorName(connector);

      if (newConnector) {
        localStorage.setItem(STORE_CONNECTOR, JSON.stringify(newConnector));
      }
    }
  }, [isActive, network]);

  return null;
};
