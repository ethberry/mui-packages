import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { TextInput } from "./index";

const i18n = {
  "form.labels.text": "Text",
  "form.placeholders.text": "Lorem ipsum...",
  "form.validations.required": "Required",
};

export default {
  title: "Input/Text",
  component: TextInput,
  decorators: [
    Story => (
      <TestIdProvider testId="text">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { text: "qwerty" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["standard", "outlined", "filled"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "standard",
    disabled: false,
    readOnly: false,
  },
} as Meta<typeof TextInput>;

type Story = StoryObj<typeof TextInput>;

const Template: Story = {
  render: args => <TextInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "text",
  },
};

export const CustomLabel = {
  ...Template,
  args: {
    name: "text",
    label: "My label",
    placeholder: "My placeholder",
  },
};
