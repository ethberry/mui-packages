import { useContext } from "react";

import { CoinGeckoContext } from "./context";

export const useCoinGecko = () => {
  return useContext(CoinGeckoContext);
};
