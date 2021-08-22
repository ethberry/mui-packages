import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { SnackbarProvider } from "notistack";
import { Story } from "@storybook/react";

import { PhotoInput, IPhotoInputProps } from "./index";

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
  title: "Example/Firebase/Photo",
  component: PhotoInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <Formik onSubmit={() => {}} initialValues={{ photo: [] }}>
            <Story />
          </Formik>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IPhotoInputProps> = args => <PhotoInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "photo",
};
