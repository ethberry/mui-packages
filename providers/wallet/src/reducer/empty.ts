import type { IWalletState } from "./interfaces";

export const emptyWalletState: IWalletState = {
  isDialogOpen: false,
  activeConnector: null,
  network: void 0,
  networks: {},
  referrer: "0x0000000000000000000000000000000000000000",
};
