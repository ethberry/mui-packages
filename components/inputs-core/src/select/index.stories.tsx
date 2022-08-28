import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { ISelectInputProps, SelectInput } from "./index";

const i18n = {
  "enums.select.ONE": "ONE",
  "enums.select.TWO": "TWO",
  "form.labels.select": "Select",
};

enum SelectOptions {
  ONE = "ONE",
  TWO = "TWO",
}

export default {
  title: "Input/Select",
  component: SelectInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="select">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { select: SelectOptions.ONE } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<ISelectInputProps> = args => <SelectInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "select",
  options: SelectOptions,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "select",
  options: SelectOptions,
  disabled: true,
};
