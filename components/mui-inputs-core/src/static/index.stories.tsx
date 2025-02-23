import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { StaticInput } from "./index";

const i18n = {
  "form.labels.static": "Static",
  "form.placeholders.static": "Static",
};

export default {
  title: "Input/Static",
  component: StaticInput,
  decorators: [
    Story => (
      <TestIdProvider testId="static">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { static: "static" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof StaticInput>;

type Story = StoryObj<typeof StaticInput>;

export const Simple: Story = {
  render: args => <StaticInput {...args} />,
  args: {
    name: "static",
  },
};

export const Disabled: Story = {
  render: args => <StaticInput {...args} />,
  args: {
    name: "static",
    disabled: true,
  },
};
