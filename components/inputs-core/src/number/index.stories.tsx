import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { NumberInput } from "./index";

const i18n = {
  "form.labels.number": "Number",
  "form.placeholders.number": "100",
};

export default {
  title: "Input/Number",
  component: NumberInput,
  decorators: [
    Story => (
      <TestIdProvider testId="number">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { number: 50 } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof NumberInput>;

type Story = StoryObj<typeof NumberInput>;

const Template: Story = {
  render: args => <NumberInput {...args} />,
};

// export const Simple = {
//   ...Template,
//   args: {
//     name: "number",
//   },
// };
//
// export const Negative = {
//   ...Template,
//   args: {
//     name: "number",
//     allowNegative: true,
//     value: -50,
//   },
// };
//
// export const ReadOnly = {
//   ...Template,
//   args: {
//     name: "number",
//     readOnly: true,
//   },
// };
//
// export const Disabled = {
//   ...Template,
//   args: {
//     name: "number",
//     disabled: true,
//   },
// };
