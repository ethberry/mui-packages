import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

export const useMetamaskValue = <T = any>(fn: (...args: Array<any>) => Promise<T>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  return async (...args: Array<any>) => {
    return fn(...args).catch((e: any) => {
      if (e.code === 4001) {
        enqueueSnackbar(formatMessage({ id: "snackbar.denied" }), { variant: "warning" });
        return null;
      } else if (e.code === "UNPREDICTABLE_GAS_LIMIT") {
        enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        return null;
      } else {
        throw e;
      }
    });
  };
};
