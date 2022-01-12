import type { AddEthereumChainParameter } from "@web3-react/metamask";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

interface IBasicChainInformation {
  urls: Array<string>;
  name: string;
}

interface IExtendedChainInformation extends IBasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: IBasicChainInformation | IExtendedChainInformation,
): chainInformation is IExtendedChainInformation {
  return !!(chainInformation as IExtendedChainInformation).nativeCurrency;
}

export const CHAINS: { [chainId: number]: IBasicChainInformation | IExtendedChainInformation } = {
  1: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Mainnet",
  },
  3: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Ropsten",
  },
  4: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Rinkeby",
  },
  5: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Görli",
  },
  42: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Kovan",
  },
  // Optimism
  10: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Optimistic Ethereum",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },
  69: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Optimistic Kovan",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://kovan-optimistic.etherscan.io"],
  },
  // Arbitrum
  42161: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Arbitrum One",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://arbiscan.io"],
  },
  421611: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Arbitrum Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.arbiscan.io"],
  },
  // Polygon
  137: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Polygon Mainnet",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://polygonscan.com"],
  },
  80001: {
    urls: ["http://127.0.0.1:8545/"],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls.filter(url => url);

  if (validURLs.length) {
    accumulator[chainId] = validURLs;
  }

  return accumulator;
}, {} as Record<string, Array<string>>);
