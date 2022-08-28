import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { ICheckboxInputProps, CheckboxInput } from "./index";

const i18n = {
  "form.labels.checkbox": "Checkbox",
};

export default {
  title: "Input/Checkbox",
  component: CheckboxInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="checkbox">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { checkbox: false } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<ICheckboxInputProps> = args => <CheckboxInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "checkbox",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "checkbox",
  disabled: true,
};

export const Label = Template.bind({});
Label.args = {
  name: "checkbox",
  label: "My label",
};
