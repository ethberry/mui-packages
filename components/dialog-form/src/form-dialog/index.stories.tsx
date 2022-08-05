import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Story } from "@storybook/react";
import { BrowserRouter } from "react-router-dom";

import { LicenseProvider } from "@gemunion/provider-license";
import { TextInput } from "@gemunion/mui-inputs-core";

import { FormDialog, IFormDialogProps } from "./index";

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
    (Story: Story): ReactElement => (
      <LicenseProvider licenseKey={process.env.STORYBOOK_GEMUNION_LICENSE}>
        <BrowserRouter>
          <IntlProvider locale="en" messages={i18n}>
            <Story />
          </IntlProvider>
        </BrowserRouter>
      </LicenseProvider>
    ),
  ],
  argTypes: {
    onConfirm: { action: "confirmed" },
    onCancel: { action: "canceled" },
  },
};

const Template: Story<IFormDialogProps<any>> = args => (
  <FormDialog {...args}>
    <TextInput name="title" />
  </FormDialog>
);

export const Simple = Template.bind({});
Simple.args = {
  open: true,
  showButtons: true,
  showPrompt: true,
  message: "dialogs.edit",
  initialValues: {
    title: "Title",
  },
};
