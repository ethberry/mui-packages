import { createContext } from "react";
import { TConnectors } from "../connectors";

export interface IWalletContext {
  getWalletConnectDialogOpen: () => boolean;
  setWalletConnectDialogOpen: (isOpen: boolean) => void;
  connectPopupType: symbol;
  activeConnector: TConnectors | null;
  resetActiveConnector: () => void;
}

export const WalletContext = createContext<IWalletContext>(undefined!);
