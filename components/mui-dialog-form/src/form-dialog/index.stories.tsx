import { IntlProvider } from "react-intl";
import { Meta, StoryObj } from "@storybook/react";

import { TextInput } from "@ethberry/mui-inputs-core";

import { FormDialog } from "./index";

const i18n = {
  "dialogs.edit": "Edit",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
  "form.labels.title": "Title",
  "form.placeholders.title": "...",
  "form.hints.prompt": "Are you sure you want to leave?",
};

export default {
  title: "Dialog/Form",
  component: FormDialog,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <Story />
      </IntlProvider>
    ),
  ],
  argTypes: {
    onConfirm: { action: "confirmed" },
    onCancel: { action: "canceled" },
  },
} as Meta<typeof FormDialog>;

type Story = StoryObj<typeof FormDialog>;

export const Simple: Story = {
  render: args => (
    <FormDialog {...args}>
      <TextInput name="title" />
    </FormDialog>
  ),
  args: {
    open: true,
    showButtons: true,
    showPrompt: false,
    message: "dialogs.edit",
    initialValues: {
      title: "Title",
    },
  },
};
