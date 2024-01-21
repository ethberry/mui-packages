import type { INetwork } from "@gemunion/types-blockchain";

export interface IWalletState {
  isDialogOpen: boolean;
  activeConnector: TConnectors | null;
  network: INetwork | null;
  networks: Record<number, INetwork>;
}

export enum TConnectors {
  METAMASK = "METAMASK",
  PARTICLE = "PARTICLE",
  WALLETCONNECT = "WALLETCONNECT",
}

export enum Networks {
  ETHEREUM = "ETHEREUM",
  GOERLY = "GOERLY",
  BINANCE = "BINANCE",
  BINANCE_TEST = "BINANCE_TEST",
  POLYGON = "POLYGON",
  MUMBAI = "MUMBAI",
  OPTIMISM = "OPTIMISM",
  ARBITRUM = "ARBITRUM",
  SEPOLIA = "SEPOLIA",
  BESU = "BESU",
  GEMUNION = "GEMUNION",
}
