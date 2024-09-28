import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { JsonInput } from "./index";

const i18n = {
  "form.labels.json": "JSON",
  "form.placeholders.json": "JSON",
  "form.validations.valueMissing": "Value missing",
  "form.validations.invalidJSON": "JSON is invalid",
};

export default {
  title: "Input/Json",
  component: JsonInput,
  decorators: [
    Story => (
      <TestIdProvider testId="json">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider
            {...useForm({
              defaultValues: {
                json: JSON.stringify({
                  a: 1,
                }),
              },
            })}
          >
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof JsonInput>;

type Story = StoryObj<typeof JsonInput>;

const Template: Story = {
  render: args => <JsonInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "json",
  },
};
