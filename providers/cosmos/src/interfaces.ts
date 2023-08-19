import { Keplr, OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";

export interface ICosmosParams {
  keplr: Keplr;
  offlineSigner: OfflineAminoSigner & OfflineDirectSigner;
}

/**
 * Cosmos Chain.json is a metadata file that contains information about a cosmos sdk based chain.
 */
export interface ICosmosChain {
  chain_name: string;
  chain_id: string;
  pre_fork_chain_name?: string;
  pretty_name?: string;
  website?: string;
  update_link?: string;
  status?: "live" | "upcoming" | "killed";
  network_type?: "mainnet" | "testnet" | "devnet";
  /**
   * The default prefix for the human-readable part of addresses that identifies the coin type. Must be registered with SLIP-0173. E.g., 'cosmos'
   */
  bech32_prefix: string;
  /**
   * Used to override the bech32_prefix for specific uses.
   */
  bech32_config?: {
    /**
     * e.g., 'cosmos'
     */
    bech32PrefixAccAddr?: string;
    /**
     * e.g., 'cosmospub'
     */
    bech32PrefixAccPub?: string;
    /**
     * e.g., 'cosmosvaloper'
     */
    bech32PrefixValAddr?: string;
    /**
     * e.g., 'cosmosvaloperpub'
     */
    bech32PrefixValPub?: string;
    /**
     * e.g., 'cosmosvalcons'
     */
    bech32PrefixConsAddr?: string;
    /**
     * e.g., 'cosmosvalconspub'
     */
    bech32PrefixConsPub?: string;
  };
  daemon_name?: string;
  node_home?: string;
  key_algos?: ("secp256k1" | "ethsecp256k1" | "ed25519" | "sr25519")[];
  slip44?: number;
  alternative_slip44s?: number[];
  fees?: {
    fee_tokens: IFeeToken[];
  };
  staking?: {
    staking_tokens: IStakingToken[];
    lock_duration?: {
      /**
       * The number of blocks for which the staked tokens are locked.
       */
      blocks?: number;
      /**
       * The approximate time for which the staked tokens are locked.
       */
      time?: string;
    };
  };
  codebase?: {
    git_repo?: string;
    recommended_version?: string;
    compatible_versions?: string[];
    binaries?: {
      "linux/amd64"?: string;
      "linux/arm64"?: string;
      "darwin/amd64"?: string;
      "darwin/arm64"?: string;
      "windows/amd64"?: string;
      "windows/arm64"?: string;
    };
    cosmos_sdk_version?: string;
    consensus?: {
      type: "tendermint" | "cometbft";
      version?: string;
    };
    cosmwasm_version?: string;
    cosmwasm_enabled?: boolean;
    /**
     * Relative path to the cosmwasm directory. ex. $HOME/.juno/data/wasm
     */
    cosmwasm_path?: string;
    ibc_go_version?: string;
    /**
     * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
     */
    ics_enabled?: ("ics20-1" | "ics27-1" | "mauth")[];
    genesis?: {
      name?: string;
      genesis_url: string;
      ics_ccv_url?: string;
    };
    versions?: {
      /**
       * Official Upgrade Name
       */
      name: string;
      /**
       * Git Upgrade Tag
       */
      tag?: string;
      /**
       * Block Height
       */
      height?: number;
      /**
       * Proposal that will officially signal community acceptance of the upgrade.
       */
      proposal?: number;
      /**
       * [Optional] Name of the following version
       */
      next_version_name?: string;
      recommended_version?: string;
      compatible_versions?: string[];
      cosmos_sdk_version?: string;
      consensus?: {
        type: "tendermint" | "cometbft";
        version?: string;
      };
      cosmwasm_version?: string;
      cosmwasm_enabled?: boolean;
      /**
       * Relative path to the cosmwasm directory. ex. $HOME/.juno/data/wasm
       */
      cosmwasm_path?: string;
      ibc_go_version?: string;
      /**
       * List of IBC apps (usually corresponding to a ICS standard) which have been enabled on the network.
       */
      ics_enabled?: ("ics20-1" | "ics27-1" | "mauth")[];
      binaries?: {
        "linux/amd64"?: string;
        "linux/arm64"?: string;
        "darwin/amd64"?: string;
        "darwin/arm64"?: string;
        "windows/amd64"?: string;
        "windows/arm64"?: string;
      };
    }[];
  };
  images?: {
    png?: string;
    svg?: string;
    theme?: {
      primary_color_hex?: string;
    };
  }[];
  logo_URIs?: {
    png?: string;
    svg?: string;
  };
  peers?: {
    seeds?: IPeer[];
    persistent_peers?: IPeer[];
  };
  apis?: {
    rpc?: IEndpoint[];
    rest?: IEndpoint[];
    grpc?: IEndpoint[];
    wss?: IEndpoint[];
    "grpc-web"?: IEndpoint[];
    "evm-http-jsonrpc"?: IEndpoint[];
  };
  explorers?: IExplorer[];
  keywords?: string[];
  extra_codecs?: ("ethermint" | "injective")[];
  assets?: IAsset[];
}

export interface IFeeToken {
  denom: string;
  fixed_min_gas_price?: number;
  low_gas_price?: number;
  average_gas_price?: number;
  high_gas_price?: number;
  gas_costs?: {
    cosmos_send?: number;
    ibc_transfer?: number;
  };
}

export interface IStakingToken {
  denom: string;
}

export interface IPeer {
  id: string;
  address: string;
  provider?: string;
}

export interface IEndpoint {
  address: string;
  provider?: string;
  archive?: boolean;
}

export interface IExplorer {
  kind?: string;
  url?: string;
  tx_page?: string;
  account_page?: string;
}

export interface IAsset {
  /**
   * [OPTIONAL] A short description of the asset
   */
  description?: string;
  denom_units: IDenomUnit[];
  /**
   * [OPTIONAL] The potential options for type of asset. By default, assumes sdk.coin
   */
  type_asset?: "sdk.coin" | "cw20" | "erc20" | "ics20" | "snip20" | "snip25";
  /**
   * [OPTIONAL] The address of the asset. Only required for type_asset : cw20, snip20
   */
  address?: string;
  /**
   * The base unit of the asset. Must be in denom_units.
   */
  base: string;
  /**
   * The project name of the asset. For example Bitcoin.
   */
  name: string;
  /**
   * The human friendly unit of the asset. Must be in denom_units.
   */
  display: string;
  /**
   * The symbol of an asset. For example BTC.
   */
  symbol: string;
  /**
   * The origin of the asset, starting with the index, and capturing all transitions in form and location.
   */
  traces?: (IIbcTransition | IIbcCw20Transition | INonIbcTransition)[];
  /**
   * [OPTIONAL] IBC Channel between src and dst between chain
   */
  ibc?: {
    source_channel: string;
    dst_channel: string;
    source_denom: string;
  };
  logo_URIs?: {
    png?: string;
    svg?: string;
  };
  images?: [
    {
      png?: string;
      svg?: string;
      theme?: {
        primary_color_hex?: string;
      };
    },
    ...{
      png?: string;
      svg?: string;
      theme?: {
        primary_color_hex?: string;
      };
    }[],
  ];
  /**
   * [OPTIONAL] The coingecko id to fetch asset data from coingecko v3 api. See https://api.coingecko.com/api/v3/coins/list
   */
  coingecko_id?: string;
  keywords?: string[];
}

export interface IDenomUnit {
  denom: string;
  exponent: number;
  aliases?: string[];
}

export interface IIbcTransition {
  type: "ibc";
  counterparty: {
    /**
     * The name of the counterparty chain. (must match exactly the chain name used in the Chain Registry)
     */
    chain_name: string;
    /**
     * The base unit of the asset on its source platform. E.g., when describing ATOM from Cosmos Hub, specify 'uatom', NOT 'atom' nor 'ATOM'; base units are unique per platform.
     */
    base_denom: string;
    /**
     * The counterparty IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
  };
  chain: {
    /**
     * The chain's IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
    /**
     * The port/channel/denom input string that generates the 'ibc/...' denom.
     */
    path: string;
  };
}

export interface IIbcCw20Transition {
  type: "ibc-cw20";
  counterparty: {
    /**
     * The name of the counterparty chain. (must match exactly the chain name used in the Chain Registry)
     */
    chain_name: string;
    /**
     * The base unit of the asset on its source platform. E.g., when describing ATOM from Cosmos Hub, specify 'uatom', NOT 'atom' nor 'ATOM'; base units are unique per platform.
     */
    base_denom: string;
    /**
     * The port used to transfer IBC assets; often 'transfer', but sometimes varies, e.g., for outgoing cw20 transfers.
     */
    port: string;
    /**
     * The counterparty IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
  };
  chain: {
    /**
     * The port used to transfer IBC assets; often 'transfer', but sometimes varies, e.g., for outgoing cw20 transfers.
     */
    port: string;
    /**
     * The chain's IBC transfer channel(, e.g., 'channel-1').
     */
    channel_id: string;
    /**
     * The port/channel/denom input string that generates the 'ibc/...' denom.
     */
    path: string;
  };
}

export interface INonIbcTransition {
  type: "bridge" | "liquid-stake" | "synthetic" | "wrapped" | "additional-mintage" | "test-mintage";
  counterparty: {
    /**
     * The chain or platform from which the asset originates. E.g., 'cosmoshub', 'ethereum', 'forex', or 'nasdaq'
     */
    chain_name: string;
    base_denom: string;
    /**
     * The contract address where the transition takes place, where applicable. E.g., The Ethereum contract that locks up the asset while it's minted on another chain.
     */
    contract?: string;
  };
  chain?: {
    /**
     * The contract address where the transition takes place, where applicable. E.g., The Ethereum contract that locks up the asset while it's minted on another chain.
     */
    contract: string;
  };
  /**
   * The entity offering the service. E.g., 'Gravity Bridge' [Network] or 'Tether' [Company].
   */
  provider: string;
}

export interface IUserAccount {
  chainId: string;
  address: string;
}
