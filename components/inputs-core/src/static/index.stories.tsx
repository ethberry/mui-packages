import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { StaticInput, IStaticInputProps } from "./index";

const i18n = {
  "form.labels.static": "Static",
  "form.placeholders.static": "Static",
};

export default {
  title: "Input/Static",
  component: StaticInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="static">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { static: "static" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<IStaticInputProps> = args => <StaticInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "static",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "static",
  disabled: true,
};
