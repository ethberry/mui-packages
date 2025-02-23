import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { CheckboxInput } from "./index";

const i18n = {
  "form.labels.checkbox": "Checkbox",
};

export default {
  title: "Input/Checkbox",
  component: CheckboxInput,
  decorators: [
    Story => (
      <TestIdProvider testId="checkbox">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { checkbox: false } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof CheckboxInput>;

type Story = StoryObj<typeof CheckboxInput>;

export const Simple: Story = {
  render: args => <CheckboxInput {...args} />,
  args: {
    name: "checkbox",
  },
};

export const Disabled: Story = {
  render: args => <CheckboxInput {...args} />,
  args: {
    name: "checkbox",
    disabled: true,
  },
};

export const Label: Story = {
  render: args => <CheckboxInput {...args} />,
  args: {
    name: "checkbox",
    label: "My label",
  },
};
