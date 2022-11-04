import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { GalleryInput, IGalleryInputProps } from "./index";

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
    (Story: Story): ReactElement => (
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
};

const Template: Story<IGalleryInputProps> = args => <GalleryInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "gallery",
};
