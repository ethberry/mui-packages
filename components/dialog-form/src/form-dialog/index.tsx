import { FC, MouseEvent, PropsWithChildren, ReactElement, useCallback, useRef, useState } from "react";
import { Breakpoint } from "@mui/material";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { useIntl } from "react-intl";
import { useParams } from "react-router";

import { ConfirmationDialog } from "@ethberry/mui-dialog-confirmation";
import { ProgressOverlay } from "@ethberry/mui-page-layout";
import { FormWrapper } from "@ethberry/mui-form";
import { useDeepCompareEffect } from "@ethberry/react-hooks";

export interface IFormDialogProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  showDebug?: boolean;
  disabled?: boolean;
  onConfirm: (values: T, form?: UseFormReturn<FieldValues, any>) => Promise<void>;
  onCancel: () => void;
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
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});
  const [values, setValues] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(disabled);

  const innerRef = useRef<HTMLFormElement | null>(null) as any;

  const onFormStateChange = async (form: UseFormReturn<FieldValues, any>) => {
    const {
      formState: { isValid, touchedFields: formTouchedFields },
      getValues,
    } = form;
    const values = getValues();

    setValues(values);
    setIsValid(isValid);
    setTouchedFields(formTouchedFields);

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
    if (showPrompt && Object.keys(touchedFields).length) {
      if (window.confirm(formatMessage({ id: "form.hints.prompt" }))) {
        onCancel();
      }
    } else {
      onCancel();
    }
  }, [showPrompt, touchedFields]);

  useDeepCompareEffect(() => {
    if (disabled ?? ((id && Object.keys(touchedFields).length === 0) || !isValid)) {
      setIsSubmitDisabled(true);
    }

    return () => {
      setIsSubmitDisabled(false);
    };
  }, [{ disabled, id, isValid }, touchedFields, values]);

  return (
    <ConfirmationDialog
      onConfirm={handleSubmit}
      maxWidth={maxWidth}
      disabled={isSubmitDisabled}
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
