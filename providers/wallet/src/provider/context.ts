import { createContext } from "react";
import { Web3ContextType } from "@web3-react/core";

import { TConnectors } from "../connectors/types";
import { INetwork } from "../interfaces";

export interface IWalletContext {
  openConnectWalletDialog: () => Promise<Web3ContextType>;
  connectCallback: (fn: () => Promise<any>) => Promise<void>;
  closeConnectWalletDialog: () => void;
  activeConnector: TConnectors | null;
  setActiveConnector: (value: TConnectors | null) => void;
  setNetwork: (network: INetwork) => void;
  network: INetwork;
}

export const WalletContext = createContext<IWalletContext>(undefined!);
