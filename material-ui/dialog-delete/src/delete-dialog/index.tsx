import { FC, useState } from "react";
import { FormattedMessage } from "react-intl";

import { ConfirmationDialog } from "@gemunion/material-ui-dialog-confirmation";
import { ProgressOverlay } from "@gemunion/material-ui-progress";

export interface IDeleteDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (item: any) => Promise<void>;
  getTitle?: (item: any) => string;
  initialValues: any;
}

export const DeleteDialog: FC<IDeleteDialogProps> = props => {
  const { initialValues, onConfirm, getTitle, ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async (): Promise<void> => {
    setIsLoading(true);
    await onConfirm(initialValues);
    setIsLoading(false);
  };

  return (
    <ConfirmationDialog maxWidth="xs" onConfirm={handleConfirm} {...rest}>
      <ProgressOverlay isLoading={isLoading}>
        <FormattedMessage
          id="dialogs.delete"
          values={{
            title: getTitle ? getTitle(initialValues) : initialValues.title,
          }}
        />
      </ProgressOverlay>
    </ConfirmationDialog>
  );
};
