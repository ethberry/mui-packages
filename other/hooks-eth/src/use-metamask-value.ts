import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";
import { utils } from "ethers";

export const useMetamaskValue = <T = any>(fn: (...args: Array<any>) => Promise<T>) => {
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  return async (...args: Array<any>) => {
    return fn(...args).catch((e: any) => {
      if (e.code === 4001) {
        enqueueSnackbar(formatMessage({ id: "snackbar.denied" }), { variant: "warning" });
        return null;
      } else if (e.error?.data?.data) {
        const data = e.error?.data?.data as string;
        const decodedMessage = utils.toUtf8String(`0x${data.substr(138)}`);
        enqueueSnackbar(decodedMessage || formatMessage({ id: "snackbar.error" }), { variant: "error" });
        return null;
      } else {
        throw e;
      }
    });
  };
};
