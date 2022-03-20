import { createContext } from "react";

export interface IWalletContext {
  getWalletConnectDialogOpen: () => boolean;
  setWalletConnectDialogOpen: (isOpen: boolean) => void;
}

export const WalletContext = createContext<IWalletContext>(undefined!);
