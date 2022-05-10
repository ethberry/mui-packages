import { FC, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { TConnectors, getConnectorName, getConnectorByName, IConnectorsArgs } from "../connectors";
import { STORE_CONNECTOR } from "../provider";

interface IReconnectProps {
  connectorsArgs?: IConnectorsArgs;
  activeConnector: TConnectors | null;
}

export const Reconnect: FC<IReconnectProps> = props => {
  const { connectorsArgs, activeConnector } = props;

  const { activate, active, connector } = useWeb3React();

  const handleConnect = async () => {
    if (activeConnector) {
      await activate(getConnectorByName(activeConnector, connectorsArgs)!);
    }
  };

  useEffect(() => {
    void handleConnect();
  }, []);

  useEffect(() => {
    if (active) {
      const newConnector = getConnectorName(connector);

      if (newConnector) {
        localStorage.setItem(STORE_CONNECTOR, newConnector);
      }
    }
  }, [active]);

  return null;
};
