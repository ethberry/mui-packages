import type { Networkish } from "@ethersproject/networks";

import type { INetwork } from "@gemunion/types-blockchain";

export enum Networks {
  ETHEREUM = 1,
  ETHEREUM_SEPOLIA = 11155111,

  GEMUNION = 10000,
  GEMUNION_BESU = 10001,

  BINANCE = 56,
  BINANCE_TEST = 97,

  POLYGON = 137,
  POLYGON_AMOY = 80002,

  AVALANCHE = 43114,
  AVALANCHE_FUJI = 43113,

  FANTOM = 250,
  FANTOM_TEST = 4002,

  ARBITRUM = 42161,
  ARBITRUM_SEPOLIA = 421614,

  OPTIMISM = 10,
  OPTIMISM_SEPOLIA = 11155420,

  IMMUTABLE = 13371,
  IMMUTABLE_TEST = 13473,
}

// information from https://chainlist.org/
export const rpcUrls: Record<string, string[]> = {
  [Networks.ETHEREUM]: [
    "https://main-rpc.linkpool.io",
    "https://eth-mainnet.public.blastapi.io",
    "https://eth-rpc.gateway.pokt.network",
  ],
  [Networks.ETHEREUM_SEPOLIA]: ["https://rpc.sepolia.org"],
  [Networks.BINANCE]: [
    "https://binance.llamarpc.com",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
  ],
  [Networks.BINANCE_TEST]: [
    "https://data-seed-prebsc-1-s1.binance.org:8545",
    "https://data-seed-prebsc-2-s1.binance.org:8545",
    "http://data-seed-prebsc-1-s2.binance.org:8545",
    "http://data-seed-prebsc-2-s2.binance.org:8545",
    "https://data-seed-prebsc-1-s3.binance.org:8545",
    "https://data-seed-prebsc-2-s3.binance.org:8545",
  ],
  [Networks.POLYGON]: [
    "https://polygon-mainnet.public.blastapi.io",
    "https://matic-mainnet-archive-rpc.bwarelabs.com",
    "https://rpc-mainnet.matic.quiknode.pro",
    "https://polygon-rpc.com",
  ],
  [Networks.POLYGON_AMOY]: [
    "https://matic-mumbai.chainstacklabs.com",
    "https://matic-testnet-archive-rpc.bwarelabs.com",
    "https://rpc-mumbai.maticvigil.com",
  ],
  [Networks.GEMUNION_BESU]: ["http://127.0.0.1:8545"],
  [Networks.GEMUNION]: ["https://besu.gemunion.io"],
  [Networks.IMMUTABLE]: ["http://rpc.immutable.com"],
  [Networks.IMMUTABLE_TEST]: ["http://rpc.testnet.immutable.com"],
};

export const SANDBOX_CHAINS = [97, 80002, 10001, 10000, 11155111, 13473];

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
