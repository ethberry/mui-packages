import { FC, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { SelectInput } from "./index";

const i18n = {
  "enums.select.ONE": "ONE",
  "enums.select.TWO": "TWO",
  "form.labels.select": "Select",
  "form.validations.customError": "Custom error message",
};

enum SelectOptions {
  ONE = "ONE",
  TWO = "TWO",
}

export default {
  title: "Input/Select",
  component: SelectInput,
  decorators: [
    Story => (
      <TestIdProvider testId="select">
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof SelectInput>;

type Story = StoryObj<typeof SelectInput>;

const Template: Story = {
  render: args => (
    <FormProvider
      {...useForm({ defaultValues: { select: SelectOptions.ONE }, mode: "all", reValidateMode: "onChange" })}
    >
      <SelectInput {...args} />
    </FormProvider>
  ),
};

export const Simple = {
  ...Template,
  args: {
    name: "select",
    options: SelectOptions,
  },
};

export const Disabled = {
  ...Template,
  args: {
    name: "select",
    options: SelectOptions,
    disabled: true,
  },
};

const MultipleTemplate: Story = {
  render: args => (
    <FormProvider {...useForm({ defaultValues: { select: [SelectOptions.ONE, SelectOptions.TWO] } })}>
      <SelectInput {...args} />
    </FormProvider>
  ),
};

export const Multiple = {
  ...MultipleTemplate,
  args: {
    name: "select",
    options: SelectOptions,
    multiple: true,
  },
};

const ErrorSetter: FC = () => {
  const form = useFormContext<any>();
  const name = "select";
  useEffect(() => {
    setTimeout(() => form.setError(name, { message: "form.validations.customError", type: "custom" }), 200);
  }, []);
  return null;
};

const ErrorTemplate: Story = {
  render: args => (
    <FormProvider
      {...useForm({
        defaultValues: { select: SelectOptions.ONE },
        mode: "onSubmit",
      })}
    >
      <SelectInput {...args} />
      <ErrorSetter />
    </FormProvider>
  ),
};

export const Error = {
  ...ErrorTemplate,
  args: {
    name: "select",
    options: SelectOptions,
    required: true,
  },
};
