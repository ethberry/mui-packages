import { FC } from "react";
import { FormattedMessage } from "react-intl";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import { FirebaseLogin, IFirebaseLoginButtonProps } from "@gemunion/firebase-login";

import { CloseButton } from "../../buttons/close";
import { StyledLoginWrapper } from "./styled";

interface IConnectWalletProps {
  open: boolean;
  onClose: () => void;
  wallets?: Array<FC<IFirebaseLoginButtonProps>>;
}

export const ConnectWallet: FC<IConnectWalletProps> = props => {
  const { open, onClose, wallets } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <FormattedMessage id="components.header.wallet.connect" />
        <CloseButton onClick={onClose} />
      </DialogTitle>
      <DialogContent>
        <StyledLoginWrapper>
          <FirebaseLogin withEmail={false} wallets={wallets} />
        </StyledLoginWrapper>
      </DialogContent>
    </Dialog>
  );
};
