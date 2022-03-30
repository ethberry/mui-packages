import { FC, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { STORE_CONNECTOR } from "./constants";
import { TConnectors, getConnectorName, getConnectorByName, IConnectorsArgs } from "../connectors";

interface IReconnectProps {
  connectorsArgs?: IConnectorsArgs;
}

export const Reconnect: FC<IReconnectProps> = props => {
  const { connectorsArgs } = props;

  const { activate, active, connector } = useWeb3React();
  const connectorStored: TConnectors | null = localStorage.getItem(STORE_CONNECTOR) as TConnectors | null;

  const handleConnect = async () => {
    if (connectorStored) {
      await activate(getConnectorByName(connectorStored, connectorsArgs)!);
    }
  };

  useEffect(() => {
    void handleConnect();
  }, []);

  useEffect(() => {
    if (active) {
      localStorage.setItem(STORE_CONNECTOR, getConnectorName(connector) ?? "");
    } else {
      localStorage.removeItem(STORE_CONNECTOR);
    }
  }, [active]);

  return null;
};
