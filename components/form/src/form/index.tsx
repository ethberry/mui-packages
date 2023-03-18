import { FC, PropsWithChildren, useEffect } from "react";
import { Box, ButtonProps } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useDeepCompareEffect } from "@gemunion/react-hooks";
import { useLicense } from "@gemunion/provider-license";
import { TestIdProvider } from "@gemunion/provider-test-id";

import { FormButtons } from "../buttons";
import { useYupValidationResolver } from "../hook";
import { PromptIfDirty } from "../prompt";
import { yupResolver } from "../resolvers/yup";

interface IFormWrapperProps<T> {
  showButtons?: boolean;
  showPrompt?: boolean;
  showDebug?: boolean;
  submit?: string;
  onSubmit: (values: T, form?: any) => Promise<void>;
  className?: string;
  initialValues: T;
  enableReinitialize?: boolean;
  validationSchema?: any;
  formSubmitButtonProps?: Partial<ButtonProps>;
  formSubmitButtonRef?: any;
  innerRef?: any;
  validate?: (data: any) => Promise<any>;
  testId?: string;
}

export const FormWrapper: FC<PropsWithChildren<IFormWrapperProps<any>>> = props => {
  const {
    children,
    initialValues,
    enableReinitialize = true,
    onSubmit,
    showButtons,
    showDebug,
    showPrompt,
    submit,
    formSubmitButtonRef,
    formSubmitButtonProps = {},
    innerRef,
    className,
    validationSchema,
    validate,
    testId,
  } = props;

  const license = useLicense();

  const resolver = validate
    ? useYupValidationResolver(validate)
    : validationSchema
    ? yupResolver(validationSchema)
    : undefined;

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
          <form onSubmit={form.handleSubmit(handleSubmit)} className={className} ref={innerRef} {...testIdProps}>
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
          </form>
        </FormProvider>
      </Box>
    </TestIdProvider>
  );
};
