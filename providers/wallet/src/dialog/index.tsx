import { FC } from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
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
} from "./buttons";
import { CloseButton } from "./close-button";

export interface IWalletConnectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const WalletDialog: FC<IWalletConnectDialogProps> = props => {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <FormattedMessage id="components.header.wallet.connect" />
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <MetaMaskButton onClick={onClose} data-testid="ConnectMetamaskButton" />
        <WalletConnectButton onClick={onClose} data-testid="ConnectWalletConnectButton" />
        {/* <TrezorButton onClick={onClose} data-testid="ConnectTrezorButton" /> */}
        {/* <LedgerButton onClick={onClose} data-testid="ConnectLedgerButton" /> */}
        {/* <TorusButton onClick={onClose} data-testid="ConnectTorusButton" /> */}
        {/* <FortmaticButton onClick={onClose} data-testid="ConnectFortmaticButton" /> */}
        {/* <AuthereumButton onClick={onClose} data-testid="ConnectAuthereumButton" /> */}
        {/* <PortisButton onClick={onClose} data-testid="ConnectPortisButton" /> */}
      </DialogContent>
    </Dialog>
  );
};
