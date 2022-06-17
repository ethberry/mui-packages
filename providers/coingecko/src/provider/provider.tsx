import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { ICoinGeckoCoin } from "./interfaces";

import { CoinGeckoContext } from "./context";

export const CoinGeckoProvider: FC = props => {
  const { children } = props;
  const { formatMessage } = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [coinPrice, setCoinPrice] = useState<number | null>(null);

  let interval: NodeJS.Timer | null = null;

  const fetchCoinGecko = async () => {
    return fetch("https://api.coingecko.com/api/v3/coins/ethereum/tickers")
      .then(response => response.json())
      .then((json: Pick<ICoinGeckoCoin, "name" | "tickers">) => {
        setCoinPrice(json.tickers.find(ticker => ticker.target === "USD")?.last ?? 0);
      })
      .catch(() => {
        enqueueSnackbar(formatMessage({ id: "snackbar.internalServerError" }), { variant: "error" });
      });
  };

  useEffect(() => {
    !interval && fetchCoinGecko();
  }, []);

  useEffect(() => {
    if (!interval) {
      interval = setInterval(() => {
        void fetchCoinGecko();
      }, 300000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return <CoinGeckoContext.Provider value={{ coinPrice }}>{children}</CoinGeckoContext.Provider>;
};
