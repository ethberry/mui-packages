import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";

import { IRichTextFieldProps, RichTextEditor } from "./index";

const i18n = {
  "form.labels.draft": "Draft",
  "form.placeholders.draft": "Draft",
};

export default {
  title: "Example/Draft",
  component: RichTextEditor,
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

const Template: Story<IRichTextFieldProps> = args => <RichTextEditor {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "draft",
};
