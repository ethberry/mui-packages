import { IntlProvider } from "react-intl";
import { Meta, StoryObj } from "@storybook/react";

import { SettingsProvider } from "@gemunion/provider-settings";

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

const Template: Story = {
  render: args => <ConfirmationDialog {...args}>some text</ConfirmationDialog>,
};

export const Simple = {
  ...Template,
  args: {
    open: true,
    disablePortal: true,
  },
};
