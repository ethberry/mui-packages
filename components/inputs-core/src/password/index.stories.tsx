import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { PasswordInput } from "./index";

const i18n = {
  "form.labels.password": "Password",
  "form.placeholders.password": "******",
};

export default {
  title: "Input/Password",
  component: PasswordInput,
  decorators: [
    Story => (
      <TestIdProvider testId="password">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { password: "" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof PasswordInput>;

type Story = StoryObj<typeof PasswordInput>;

const Template: Story = {
  render: args => <PasswordInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "password",
  },
};

export const Disabled = {
  ...Template,
  args: {
    name: "password",
    disabled: true,
  },
};
