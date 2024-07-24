import type { Networkish } from "@ethersproject/networks";

import type { INetwork } from "@gemunion/types-blockchain";

import { Networks, networkToChainId } from "../constants";

export const chainIdToNetwork: Record<number, Networks> = (Object.keys(networkToChainId) as Networks[]).reduce(
  (memo: Record<number, Networks>, current: Networks) => {
    memo[networkToChainId[current]] = current;
    return memo;
  },
  {},
);

export const SANDBOX_CHAINS = [5, 97, 80002, 10001, 10000, 11155111, 13473];

export const WALLET_CONNECT_POPUP_TYPE = Symbol("WALLET_CONNECT_POPUP_TYPE");
export const WALLET_MENU_POPUP_TYPE = Symbol("WALLET_MENU_POPUP_TYPE");

export const getNetworkForWeb3Provider = (chainId: number, networks: Record<number, INetwork>): Networkish => {
  const network = networks[chainId];

  if (!network) {
    return {
      name: "Ethereum",
      chainId: 1,
    };
  }

  return {
    name: network.chainName,
    chainId: network.chainId,
  };
};
