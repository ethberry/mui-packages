import React, { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";

import { IRichTextFieldProps, MarkdownInput } from "./index";

const i18n = {
  "form.labels.markdown": "Markdown",
  "form.placeholders.markdown": "Markdown",
};

export default {
  title: "Example/Markdown",
  component: MarkdownInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{ static: "static" }}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IRichTextFieldProps> = args => <MarkdownInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "markdown",
};
