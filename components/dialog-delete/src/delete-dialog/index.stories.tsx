import { IntlProvider } from "react-intl";
import { Meta, StoryObj } from "@storybook/react";

import { SettingsProvider } from "@gemunion/provider-settings";

import { DeleteDialog } from "./index";

const i18n = {
  "dialogs.delete": "Delete `{title}`?",
  "dialogs.confirmation": "Please confirm",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
};

export default {
  title: "Dialog/Delete",
  component: DeleteDialog,
  decorators: [
    Story => (
      <SettingsProvider>
        <IntlProvider locale="en" messages={i18n}>
          <Story />
        </IntlProvider>
      </SettingsProvider>
    ),
  ],
  argTypes: {
    onConfirm: { action: "confirmed" },
    onCancel: { action: "canceled" },
  },
} as Meta<typeof DeleteDialog>;

type Story = StoryObj<typeof DeleteDialog>;

const Template: Story = {
  render: args => <DeleteDialog {...args}>some text</DeleteDialog>,
};

export const Simple = {
  ...Template,
  args: {
    open: true,
    initialValues: {
      id: 1,
      title: "Title",
    },
  },
};
