import { FC } from "react";
import { SvgIconProps } from "@mui/material";

import { Arbitrum } from "./arbitrum";
import { Besu } from "./besu";
import { Binance } from "./binance";
import { Ethereum } from "./ethereum";
import { Optimism } from "./optimism";
import { Polygon } from "./polygon";
import { Sepolia } from "./sepolia";
import { ImmutableZkEVM } from "./immutable-zk-evm";
import { Telos } from "./telos";

export const getIconByChainId = (chainId: number): FC<SvgIconProps> | null => {
  switch (chainId) {
    case 1:
    case 5:
      return Ethereum;
    case 10:
      return Optimism;
    case 56:
    case 97:
      return Binance;
    case 137:
    case 80001:
      return Polygon;
    case 42161:
      return Arbitrum;
    case 11155111:
      return Sepolia;
    case 13378:
    case 13377:
    case 10000:
    case 10001:
      return Besu;
    case 13371:
    case 13473:
      return ImmutableZkEVM;
    case 40:
    case 41:
      return Telos;
    default:
      return null;
  }
};
