import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { NumberInput } from "./index";

const i18n = {
  "form.labels.number": "Number",
  "form.placeholders.number": "100",
};

export default {
  title: "Input/Number",
  component: NumberInput,
  decorators: [
    Story => (
      <TestIdProvider testId="number">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { number: 50 } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof NumberInput>;

type Story = StoryObj<typeof NumberInput>;

export const Simple: Story = {
  render: args => <NumberInput {...args} />,
  args: {
    name: "number",
  },
};

export const Negative: Story = {
  render: args => <NumberInput {...args} />,
  args: {
    name: "number",
    allowNegative: true,
    value: -50,
  },
};

export const ReadOnly: Story = {
  render: args => <NumberInput {...args} />,
  args: {
    name: "number",
    readOnly: true,
  },
};

export const Disabled: Story = {
  render: args => <NumberInput {...args} />,
  args: {
    name: "number",
    disabled: true,
  },
};
