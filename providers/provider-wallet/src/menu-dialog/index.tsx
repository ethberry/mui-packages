import { FC } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { useWeb3React } from "@web3-react/core";

import { CloseButton } from "../dialog/close-button";

export interface IWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WalletMenuDialog: FC<IWalletDialogProps> = props => {
  const { onClose, open } = props;

  const { deactivate } = useWeb3React();

  const handleDisconnect = () => {
    deactivate();
    onClose();
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <FormattedMessage id="components.header.wallet.menu" />
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <Button onClick={handleDisconnect}>
          <FormattedMessage id="form.buttons.disconnect" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
