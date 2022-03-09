import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";
import { markdownString } from "@gemunion/draft-js-utils";

import { IMarkdownInputProps, MarkdownInput } from "./index";

const i18n = {
  "form.labels.markdown": "Markdown",
  "form.placeholders.markdown": "Markdown",
};

export default {
  title: "ReachTextEditor/Markdown",
  component: MarkdownInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Story />
      </IntlProvider>
    ),
  ],
};

const MarkdownTemplate: Story<IMarkdownInputProps> = args => (
  <Formik onSubmit={() => {}} initialValues={{}}>
    <MarkdownInput {...args} />
  </Formik>
);

export const Simple = MarkdownTemplate.bind({});
Simple.args = {
  name: "markdown",
};

const MarkdownDefaultValueTemplate: Story<IMarkdownInputProps> = args => (
  <Formik onSubmit={() => {}} initialValues={{ markdown: markdownString }}>
    <MarkdownInput {...args} />
  </Formik>
);

export const DefaultValue = MarkdownDefaultValueTemplate.bind({});
DefaultValue.args = {
  name: "markdown",
};
