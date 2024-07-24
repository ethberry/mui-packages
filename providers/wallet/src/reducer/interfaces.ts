import type { INetwork } from "@gemunion/types-blockchain";

export interface IWalletState {
  isDialogOpen: boolean;
  activeConnector: TConnectors | null;
  network: INetwork | undefined;
  networks: Record<number, INetwork>;
  referrer: string;
}

export enum TConnectors {
  METAMASK = "METAMASK",
  PARTICLE = "PARTICLE",
  WALLETCONNECT = "WALLETCONNECT",
}
