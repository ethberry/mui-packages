import { Networks } from "./interfaces";

export const STORE_CONNECTOR = "CONNECTOR";

export const networkToChainId: Record<Networks, number> = {
  [Networks.ETHEREUM]: 1,
  [Networks.GOERLY]: 5,
  [Networks.BINANCE]: 56,
  [Networks.BINANCE_TEST]: 97,
  [Networks.POLYGON]: 137,
  [Networks.MUMBAI]: 80001,
  [Networks.OPTIMISM]: 10,
  [Networks.ARBITRUM]: 42161,
  [Networks.SEPOLIA]: 11155111,
  [Networks.BESU]: 10001,
  [Networks.GEMUNION]: 10000,
};

// information from https://chainlist.org/
export const rpcUrls: Record<string, string[]> = {
  [networkToChainId[Networks.ETHEREUM]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_ETHEREUM,
    /* javascript-obfuscator:enable */
    "https://main-rpc.linkpool.io",
    "https://eth-mainnet.public.blastapi.io",
    "https://eth-rpc.gateway.pokt.network",
  ],
  [networkToChainId[Networks.GOERLY]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_GORLY,
    /* javascript-obfuscator:enable */
    "https://rpc.goerli.mudit.blog",
  ],
  [networkToChainId[Networks.BINANCE]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_BINANCE,
    /* javascript-obfuscator:enable */
    "https://bsc-dataseed.binance.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
  ],
  [networkToChainId[Networks.BINANCE_TEST]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_BINANCE_TEST,
    /* javascript-obfuscator:enable */
    "https://data-seed-prebsc-1-s1.binance.org:8545",
    "https://data-seed-prebsc-2-s1.binance.org:8545",
    "http://data-seed-prebsc-1-s2.binance.org:8545",
    "http://data-seed-prebsc-2-s2.binance.org:8545",
    "https://data-seed-prebsc-1-s3.binance.org:8545",
    "https://data-seed-prebsc-2-s3.binance.org:8545",
  ],
  [networkToChainId[Networks.POLYGON]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_POLYGON,
    /* javascript-obfuscator:enable */
    "https://polygon-mainnet.public.blastapi.io",
    "https://matic-mainnet-archive-rpc.bwarelabs.com",
    "https://rpc-mainnet.matic.quiknode.pro",
    "https://polygon-rpc.com",
  ],
  [networkToChainId[Networks.MUMBAI]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_MUMBAI,
    /* javascript-obfuscator:enable */
    "https://matic-mumbai.chainstacklabs.com",
    "https://matic-testnet-archive-rpc.bwarelabs.com",
    "https://rpc-mumbai.maticvigil.com",
  ],
  [networkToChainId[Networks.BESU]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_BESU,
    /* javascript-obfuscator:enable */
    "http://127.0.0.1:8545",
  ],
  [networkToChainId[Networks.GEMUNION]]: [
    /* javascript-obfuscator:disable */
    process.env.JSON_RPC_ADDR_GEMUNION,
    /* javascript-obfuscator:enable */
    "https://besu.gemunion.io",
  ],
};
