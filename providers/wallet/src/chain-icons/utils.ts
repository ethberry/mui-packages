import { FC } from "react";
import { SvgIconProps } from "@mui/material";

import { Arbitrum } from "./arbitrum";
import { Besu } from "./besu";
import { Binance } from "./binance";
import { Ethereum } from "./ethereum";
import { Optimism } from "./optimism";
import { Polygon } from "./polygon";

export const getIconByChainId = (chainId: number): FC<SvgIconProps> | null => {
  switch (chainId) {
    case 1:
      return Ethereum;
    case 10:
      return Optimism;
    case 56:
    case 97:
      return Binance;
    case 137:
      return Polygon;
    case 42161:
      return Arbitrum;
    case 13378:
    case 13377:
      return Besu;
    default:
      return null;
  }
};
