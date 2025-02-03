import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { SearchInput } from "./index";

const i18n = {
  "form.labels.search": "Search",
  "form.placeholders.search": "Search...",
};

export default {
  title: "Input/Search",
  component: SearchInput,
  decorators: [
    Story => (
      <TestIdProvider testId="search">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { search: "" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof SearchInput>;

type Story = StoryObj<typeof SearchInput>;

export const Simple: Story = {
  render: args => <SearchInput {...args} />,
  args: {
    name: "search",
  },
};

export const Disabled: Story = {
  render: args => <SearchInput {...args} />,
  args: {
    name: "search",
    disabled: true,
  },
};
