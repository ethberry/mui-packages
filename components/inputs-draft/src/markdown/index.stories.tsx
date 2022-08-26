import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { LicenseProvider } from "@gemunion/provider-license";
import { markdownString } from "@gemunion/draft-js-utils";

import { TestIdProvider } from "@gemunion/provider-test-id";

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
      <LicenseProvider licenseKey={process.env.STORYBOOK_GEMUNION_LICENSE}>
        <TestIdProvider testId="markdown">
          <IntlProvider locale="en" messages={i18n}>
            <Story />
          </IntlProvider>
        </TestIdProvider>
      </LicenseProvider>
    ),
  ],
};

const MarkdownTemplate: Story<IMarkdownInputProps> = args => {
  return (
    <FormProvider {...useForm({ defaultValues: {} })}>
      <MarkdownInput {...args} />
    </FormProvider>
  );
};

export const Simple = MarkdownTemplate.bind({});
Simple.args = {
  name: "markdown",
};

const MarkdownDefaultValueTemplate: Story<IMarkdownInputProps> = args => {
  return (
    <FormProvider {...useForm({ defaultValues: { markdown: markdownString } })}>
      <MarkdownInput {...args} />
    </FormProvider>
  );
};

export const DefaultValue = MarkdownDefaultValueTemplate.bind({});
DefaultValue.args = {
  name: "markdown",
};
