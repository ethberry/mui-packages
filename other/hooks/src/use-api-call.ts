import { useState } from "react";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { UseFormReturn } from "react-hook-form";

import { ApiError, IApiContext, useApi } from "@gemunion/provider-api";
import { useLicense } from "@gemunion/provider-license";

export const useApiCall = <T = any>(
  fn: (api: IApiContext, ...args: Array<any>) => Promise<T>,
  { success = true, error = true } = {},
) => {
  const api = useApi();

  const license = useLicense();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const [isLoading, setIsLoading] = useState(false);

  const wrapper = async (form?: UseFormReturn, ...args: Array<any>) => {
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

  if (!license.isValid()) {
    return null;
  }

  return { fn: wrapper, isLoading };
};
