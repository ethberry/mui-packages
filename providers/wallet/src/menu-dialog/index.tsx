import { FC } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { CloseButton } from "../dialog/close-button";
import { useWallet } from "../provider";

export interface IWalletDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WalletMenuDialog: FC<IWalletDialogProps> = props => {
  const { onClose, open } = props;

  const { handleDisconnect: handleDisconnectWallet } = useWallet();

  const handleDisconnect = () => {
    handleDisconnectWallet();
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
