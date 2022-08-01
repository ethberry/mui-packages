import { useState } from "react";
import { Web3ContextType } from "@web3-react/core";
import { useIntl } from "react-intl";
import { useSnackbar } from "notistack";

import { IServerSignature } from "@gemunion/types-collection";
import { IFetchProps } from "@gemunion/provider-api";

import { useServerSignature } from "./use-server-signature";
import { useMetamask } from "./use-metamask";

export const useDeploy = (
  deploy: (data: any, web3Context: Web3ContextType, sign: IServerSignature) => Promise<void>,
) => {
  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  const [isDeployDialogOpen, setIsDeployDialogOpen] = useState(false);

  const fnWithSignature = useServerSignature(deploy);
  const deployFn = useMetamask((params: IFetchProps, web3Context: Web3ContextType) => {
    return fnWithSignature(params, web3Context);
  });

  const handleDeploy = (): void => {
    setIsDeployDialogOpen(true);
  };

  const handleDeployConfirm = async (params: any, form: any): Promise<any> => {
    return deployFn(params)
      .then((result: any) => {
        // in case if some uncaught errors occurred from nested promises we need to prevent continue chaining
        if (result === null) {
          return;
        }
        form?.reset(form?.getValues());
        setIsDeployDialogOpen(false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result;
      })
      .catch((e: any) => {
        if (e.status === 400) {
          const errors = e.getLocalizedValidationErrors ? e.getLocalizedValidationErrors() : [];
          Object.keys(errors).forEach(key => {
            form?.setError(key, { type: "custom", message: errors[key] }, { shouldFocus: true });
          });
        } else {
          console.error("unknown error", e);
          enqueueSnackbar(e.message || formatMessage({ id: "snackbar.error" }), { variant: "error" });
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
