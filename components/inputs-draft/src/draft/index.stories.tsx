import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { emptyStateString } from "@gemunion/draft-js-utils";
import { LicenseProvider } from "@gemunion/provider-license";
import { TestIdProvider } from "@gemunion/provider-test-id";

import { IRichTextFieldProps, RichTextEditor } from "./index";

const i18n = {
  "form.labels.draft": "Draft",
  "form.placeholders.draft": "Draft",
};

export default {
  title: "ReachTextEditor/Draft",
  component: RichTextEditor,
  decorators: [
    (Story: Story): ReactElement => (
      <LicenseProvider licenseKey={process.env.STORYBOOK_GEMUNION_LICENSE}>
        <IntlProvider locale="en" messages={i18n}>
          <TestIdProvider testId="draft">
            <FormProvider {...useForm({ defaultValues: { draft: emptyStateString } })}>
              <Story />
            </FormProvider>
          </TestIdProvider>
        </IntlProvider>
      </LicenseProvider>
    ),
  ],
};

const DraftTemplate: Story<IRichTextFieldProps> = args => {
  return <RichTextEditor {...args} />;
};

export const Simple = DraftTemplate.bind({});
Simple.args = {
  name: "draft",
};

const DraftDefaultValueTemplate: Story<IRichTextFieldProps> = args => {
  return <RichTextEditor {...args} />;
};

export const DefaultValue = DraftDefaultValueTemplate.bind({});
DefaultValue.args = {
  name: "draft",
};
