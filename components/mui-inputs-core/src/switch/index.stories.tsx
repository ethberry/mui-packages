import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { SwitchInput } from "./index";

const i18n = {
  "form.labels.switch": "Switch",
};

export default {
  title: "Input/Switch",
  component: SwitchInput,
  decorators: [
    Story => (
      <TestIdProvider testId="switch">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { switch: false } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof SwitchInput>;

type Story = StoryObj<typeof SwitchInput>;

export const Simple: Story = {
  render: args => <SwitchInput {...args} />,
  args: {
    name: "switch",
  },
};

export const Disabled: Story = {
  render: args => <SwitchInput {...args} />,
  args: {
    name: "switch",
    disabled: true,
  },
};
