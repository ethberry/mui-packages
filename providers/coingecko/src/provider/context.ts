import { createContext } from "react";

export interface ICoinGeckoContext {
  getPriceByTickerName: (name: string) => number | undefined;
  baseCoinId: string;
  setBaseCoinId: (name: string) => void;
}

export const CoinGeckoContext = createContext<ICoinGeckoContext>(undefined!);
