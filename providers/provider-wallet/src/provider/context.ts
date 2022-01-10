import { createContext } from "react";

export interface IThemeContext {
  getWalletConnectDialogOpen: () => boolean;
  setWalletConnectDialogOpen: (isOpen: boolean) => void;
}

export const WalletContext = createContext<IThemeContext>(undefined!);
