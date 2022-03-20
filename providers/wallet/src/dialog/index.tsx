import { FC } from "react";
import { Dialog, DialogContent, DialogTitle, DialogProps, DialogTitleProps, DialogContentProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

import {
  // AuthereumButton,
  // FortmaticButton,
  // LedgerButton,
  MetaMaksButton,
  // PortisButton,
  // TorusButton,
  // TrezorButton,
  WalletConnectButton,
} from "./buttons";
import { CloseButton } from "./close-button";

export interface IWalletConnectDialogProps {
  componentsProps?: {
    dialog?: Partial<DialogProps>;
    dialogTitle?: Partial<DialogTitleProps>;
    dialogContent?: Partial<DialogContentProps>;
  };
  open: boolean;
  onClose: () => void;
}

export const WalletDialog: FC<IWalletConnectDialogProps> = props => {
  const { onClose, open, componentsProps = {} } = props;

  const { dialog, dialogContent, dialogTitle } = componentsProps;

  return (
    <Dialog onClose={onClose} open={open} {...dialog}>
      <DialogTitle {...dialogTitle}>
        <FormattedMessage id="components.header.wallet.connect" />
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent {...dialogContent}>
        <MetaMaksButton onClick={onClose} />
        <WalletConnectButton onClick={onClose} />
        {/* <TrezorButton onClick={onClose} /> */}
        {/* <LedgerButton onClick={onClose} /> */}
        {/* <TorusButton onClick={onClose} /> */}
        {/* <FortmaticButton onClick={onClose} /> */}
        {/* <AuthereumButton onClick={onClose} /> */}
        {/* <PortisButton onClick={onClose} /> */}
      </DialogContent>
    </Dialog>
  );
};
