import { FC, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { STORE_CONNECTOR } from "./constants";
import { TConnectors, getConnectorName, getConnectorByName } from "../connectors";

export const Reconnect: FC = () => {
  const { activate, active, connector } = useWeb3React();
  const connectorStored: TConnectors | null = localStorage.getItem(STORE_CONNECTOR) as TConnectors | null;

  const handleConnect = async () => {
    if (connectorStored) {
      await activate(getConnectorByName(connectorStored)!);
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
