import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Meta, StoryObj } from "@storybook/react";

import { ApiProviderJwt } from "@gemunion/provider-api-jwt";
import { TestIdProvider } from "@gemunion/provider-test-id";

import { PhotoInput } from "./index";

const i18n = {
  "form.labels.photo": "Photo",
  "form.placeholders.photo": "Photo",
  "form.labels.title": "Title",
  "form.placeholders.title": "Title",
  "form.buttons.delete": "Delete",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
  "dialogs.confirmation": "Please confirm",
  "dialogs.delete": "Delete `{title}`?",
};

export default {
  title: "FileInput/S3/Photo",
  component: PhotoInput,
  decorators: [
    Story => (
      <ApiProviderJwt baseUrl={"http://localhost/"}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider>
            <TestIdProvider testId="photo">
              <FormProvider {...useForm({ defaultValues: { photo: [] } })}>
                <Story />
              </FormProvider>
            </TestIdProvider>
          </SnackbarProvider>
        </IntlProvider>
      </ApiProviderJwt>
    ),
  ],
} as Meta<typeof PhotoInput>;

type Story = StoryObj<typeof PhotoInput>;

const Template: Story = {
  render: args => <PhotoInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "photo",
  },
};
