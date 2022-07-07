import { useState } from "react";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { useWeb3React } from "@web3-react/core";

import { useWallet } from "@gemunion/provider-wallet";

import { useMetamask } from "./use-metamask";

export const useDeploy = (deploy: (values: any) => Promise<void>) => {
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();
  const { openConnectWalletDialog, onWalletConnect } = useWallet();
  const { isActive } = useWeb3React();

  const metaDeploy = useMetamask(deploy);

  const handleDeploy = (): void => {
    setIsDeployDialogOpen(true);
  };

  const handleDeployConfirm = async (values: any, form: any): Promise<void> => {
    const metaDeployPromise = () => () =>
      metaDeploy(values)
        .then((result: any) => {
          enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
          form.reset(form.getValues());
          setIsDeployDialogOpen(false);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return result;
        })
        .catch((e: any) => {
          if (e.status === 400) {
            const errors = e.getLocalizedValidationErrors ? e.getLocalizedValidationErrors() : [];

            Object.keys(errors).forEach(key => {
              form.setError(key, { type: "custom", message: errors[key] }, { shouldFocus: true });
            });
          } else if (e.status) {
            enqueueSnackbar(formatMessage({ id: `snackbar.${e.message as string}` }), { variant: "error" });
          } else {
            console.error(e);
            enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
          }
        });

    if (!isActive) {
      openConnectWalletDialog();
      onWalletConnect(metaDeployPromise);

      const localizedErrorMessage = formatMessage({ id: "snackbar.walletIsNotConnected" });
      enqueueSnackbar(localizedErrorMessage, { variant: "error" });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return metaDeployPromise()();
  };

  const handleDeployCancel = () => {
    setIsDeployDialogOpen(false);
  };

  return {
    isDeployDialogOpen,
    handleDeploy,
    handleDeployConfirm,
    handleDeployCancel,
  };
};
