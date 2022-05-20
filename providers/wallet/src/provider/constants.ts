export enum Networks {
  ETHEREUM = "ETHEREUM",
  ROPSTEN = "ROPSTEN",
  RINKEBY = "RINKEBY",
  GORLY = "GORLY",
  BINANCE = "BINANCE",
  BINANCE_TEST = "BINANCE_TEST",
  POLYGON = "POLYGON",
  OPTIMISM = "OPTIMISM",
  ARBITRUM = "ARBITRUM",
  BESU = "BESU",
}

export const networkToChainId = {
  [Networks.ETHEREUM]: 1,
  [Networks.ROPSTEN]: 3,
  [Networks.RINKEBY]: 4,
  [Networks.GORLY]: 5,
  [Networks.BINANCE]: 56,
  [Networks.BINANCE_TEST]: 97,
  [Networks.POLYGON]: 137,
  [Networks.OPTIMISM]: 10,
  [Networks.ARBITRUM]: 42161,
  [Networks.BESU]: 1337,
};

export const STORE_CONNECTOR = "CONNECTOR";
