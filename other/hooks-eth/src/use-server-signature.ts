import { Web3ContextType } from "@web3-react/core";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { IFetchProps, useApi } from "@gemunion/provider-api";
import { IServerSignature } from "@gemunion/types-collection";

export const useServerSignature = (
  fn: (...args: Array<any>) => Promise<void>,
): ((params: IFetchProps, web3Context: Web3ContextType) => Promise<any>) => {
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  return async (params: IFetchProps, web3Context: Web3ContextType) => {
    return api.fetchJson(params).then((sign: IServerSignature) =>
      fn(params.data, web3Context, sign).catch((e: any) => {
        if (e.status) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${e.message as string}` }), { variant: "error" });
          return null;
        } else {
          console.error(e);
          throw e;
        }
      }),
    );
  };
};
