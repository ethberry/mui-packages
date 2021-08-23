import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";

import { ITextInputProps, TextInput } from "./index";

const i18n = {
  "form.labels.text": "Text",
  "form.placeholders.text": "Lorem ipsum...",
  "form.validations.required": "Required",
};

export default {
  title: "Example/Input/Text",
  component: TextInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{ text: "" }}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["standard", "outlined", "filled"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "standard",
    disabled: false,
    readOnly: false,
  },
};

const SimpleTemplate: Story<ITextInputProps> = args => (
  <Formik onSubmit={() => {}} initialValues={{ text: "qwerty" }}>
    <TextInput {...args} />
  </Formik>
);

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  name: "text",
};

const ErroredTemplate: Story<ITextInputProps> = args => (
  <Formik
    onSubmit={() => {}}
    initialValues={{ text: "qwerty" }}
    initialErrors={{ text: "form.validations.required" }}
    initialTouched={{ text: true }}
  >
    <TextInput {...args} />
  </Formik>
);

export const Errored = ErroredTemplate.bind({});
Errored.args = {
  name: "text",
};
