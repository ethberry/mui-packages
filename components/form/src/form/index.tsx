import { FC, PropsWithChildren, useEffect } from "react";
import { Box, ButtonProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDeepCompareEffect } from "@gemunion/react-hooks";
import { useLicense } from "@gemunion/provider-license";
import { TestIdProvider } from "@gemunion/provider-test-id";

import { FormButtons } from "../buttons";
import { PromptIfDirty } from "../prompt";
import { OnFormStateChange } from "../on-form-state-change";

interface IFormWrapperProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  showDebug?: boolean;
  submit?: string;
  onSubmit: (values: T, form?: any) => Promise<void>;
  onFormStateChange?: (form: UseFormReturn<FieldValues, any>) => Promise<void>;
  sx?: SxProps<Theme>;
  initialValues: T;
  enableReinitialize?: boolean;
  validationSchema?: any;
  formSubmitButtonProps?: Partial<ButtonProps>;
  formSubmitButtonRef?: any;
  innerRef?: any;
  testId?: string;
}

export const FormWrapper: FC<PropsWithChildren<IFormWrapperProps<any>>> = props => {
  const {
    children,
    initialValues,
    enableReinitialize = true,
    onSubmit,
    onFormStateChange,
    showButtons,
    showDebug,
    showPrompt,
    submit,
    formSubmitButtonRef,
    formSubmitButtonProps = {},
    innerRef,
    sx = [],
    validationSchema,
    testId,
  } = props;

  const license = useLicense();

  const resolver = validationSchema ? yupResolver(validationSchema) : undefined;

  const form = useForm({
    mode: "all",
    defaultValues: initialValues,
    resolver,
  });

  const handleSubmit: SubmitHandler<any> = async (data: any, e?: any): Promise<void> => {
    e?.preventDefault();
    e?.stopPropagation();
    const values = form.getValues();
    await onSubmit(values, form);
  };

  const listener = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    await form.handleSubmit(handleSubmit)(e);
  };

  useDeepCompareEffect(() => {
    if (enableReinitialize) {
      form.reset(initialValues);
    }
  }, [enableReinitialize, initialValues]);

  useEffect(() => {
    innerRef?.current?.addEventListener("submit", listener);

    return () => {
      innerRef?.current?.removeEventListener("submit", listener);
    };
  }, [innerRef?.current]);

  if (!license.isValid()) {
    return null;
  }

  const testIdProps = testId ? { "data-testid": `${testId}-form` } : {};

  return (
    <TestIdProvider testId={testId}>
      <Box sx={{ mb: 2 }}>
        <FormProvider {...form}>
          <Box component="form" onSubmit={form.handleSubmit(handleSubmit)} sx={sx} ref={innerRef} {...testIdProps}>
            <PromptIfDirty visible={showPrompt} />

            {children}

            <FormButtons
              ref={formSubmitButtonRef}
              visible={showButtons}
              showDebug={showDebug}
              submit={submit}
              handleSubmit={form.handleSubmit(handleSubmit)}
              formButtonProps={formSubmitButtonProps}
            />
            {onFormStateChange ? <OnFormStateChange onFormStateChange={onFormStateChange} /> : null}
          </Box>
        </FormProvider>
      </Box>
    </TestIdProvider>
  );
};
