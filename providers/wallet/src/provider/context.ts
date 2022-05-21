import { createContext } from "react";

import { TConnectors } from "../connectors";
import { INetwork } from "../interfaces";

export interface IWalletContext {
  getWalletConnectDialogOpen: () => boolean;
  setWalletConnectDialogOpen: (isOpen: boolean) => void;
  activeConnector: TConnectors | null;
  setActiveConnector: (value: TConnectors | null) => void;
  setNetwork: (network: INetwork) => void;
  network: INetwork;
}

export const WalletContext = createContext<IWalletContext>(undefined!);
