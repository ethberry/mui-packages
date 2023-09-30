import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";

import { useLicense } from "@gemunion/provider-license";

import { ICoinGeckoCoinTicker, ICoinGeckoTickers } from "./interfaces";

import { CoinGeckoContext } from "./context";

export interface ICoinGeckoProviderProps {
  defaultCurrency?: string;
  defaultMarkets?: Array<string>;
}

export const CoinGeckoProvider: FC<PropsWithChildren<ICoinGeckoProviderProps>> = props => {
  const { children, defaultCurrency = "ethereum", defaultMarkets = ["binance"] } = props;
  const license = useLicense();
  const { formatMessage } = useIntl();

  const [baseCoinId, setBaseCoinId] = useState<string>(defaultCurrency);
  const [tickers, setTickers] = useState<Array<ICoinGeckoCoinTicker>>([]);

  let interval: NodeJS.Timeout;

  const fetchCoinTickers = async () => {
    return fetch(
      // prettier-ignore
      `https://api.coingecko.com/api/v3/coins/${baseCoinId.toLowerCase()}/tickers?exchange_ids=${defaultMarkets.join(",")}`,
    )
      .then(response => response.json())
      .then((json: ICoinGeckoTickers) => {
        setTickers(json.tickers);
      })
      .catch(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
      });
  };

  const getPriceByTickerName = (target: string) => {
    const { last = 0 } = Object(tickers.find(ticker => ticker.target === target));
    return Math.trunc(last * 100) / 100;
  };

  useEffect(() => {
    void fetchCoinTickers();
  }, [baseCoinId]);

  useEffect(() => {
    if (!interval) {
      interval = setInterval(() => {
        void fetchCoinTickers();
      }, 300000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!license.isValid()) {
    return null;
  }

  return (
    <CoinGeckoContext.Provider
      value={{
        getPriceByTickerName,
        baseCoinId,
        setBaseCoinId,
      }}
    >
      {children}
    </CoinGeckoContext.Provider>
  );
};
