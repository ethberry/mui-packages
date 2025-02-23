import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { markdownString } from "@ethberry/draft-js-utils";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { MarkdownInput } from "./index";

const i18n = {
  "form.labels.markdown": "Markdown",
  "form.placeholders.markdown": "Markdown",
};

export default {
  title: "ReachTextEditor/Markdown",
  component: MarkdownInput,
  decorators: [
    Story => (
      <TestIdProvider testId="markdown">
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof MarkdownInput>;

type Story = StoryObj<typeof MarkdownInput>;

export const Simple: Story = {
  render: args => (
    <FormProvider {...useForm({ defaultValues: {} })}>
      <MarkdownInput {...args} />
    </FormProvider>
  ),
  args: {
    name: "markdown",
  },
};

export const DefaultValue: Story = {
  render: args => (
    <FormProvider {...useForm({ defaultValues: { markdown: markdownString } })}>
      <MarkdownInput {...args} />
    </FormProvider>
  ),
  args: {
    name: "markdown",
  },
};
