import type { ChainInfo } from "@keplr-wallet/types";

export const COSMOS_CONNECT_POPUP_TYPE = Symbol("COSMOS_CONNECT_POPUP_TYPE");
export const COSMOS_MENU_POPUP_TYPE = Symbol("COSMOS_MENU_POPUP_TYPE");

export const chainInfoByChainId: Record<string, ChainInfo> = {
  "xstaxy-1": {
    chainId: "xstaxy-1",
    chainName: "Aura Network",
    chainSymbolImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/xstaxy/chain.png",
    rpc: "https://rpc.aura.network",
    rest: "https://lcd.aura.network",
    nodeProvider: {
      name: "Aura Foundation",
      email: "support@aura.network",
      website: "https://aura.network/",
    },
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "aura",
      bech32PrefixAccPub: "aurapub",
      bech32PrefixValAddr: "auravaloper",
      bech32PrefixValPub: "auravaloperpub",
      bech32PrefixConsAddr: "auravalcons",
      bech32PrefixConsPub: "auravalconspub",
    },
    currencies: [
      {
        coinDenom: "AURA",
        coinMinimalDenom: "uaura",
        coinDecimals: 6,
        coinGeckoId: "aura-network",
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/xstaxy/uaura.png",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "AURA",
        coinMinimalDenom: "uaura",
        coinDecimals: 6,
        coinGeckoId: "aura-network",
        gasPriceStep: {
          low: 0.001,
          average: 0.0025,
          high: 0.004,
        },
        coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/xstaxy/uaura.png",
      },
    ],
    stakeCurrency: {
      coinDenom: "AURA",
      coinMinimalDenom: "uaura",
      coinDecimals: 6,
      coinGeckoId: "aura-network",
      coinImageUrl: "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/xstaxy/uaura.png",
    },
    features: ["cosmwasm"],
    walletUrlForStaking: "https://aurascan.io/",
  },
  "haqq_11235-1": {
    rpc: "https://rpc.tm.haqq.network/",
    rest: "https://rest.cosmos.haqq.network/",
    chainId: "haqq_11235-1",
    chainName: "Haqq Network",
    chainSymbolImageUrl: "https://github.com/cosmos/chain-registry/blob/master/haqq/images/haqq.png",
    stakeCurrency: {
      coinDecimals: 18,
      coinDenom: "ISLM",
      coinMinimalDenom: "aISLM",
      coinImageUrl: "https://github.com/cosmos/chain-registry/blob/master/haqq/images/islm.png",
    },
    bip44: {
      coinType: 60,
    },
    alternativeBIP44s: [
      {
        coinType: 0,
      },
    ],
    bech32Config: {
      bech32PrefixAccAddr: "haqq",
      bech32PrefixAccPub: "haqqpub",
      bech32PrefixConsAddr: "haqqvalcons",
      bech32PrefixConsPub: "haqqvalconspub",
      bech32PrefixValAddr: "haqqvaloper",
      bech32PrefixValPub: "haqqvaloperpub",
    },
    currencies: [
      {
        coinDecimals: 18,
        coinDenom: "ISLM",
        coinMinimalDenom: "aISLM",
        coinImageUrl: "https://github.com/cosmos/chain-registry/blob/master/haqq/images/islm.png",
      },
    ],
    feeCurrencies: [
      {
        coinDecimals: 18,
        coinDenom: "ISLM",
        coinMinimalDenom: "aISLM",
        gasPriceStep: {
          average: 25000000000,
          high: 40000000000,
          low: 20000000000,
        },
        coinImageUrl: "https://github.com/cosmos/chain-registry/blob/master/haqq/images/islm.png",
      },
    ],
    features: ["ibc-transfer", "ibc-go", "eth-address-gen", "eth-key-sign"],
    beta: true,
  },
  "quicksilver-2": {
    rpc: "https://rpc-quicksilver.keplr.app",
    rest: "https://lcd-quicksilver.keplr.app",
    chainId: "quicksilver-2",
    chainName: "Quicksilver",
    chainSymbolImageUrl:
      "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/quicksilver/chain.png",
    stakeCurrency: {
      coinDenom: "QCK",
      coinMinimalDenom: "uqck",
      coinDecimals: 6,
      coinGeckoId: "quicksilver",
      coinImageUrl:
        "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/quicksilver/uqck.png",
    },
    walletUrlForStaking: "https://wallet.keplr.app/chains/quicksilver",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "quick",
      bech32PrefixAccPub: "quickpub",
      bech32PrefixValAddr: "quickvaloper",
      bech32PrefixValPub: "quickvaloperpub",
      bech32PrefixConsAddr: "quickvalcons",
      bech32PrefixConsPub: "quickvalconspub",
    },
    currencies: [
      {
        coinDenom: "QCK",
        coinMinimalDenom: "uqck",
        coinDecimals: 6,
        coinGeckoId: "quicksilver",
        coinImageUrl:
          "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/quicksilver/uqck.png",
      },
      {
        coinDenom: "qSTARS",
        coinMinimalDenom: "uqstars",
        coinDecimals: 6,
      },
      {
        coinDenom: "qATOM",
        coinMinimalDenom: "uqatom",
        coinDecimals: 6,
      },
      {
        coinDenom: "qREGEN",
        coinMinimalDenom: "uqregen",
        coinDecimals: 6,
      },
      {
        coinDenom: "qOSMO",
        coinMinimalDenom: "uqosmo",
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "QCK",
        coinMinimalDenom: "uqck",
        coinDecimals: 6,
        coinGeckoId: "quicksilver",
        coinImageUrl:
          "https://raw.githubusercontent.com/chainapsis/keplr-chain-registry/main/images/quicksilver/uqck.png",
        gasPriceStep: {
          low: 0.0001,
          average: 0.0001,
          high: 0.00025,
        },
      },
    ],
    features: [],
  },
};
