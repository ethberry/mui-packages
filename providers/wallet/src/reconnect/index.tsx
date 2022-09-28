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

  const { isActive, connector } = useWeb3React();
  const { network } = useWallet();

  const handleConnect = useCallback(async () => {
    if (!isActive && activeConnector && network) {
      await getConnectorByName(activeConnector)
        ?.activate(network.chainId)
        .catch((error: ProviderRpcError) => {
          console.error("Reconnect error", error);
        });
    }
  }, [network]);

  useEffect(() => {
    void handleConnect();
  }, [network]);

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
