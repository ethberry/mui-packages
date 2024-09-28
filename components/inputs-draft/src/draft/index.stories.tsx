import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { emptyStateString } from "@ethberry/draft-js-utils";
import { TestIdProvider } from "@ethberry/provider-test-id";

import { RichTextEditor } from "./index";

const i18n = {
  "form.labels.draft": "Draft",
  "form.placeholders.draft": "Draft",
};

export default {
  title: "ReachTextEditor/Draft",
  component: RichTextEditor,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <TestIdProvider testId="draft">
          <FormProvider {...useForm({ defaultValues: { draft: emptyStateString } })}>
            <Story />
          </FormProvider>
        </TestIdProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof RichTextEditor>;

type Story = StoryObj<typeof RichTextEditor>;

const DraftTemplate: Story = {
  render: args => <RichTextEditor {...args} />,
};

export const Simple = {
  ...DraftTemplate,
  args: {
    name: "draft",
  },
};

const DraftDefaultValueTemplate: Story = {
  render: args => <RichTextEditor {...args} />,
};

export const DefaultValue = {
  ...DraftDefaultValueTemplate,
  args: {
    name: "draft",
  },
};
