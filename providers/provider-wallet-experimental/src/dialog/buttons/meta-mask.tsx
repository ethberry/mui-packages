import { FC } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useSnackbar } from "notistack";
import { Button, IconButton } from "@mui/material";
import { NoMetaMaskError } from "@web3-react/metamask";

import { metaMask, metaMaskHooks } from "../../connectors";
import { MetaMaskIcon } from "../wallet-icons";
import { CustomBadge } from "../custom-badge";

export interface IMetaMaksButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

// https://github.com/NoahZinsmeister/web3-react/blob/main/packages/metamask/README.md
export const MetaMaksButton: FC<IMetaMaksButtonProps> = props => {
  const { disabled, onClick } = props;

  const error = metaMaskHooks.useError();
  const isActive = metaMaskHooks.useIsActive();

  const { enqueueSnackbar } = useSnackbar();
  const { formatMessage } = useIntl();

  if (error) {
    if (error instanceof NoMetaMaskError) {
      enqueueSnackbar(formatMessage({ id: "snackbar.web3-not-detected" }), {
        variant: "warning",
        persist: true,
        action: () => (
          <Button
            onClick={() => {
              window.open("https://metamask.io/download.html", "_blank");
            }}
          >
            <FormattedMessage id="buttons.download-metamask" />
          </Button>
        ),
      });
    } else {
      enqueueSnackbar(error.message, { variant: "warning" });
    }
  }

  const handleClick = async () => {
    if (isActive) {
      if (metaMask.deactivate) {
        await metaMask.deactivate();
      }
    } else {
      await metaMask.activate();
    }
    onClick();
  };

  return (
    <CustomBadge invisible={!isActive}>
      <IconButton disabled={disabled} onClick={handleClick}>
        <MetaMaskIcon viewBox="0 0 60 60" sx={{ fontSize: 60 }} />
      </IconButton>
    </CustomBadge>
  );
};
