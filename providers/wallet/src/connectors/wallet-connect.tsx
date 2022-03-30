import { WalletConnectConnector, WalletConnectConnectorArguments } from "@web3-react/walletconnect-connector";

export const getWalletConnectConnector = (args?: WalletConnectConnectorArguments) => {
  return new WalletConnectConnector({
    // supportedChainIds: Object.values(networkToChainId),
    rpc: {
      1: process.env.JSON_RPC_ADDR as string,
    },
    qrcode: true,
    ...args,
  });
};

export { WalletConnectConnector };
