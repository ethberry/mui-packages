import { FC } from "react";
import { SvgIconProps } from "@mui/material";

import {
  Arbitrum,
  Besu,
  Binance,
  Ethereum,
  Optimism,
  Polygon,
  Sepolia,
  ImmutableZkEVM,
  Telos,
} from "@gemunion/mui-icons";

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
    case 80002:
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
