import { Web3ContextType } from "@web3-react/core";
import { useIntl } from "react-intl";
import { enqueueSnackbar } from "notistack";

import type { IFetchProps } from "@gemunion/provider-api";
import { useApi } from "@gemunion/provider-api";
import type { IDeployable, IServerSignature } from "@gemunion/types-blockchain";

import type { IHandlerOptionsParams } from "./interfaces";

export const useServerSignature = (
  fn: (...args: Array<any>) => Promise<any>,
  options: IHandlerOptionsParams = {},
): ((
  params: IFetchProps,
  values: Record<string, any> | null,
  web3Context: Web3ContextType,
  systemContract?: IDeployable,
) => Promise<any>) => {
  const { error = true } = options;
  const api = useApi();
  const { formatMessage } = useIntl();

  return async (
    params: IFetchProps,
    values: Record<string, any> | null,
    web3Context: Web3ContextType,
    systemContract?: IDeployable,
  ) => {
    return api
      .fetchJson(params)
      .catch((e: any) => {
        if (error && e.status !== 400) {
          enqueueSnackbar(formatMessage({ id: "snackbar.internalServerError" }), { variant: "error" });
          console.error("[server error]", e);
          return null;
        }
        throw e;
      })
      .then((sign: IServerSignature) => fn(values, web3Context, sign, systemContract));
  };
};
