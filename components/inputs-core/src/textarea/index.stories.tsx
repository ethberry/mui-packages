import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { ITextAreaProps, TextArea } from "./index";

const i18n = {
  "form.labels.textarea": "Textarea",
  "form.placeholders.textarea": "Lorem ipsum...",
};

export default {
  title: "Input/Textarea",
  component: TextArea,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="textarea">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { textarea: "Lorem ipsum" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<ITextAreaProps> = args => <TextArea {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "textarea",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "textarea",
  disabled: true,
};
