import { Web3ContextType } from "@web3-react/core";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";

import { IFetchProps, useApi } from "@gemunion/provider-api";
import { IServerSignature } from "@gemunion/types-blockchain";

import { IHandlerOptionsParams } from "./interfaces";

export const useServerSignature = (
  fn: (...args: Array<any>) => Promise<void>,
  options: IHandlerOptionsParams = {},
): ((params: IFetchProps, values: Record<string, any> | null, web3Context: Web3ContextType) => Promise<any>) => {
  const { error = true } = options;
  const api = useApi();
  const { formatMessage } = useIntl();

  return async (params: IFetchProps, values: Record<string, any> | null, web3Context: Web3ContextType) => {
    return api
      .fetchJson(params)
      .then((sign: IServerSignature) => fn(values, web3Context, sign))
      .catch((e: any) => {
        if (error) {
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
          if (e.status === 400) {
            console.error(e.getLocalizedValidationErrors());
          } else if (e.status === 404) {
            console.error("[server error]", e);
          }
          return null;
        }
        throw e;
      });
  };
};
