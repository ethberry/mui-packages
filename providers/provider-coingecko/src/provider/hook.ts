import { useContext } from "react";

import { CoinGeckoContext } from "./context";

export const useCoinGecko = () => {
  const coinGecko = useContext(CoinGeckoContext);

  return { ...coinGecko };
};
