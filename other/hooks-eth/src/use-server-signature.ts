import { Web3ContextType } from "@web3-react/core";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { IFetchProps, useApi } from "@gemunion/provider-api";
import { IServerSignature } from "@gemunion/types-collection";

import { IHandlerOptionsParams } from "./interfaces";

export const useServerSignature = (
  fn: (...args: Array<any>) => Promise<void>,
  options: IHandlerOptionsParams = {},
): ((params: IFetchProps, values: Record<string, any> | null, web3Context: Web3ContextType) => Promise<any>) => {
  const { error = true } = options;
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  return async (params: IFetchProps, values: Record<string, any> | null, web3Context: Web3ContextType) => {
    return api
      .fetchJson(params)
      .then((sign: IServerSignature) => fn(values, web3Context, sign))
      .catch((e: any) => {
        if (error && e.status === 400) {
          console.error(e.getLocalizedValidationErrors());
          enqueueSnackbar(formatMessage({ id: `snackbar.error` }), { variant: "error" });
          return null;
        } else if (e.status === 404) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message as string}` }), { variant: "error" });
          return null;
        }
        throw e;
      });
  };
};
