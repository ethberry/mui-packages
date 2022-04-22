import { FC, useRef, useState } from "react";
import { Breakpoint } from "@mui/material";

import { ConfirmationDialog } from "@gemunion/mui-dialog-confirmation";
import { ProgressOverlay } from "@gemunion/mui-progress";
import { FormikForm } from "@gemunion/mui-form";

export interface IFormikFormProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  onConfirm: (values: T, formikBag: any) => Promise<void> | void;
  onCancel: () => void;
  message: string;
  open: boolean;
  initialValues: T;
  validationSchema?: any | (() => any);
  maxWidth?: Breakpoint | false;
}

export const FormDialog: FC<IFormikFormProps<any>> = props => {
  const { children, onConfirm, initialValues, validationSchema, maxWidth = "lg", ...rest } = props;

  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null) as any;

  const handleSubmit = async (): Promise<void> => {
    if (formRef && formRef.current) {
      setIsLoading(true);
      await formRef.current.submitForm();
      setIsLoading(false);
    }
  };

  return (
    <ConfirmationDialog onConfirm={handleSubmit} maxWidth={maxWidth} data-testid="dialogForm" {...rest}>
      <ProgressOverlay isLoading={isLoading}>
        <FormikForm
          onSubmit={onConfirm}
          validationSchema={validationSchema}
          initialValues={initialValues}
          innerRef={formRef}
          showButtons={false}
        >
          {children}
        </FormikForm>
      </ProgressOverlay>
    </ConfirmationDialog>
  );
};
