import { FC } from "react";

import { Form, Formik, FormikConfig } from "formik";
import { PromptIfDirty } from "../prompt";
import { FormButtons } from "../buttons";

interface IFormikFormProps extends FormikConfig<any> {
  showButtons?: boolean;
  showPrompt?: boolean;
  submit?: string;
  className?: string;
}

export const FormikForm: FC<IFormikFormProps> = props => {
  const { children, showButtons, showPrompt, submit, className, ...rest } = props;
  return (
    <Formik validateOnBlur enableReinitialize {...rest}>
      <Form className={className}>
        <PromptIfDirty visible={showPrompt} />

        {children}

        <FormButtons visible={showButtons} submit={submit} />
      </Form>
    </Formik>
  );
};
