import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { ISwitchInputProps, SwitchInput } from "./index";

const i18n = {
  "form.labels.switch": "Switch",
};

export default {
  title: "Input/Switch",
  component: SwitchInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="switch">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { switch: false } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<ISwitchInputProps> = args => <SwitchInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "switch",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "switch",
  disabled: true,
};
