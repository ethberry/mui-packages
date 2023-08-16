import { createContext } from "react";

import { ICosmosParams, ICosmosChain } from "../interfaces";

export interface ICosmosContext {
  chain: ICosmosChain | null;
  closeConnectCosmosDialog: () => void;
  isDialogOpen: () => boolean;
  isKeplrConnected: boolean;
  openConnectCosmosDialog: () => Promise<ICosmosParams>;
  registeredChains: ICosmosChain[];
  setChain: (chain: ICosmosChain) => void;
  setIsKeplrConnected: (value: boolean) => void;
  account: string | null;
  setAccount: (account: string | null) => void;
}

export const CosmosContext = createContext<ICosmosContext>(undefined!);
