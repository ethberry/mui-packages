import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { UseFormReturn } from "react-hook-form";

import { downForMaintenance } from "@ethberry/license-messages";
import { ApiError, IApiContext, useApi } from "@ethberry/provider-api";
import { useLicense } from "@ethberry/provider-license";

export const useApiCall = <T = any, V = any>(
  fn: (api: IApiContext, ...args: Array<V>) => Promise<T>,
  { success = true, error = true } = {},
) => {
  const api = useApi();

  const license = useLicense();

  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);

  const wrapper = (form?: UseFormReturn, ...args: Array<V>) => {
    if (!license.isValid()) {
      return Promise.reject(new Error(downForMaintenance())).catch((e: Error) => {
        enqueueSnackbar(e.message, { variant: "error" });
        return null as unknown as T;
      });
    }

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
