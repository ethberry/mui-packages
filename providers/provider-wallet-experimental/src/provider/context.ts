import { createContext } from "react";
import { Connector } from "@web3-react/types";

export interface IWalletContext {
  isActive: () => boolean;
  getConnector: () => Connector | null;
  getWalletConnectDialogOpen: () => boolean;
  setWalletConnectDialogOpen: (isOpen: boolean) => void;
}

export const WalletContext = createContext<IWalletContext>(undefined!);
