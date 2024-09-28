import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { GalleryInput } from "./index";

const i18n = {
  "form.labels.gallery": "Gallery",
  "form.placeholders.gallery": "Gallery",
  "form.labels.title": "Title",
  "form.placeholders.title": "Title",
  "form.buttons.delete": "Delete",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
  "dialogs.confirmation": "Please confirm",
  "dialogs.delete": "Delete `{title}`?",
};

export default {
  title: "FileInput/Firebase/Gallery",
  component: GalleryInput,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <TestIdProvider testId="gallery">
            <FormProvider {...useForm({ defaultValues: { gallery: [] } })}>
              <Story />
            </FormProvider>
          </TestIdProvider>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof GalleryInput>;

type Story = StoryObj<typeof GalleryInput>;

const Template: Story = {
  render: args => <GalleryInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "gallery",
  },
};
