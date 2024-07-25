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
import { useAppSelector } from "@gemunion/redux";
import { layoutDirectionSelector } from "@gemunion/provider-theme";

export interface IConfirmationDialogProps extends DialogProps {
  onCancel: () => void;
  onConfirm: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  message?: string;
  data?: any;
  action?: ReactElement | null;
}

export const ConfirmationDialog: FC<IConfirmationDialogProps> = props => {
  const {
    onCancel,
    onConfirm,
    children,
    disabled = false,
    message = "dialogs.confirmation",
    action = null,
    data,
    maxWidth = "sm",
    ...rest
  } = props;

  const license = useLicense();
  const layoutDirection: string = useAppSelector(layoutDirectionSelector);

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
      dir={layoutDirection.toLowerCase()}
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
        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          onClick={onConfirm}
          data-testid="DialogConfirmButton"
        >
          <FormattedMessage id="form.buttons.ok" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};
