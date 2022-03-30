import { FC } from "react";
import { Dialog, DialogContent, DialogTitle, DialogProps, DialogTitleProps, DialogContentProps } from "@mui/material";
import { FormattedMessage } from "react-intl";

import {
  // AuthereumButton,
  // FortmaticButton,
  // LedgerButton,
  MetaMaskButton,
  // PortisButton,
  // TorusButton,
  // TrezorButton,
  WalletConnectButton,
  IWalletConnectButtonProps,
  IMetaMaskButtonProps,
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
  ButtonsProps?: {
    metamask?: Partial<IMetaMaskButtonProps>;
    walletConnect?: Partial<IWalletConnectButtonProps>;
  };
}

export const WalletDialog: FC<IWalletConnectDialogProps> = props => {
  const { onClose, open, componentsProps = {}, ButtonsProps = {} } = props;
  const { metamask = {}, walletConnect = {} } = ButtonsProps;

  const { dialog, dialogContent, dialogTitle } = componentsProps;

  return (
    <Dialog onClose={onClose} open={open} {...dialog}>
      <DialogTitle {...dialogTitle}>
        <FormattedMessage id="components.header.wallet.connect" />
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent {...dialogContent}>
        <MetaMaskButton onClick={onClose} {...metamask} />
        <WalletConnectButton onClick={onClose} {...walletConnect} />
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
