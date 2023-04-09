import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { TextArea } from "./index";

const i18n = {
  "form.labels.textarea": "Textarea",
  "form.placeholders.textarea": "Lorem ipsum...",
};

export default {
  title: "Input/Textarea",
  component: TextArea,
  decorators: [
    Story => (
      <TestIdProvider testId="textarea">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { textarea: "Lorem ipsum" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof TextArea>;

type Story = StoryObj<typeof TextArea>;

const Template: Story = {
  render: args => <TextArea {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "textarea",
  },
};

export const Disabled = {
  ...Template,
  args: {
    name: "textarea",
    disabled: true,
  },
};
