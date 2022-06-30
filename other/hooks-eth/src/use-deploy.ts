import { useState } from "react";
import { useSnackbar } from "notistack";
import { useIntl } from "react-intl";

import { useMetamask } from "./use-metamask";

export const useDeploy = (deploy: (values: any) => Promise<void>) => {
  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const metaDeploy = useMetamask(deploy);

  const handleDeploy = (): void => {
    setIsDeployDialogOpen(true);
  };

  const handleDeployConfirm = async (values: any, form: any): Promise<any> => {
    return metaDeploy(values)
      .then((result: any) => {
        enqueueSnackbar(formatMessage({ id: "snackbar.success" }), { variant: "success" });
        setIsDeployDialogOpen(false);
        form.reset(form.getValues());
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      })
      .catch((error: any) => {
        if (error.status === 400) {
          const errors = error.getLocalizedValidationErrors ? error.getLocalizedValidationErrors() : [];

          Object.keys(errors).forEach(key => {
            form.setError(key, { type: "custom", message: errors[key] }, { shouldFocus: true });
          });
        } else if (error.status && error.message) {
          enqueueSnackbar(formatMessage({ id: `snackbar.${error.message as string}` }), { variant: "error" });
        } else {
          console.error(error);
          enqueueSnackbar(formatMessage({ id: "snackbar.error" }), { variant: "error" });
        }
      });
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
