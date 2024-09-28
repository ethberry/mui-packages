import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { AutocompleteInput } from "./index";

const i18n = {
  "form.labels.autocomplete": "Autocomplete",
  "form.placeholders.autocomplete": "Star w00t",
};

export default {
  title: "Input/Autocomplete",
  component: AutocompleteInput,
  decorators: [
    Story => (
      <TestIdProvider testId="autocomplete">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { autocomplete: "sw" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof AutocompleteInput>;

type Story = StoryObj<typeof AutocompleteInput>;

const Template: Story = {
  render: args => <AutocompleteInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "autocomplete",
    options: [
      {
        key: "sw",
        value: "Star wars",
      },
      {
        key: "st",
        value: "Star track",
      },
    ],
  },
};
