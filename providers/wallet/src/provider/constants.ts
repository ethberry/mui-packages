import type { Networkish } from "@ethersproject/networks";

import type { INetwork } from "@gemunion/types-blockchain";

export enum Networks {
  ETHEREUM = "ETHEREUM",
  GOERLY = "GOERLY",
  BINANCE = "BINANCE",
  BINANCE_TEST = "BINANCE_TEST",
  POLYGON = "POLYGON",
  AMOY = "AMOY",
  OPTIMISM = "OPTIMISM",
  ARBITRUM = "ARBITRUM",
  SEPOLIA = "SEPOLIA",
  BESU = "BESU",
  GEMUNION = "GEMUNION",
  IMMUTABLE = "IMMUTABLE",
  IMMUTABLE_TEST = "IMMUTABLE_TEST",
}

export const networkToChainId: Record<Networks, number> = {
  [Networks.ETHEREUM]: 1,
  [Networks.GOERLY]: 5,
  [Networks.BINANCE]: 56,
  [Networks.BINANCE_TEST]: 97,
  [Networks.POLYGON]: 137,
  [Networks.AMOY]: 80002,
  [Networks.OPTIMISM]: 10,
  [Networks.ARBITRUM]: 42161,
  [Networks.SEPOLIA]: 11155111,
  [Networks.BESU]: 10001,
  [Networks.GEMUNION]: 10000,
  [Networks.IMMUTABLE]: 13371,
  [Networks.IMMUTABLE_TEST]: 13473,
};

export const chainIdToNetwork: Record<number, Networks> = (Object.keys(networkToChainId) as Networks[]).reduce(
  (memo: Record<number, Networks>, current: Networks) => {
    memo[networkToChainId[current]] = current;
    return memo;
  },
  {},
);

// information from https://chainlist.org/
export const rpcUrls: Record<string, string[]> = {
  [networkToChainId[Networks.ETHEREUM]]: [
    "https://main-rpc.linkpool.io",
    "https://eth-mainnet.public.blastapi.io",
    "https://eth-rpc.gateway.pokt.network",
  ],
  [networkToChainId[Networks.GOERLY]]: ["https://rpc.goerli.mudit.blog"],
  [networkToChainId[Networks.BINANCE]]: [
    "https://binance.llamarpc.com",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
  ],
  [networkToChainId[Networks.BINANCE_TEST]]: [
    "https://data-seed-prebsc-1-s1.binance.org:8545",
    "https://data-seed-prebsc-2-s1.binance.org:8545",
    "http://data-seed-prebsc-1-s2.binance.org:8545",
    "http://data-seed-prebsc-2-s2.binance.org:8545",
    "https://data-seed-prebsc-1-s3.binance.org:8545",
    "https://data-seed-prebsc-2-s3.binance.org:8545",
  ],
  [networkToChainId[Networks.POLYGON]]: [
    "https://polygon-mainnet.public.blastapi.io",
    "https://matic-mainnet-archive-rpc.bwarelabs.com",
    "https://rpc-mainnet.matic.quiknode.pro",
    "https://polygon-rpc.com",
  ],
  [networkToChainId[Networks.AMOY]]: ["https://rpc-amoy.polygon.technology", "https://rpc.ankr.com/polygon_amoy"],
  [networkToChainId[Networks.BESU]]: ["http://127.0.0.1:8545"],
  [networkToChainId[Networks.GEMUNION]]: ["https://besu.gemunion.io"],
  [networkToChainId[Networks.SEPOLIA]]: ["https://rpc.sepolia.org"],
  [networkToChainId[Networks.IMMUTABLE]]: ["http://rpc.immutable.com", "http://rpc.testnet.immutable.com"],
};

export const SANDBOX_CHAINS = [5, 97, 80002, 10001, 10000, 11155111, 13473];

export const STORE_CONNECTOR = "CONNECTOR";

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
