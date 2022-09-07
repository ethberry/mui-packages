import { FC, ReactElement, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { ISelectInputProps, SelectInput } from "./index";

const i18n = {
  "enums.select.ONE": "ONE",
  "enums.select.TWO": "TWO",
  "form.labels.select": "Select",
};

enum SelectOptions {
  ONE = "ONE",
  TWO = "TWO",
}

export default {
  title: "Input/Select",
  component: SelectInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="select">
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<ISelectInputProps> = args => (
  <FormProvider {...useForm({ defaultValues: { select: SelectOptions.ONE }, mode: "all", reValidateMode: "onChange" })}>
    <SelectInput {...args} />
  </FormProvider>
);

export const Simple = Template.bind({});
Simple.args = {
  name: "select",
  options: SelectOptions,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "select",
  options: SelectOptions,
  disabled: true,
};

const MultipleTemplate: Story<ISelectInputProps> = args => (
  <FormProvider {...useForm({ defaultValues: { select: [SelectOptions.ONE, SelectOptions.TWO] } })}>
    <SelectInput {...args} />
  </FormProvider>
);

export const Multiple = MultipleTemplate.bind({});
Multiple.args = {
  name: "select",
  options: SelectOptions,
  multiple: true,
};

const ErrorSetter: FC<any> = () => {
  const form = useFormContext<any>();
  const name = "select";

  useEffect(() => {
    setTimeout(() => form.setError(name, { message: "Custom error message", type: "custom" }), 200);
  }, []);
  return null;
};

const ErroredTemplate: Story<ISelectInputProps> = args => (
  <FormProvider
    {...useForm({
      defaultValues: { select: SelectOptions.ONE },
      mode: "onSubmit",
    })}
  >
    <SelectInput {...args} />
    <ErrorSetter />
  </FormProvider>
);

export const Errored = ErroredTemplate.bind({});
Errored.args = {
  name: "select",
  options: SelectOptions,
  required: true,
};
