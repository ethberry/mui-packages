import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { UseFormReturn } from "react-hook-form";

import { ApiError, IApiContext, useApi } from "@ethberry/provider-api";

/**
 * @deprecated
 */
export const useApiCall = <T = any, V = any>(
  fn: (api: IApiContext, ...args: Array<V>) => Promise<T>,
  { success = true, error = true } = {},
) => {
  const api = useApi();

  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);

  const wrapper = (form?: UseFormReturn, ...args: Array<V>) => {
    setIsLoading(true);
    return fn(api, ...args)
      .then((res: T) => {
        if (success) {
          enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
        }
        return res;
      })
      .catch((e: ApiError) => {
        if (error) {
          if (e.status === 400) {
            const errors = e.getLocalizedValidationErrors();
            Object.keys(errors).forEach(key => {
              form?.setError(key, { type: "custom", message: errors[key] });
            });
          } else if (e.status) {
            enqueueSnackbar(formatMessage({ id: `snackbar.${e.message}` }), { variant: "error" });
          } else {
            console.error(e);
            enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
          }
        } else {
          throw e;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { fn: wrapper, isLoading };
};
