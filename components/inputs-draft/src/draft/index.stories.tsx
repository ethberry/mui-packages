import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";
import { LicenseProvider } from "@gemunion/provider-license";
import { emptyStateString } from "@gemunion/draft-js-utils";

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
          <FormProvider {...useForm({ defaultValues: { draft: emptyStateString } })}>
            <Story />
          </FormProvider>
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
