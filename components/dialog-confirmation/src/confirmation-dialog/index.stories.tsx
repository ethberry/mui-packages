import { IntlProvider } from "react-intl";
import { Meta, StoryObj } from "@storybook/react";

import { SettingsProvider } from "@ethberry/provider-settings";

import { ConfirmationDialog } from "./index";

const i18n = {
  "dialogs.confirmation": "Please confirm",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
};

export default {
  title: "Dialog/Confirmation",
  component: ConfirmationDialog,
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
} as Meta<typeof ConfirmationDialog>;

type Story = StoryObj<typeof ConfirmationDialog>;

export const Simple: Story = {
  render: args => <ConfirmationDialog {...args}>some text</ConfirmationDialog>,
  args: {
    open: true,
    disablePortal: true,
  },
};
