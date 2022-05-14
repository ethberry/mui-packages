import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';

import { PromptIfDirty } from "../prompt";
import { FormButtons } from "../buttons";

interface IFormProps {
  showButtons?: boolean;
  showPrompt?: boolean;
  submit?: string;
  className?: string;
  validationSchema?: any;
  initialValues?: any;
  innerRef?: any;
}

export const FormikForm: FC<IFormProps> = props => {
  const { children, showButtons, showPrompt, submit, className, validationSchema, initialValues, innerRef } = props;

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  });

  const handleSubmit = async (data: any) => {
    await submit(data);
  };

  return (
    <FormProvider {...methods}>
      <form className={className} ref={innerRef} onSubmit={methods.handleSubmit(handleSubmit)}>
        <PromptIfDirty visible={showPrompt}/>

        {children}

        <FormButtons visible={showButtons} submit={submit}/>
      </form>
    </FormProvider>
  );
};
