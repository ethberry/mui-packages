import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Box, ButtonProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FieldValues, FormProvider, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDeepCompareEffect } from "@ethberry/react-hooks";
import { TestIdProvider } from "@ethberry/provider-test-id";

import { FormButtons } from "../buttons";
import { PromptIfDirty } from "../prompt";
import { OnFormStateChange } from "../on-form-state-change";
import { InputRegistryProvider } from "../input-registry-provider";

export interface IRegisteredInput {
  name: string;
  isAsync: boolean;
}

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

  const resolver = validationSchema ? yupResolver(validationSchema) : undefined;
  const [registeredInputs, setRegisteredInputs] = useState<IRegisteredInput[]>([]);

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
      form.reset(initialValues, { keepDirtyValues: true });
    }
  }, [enableReinitialize, initialValues]);

  useEffect(() => {
    innerRef?.current?.addEventListener("submit", listener);

    return () => {
      innerRef?.current?.removeEventListener("submit", listener);
    };
  }, [innerRef?.current]);

  const testIdProps = testId ? { "data-testid": `${testId}-form` } : {};

  return (
    <TestIdProvider testId={testId}>
      <InputRegistryProvider registeredInputs={registeredInputs} setRegisteredInputs={setRegisteredInputs}>
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
      </InputRegistryProvider>
    </TestIdProvider>
  );
};
