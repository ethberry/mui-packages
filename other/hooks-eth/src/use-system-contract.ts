import { Web3ContextType } from "@web3-react/core";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";

import { useApi } from "@gemunion/provider-api";

import { IHandlerOptionsParams } from "./interfaces";

export const useSystemContract = <T = any, M = any>(
  fn: (...args: Array<any>) => Promise<void>,
  options: IHandlerOptionsParams = {},
): ((contractModule: M, values: Record<string, any> | null, web3Context: Web3ContextType) => Promise<any>) => {
  const { error = true } = options;
  const api = useApi();
  const { formatMessage } = useIntl();

  return async (contractModule: M, values: Record<string, any> | null, web3Context: Web3ContextType) => {
    return api
      .fetchJson({
        url: "/contracts/system",
        method: "POST",
        data: {
          contractModule,
        },
      })
      .catch((e: any) => {
        if (error && e.status !== 400) {
          enqueueSnackbar(formatMessage({ id: "snackbar.internalServerError" }), { variant: "error" });
          console.error("[server error]", e);
          return null;
        }
        throw e;
      })
      .then((contract: T) => fn(values, web3Context, contract));
  };
};
