import { createContext } from "react";

export interface ICoinGeckoContext {
  coinPrice: number | null;
}

export const CoinGeckoContext = createContext<ICoinGeckoContext>(undefined!);
