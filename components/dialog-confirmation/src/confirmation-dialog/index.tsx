import { FC, MouseEvent, ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";

import { useLicense } from "@gemunion/provider-license";
import { useSettings } from "@gemunion/provider-settings";

export interface IConfirmationDialogProps extends DialogProps {
  onCancel: () => void;
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
  message?: string;
  data?: any;
  action?: ReactElement | null;
}

export const ConfirmationDialog: FC<IConfirmationDialogProps> = props => {
  const {
    onCancel,
    onConfirm,
    children,
    message = "dialogs.confirmation",
    action = null,
    data,
    maxWidth = "sm",
    ...rest
  } = props;

  const license = useLicense();
  const settings = useSettings();

  if (!license.isValid()) {
    return null;
  }

  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-content"
      data-testid="DialogConfirmation"
      dir={settings.getLayoutDirection().toLowerCase()}
      {...rest}
    >
      <DialogTitle
        id="confirmation-dialog-title"
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <FormattedMessage id={message} values={data} />
        {action}
      </DialogTitle>
      <DialogContent id="confirmation-dialog-content">
        <DialogContentText component="div">{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onCancel} data-testid="DialogCancelButton">
          <FormattedMessage id="form.buttons.cancel" />
        </Button>
        <Button variant="contained" color="primary" onClick={onConfirm} data-testid="DialogConfirmButton">
          <FormattedMessage id="form.buttons.ok" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
