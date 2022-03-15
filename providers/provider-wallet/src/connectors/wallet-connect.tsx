import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const walletConnectConnector = new WalletConnectConnector({
  // supportedChainIds: Object.values(networkToChainId),
  rpc: {
    1: process.env.JSON_RPC_ADDR as string,
  },
  qrcode: true,
});

export { WalletConnectConnector };
