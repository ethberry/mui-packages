import { FC, MouseEvent, PropsWithChildren, ReactElement, useCallback, useRef, useState } from "react";
import { Breakpoint } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useIntl } from "react-intl";

import { ConfirmationDialog } from "@gemunion/mui-dialog-confirmation";
import { ProgressOverlay } from "@gemunion/mui-page-layout";
import { FormWrapper } from "@gemunion/mui-form";

export interface IFormDialogProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  showDebug?: boolean;
  disabled?: boolean;
  onConfirm: (values: T, form?: UseFormReturn<FieldValues, any>) => Promise<void>;
  onCancel: (form?: UseFormReturn<FieldValues, any> | null) => void;
  message: string;
  data?: any;
  open: boolean;
  initialValues: T;
  validationSchema?: any;
  maxWidth?: Breakpoint | false;
  testId?: string;
  action?: ReactElement | null;
}

export const FormDialog: FC<PropsWithChildren<IFormDialogProps<any>>> = props => {
  const {
    children,
    disabled,
    onCancel,
    onConfirm,
    initialValues,
    validationSchema,
    maxWidth = "lg",
    testId,
    showPrompt = true,
    showDebug,
    ...rest
  } = props;

  const { formatMessage } = useIntl();

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<UseFormReturn<FieldValues, any> | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const innerRef = useRef<HTMLFormElement | null>(null) as any;

  const onFormStateChange = async (form: UseFormReturn<FieldValues, any>) => {
    const {
      formState: { isDirty, isValid },
    } = form;

    setForm(form);
    setIsDirty(isDirty);
    setIsValid(isValid);

    return Promise.resolve();
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    if (innerRef && innerRef.current) {
      setIsLoading(true);
      innerRef.current.dispatchEvent(new Event("submit", { bubbles: false, cancelable: true }));
      setIsLoading(false);
    }

    return Promise.resolve();
  };

  const handleCancel = useCallback(() => {
    if (showPrompt && isDirty) {
      if (window.confirm(formatMessage({ id: "form.hints.prompt" }))) {
        onCancel(form);
      }
    } else {
      onCancel(form);
    }
  }, [form, isDirty, showPrompt]);

  return (
    <ConfirmationDialog
      onConfirm={handleSubmit}
      maxWidth={maxWidth}
      disabled={disabled ?? (!isDirty || !isValid)}
      data-testid="DialogForm"
      onCancel={handleCancel}
      {...rest}
    >
      <ProgressOverlay isLoading={isLoading}>
        <FormWrapper
          onSubmit={onConfirm}
          onFormStateChange={onFormStateChange}
          validationSchema={validationSchema}
          initialValues={initialValues}
          innerRef={innerRef}
          showButtons={false}
          showPrompt={false}
          showDebug={showDebug}
          testId={testId}
        >
          {children}
        </FormWrapper>
      </ProgressOverlay>
    </ConfirmationDialog>
  );
};
