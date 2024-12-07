import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { CheckboxInput } from "./index";

const i18n = {
  "form.labels.checkbox": "Checkbox",
};

export default {
  title: "Input/Checkbox",
  component: CheckboxInput,
  decorators: [
    Story => (
      <TestIdProvider testId="checkbox">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { checkbox: false } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof CheckboxInput>;

type Story = StoryObj<typeof CheckboxInput>;

const Template: Story = {
  render: args => <CheckboxInput {...args} />,
};

// export const Simple = {
//   ...Template,
//   args: {
//     name: "checkbox",
//   },
// };
//
// export const Disabled = {
//   ...Template,
//   args: {
//     name: "checkbox",
//     disabled: true,
//   },
// };
//
// export const Label = {
//   ...Template,
//   args: {
//     name: "checkbox",
//     label: "My label",
//   },
// };
