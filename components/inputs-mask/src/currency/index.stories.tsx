import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { CurrencyInput } from "./index";

const i18n = {
  "form.labels.currencyMask": "Currency",
  "form.placeholders.currencyMask": "Enter amount",
};

export default {
  title: "MaskedInput/Currency",
  component: CurrencyInput,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <TestIdProvider testId="currency">
          <FormProvider {...useForm({ defaultValues: { currencyMask: 100 } })}>
            <Story />
          </FormProvider>
        </TestIdProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof CurrencyInput>;

type Story = StoryObj<typeof CurrencyInput>;

const Template: Story = {
  render: args => <CurrencyInput {...args} />,
};

export const USD = {
  ...Template,
  args: {
    name: "currencyMask",
  },
};

export const YEN = {
  ...Template,
  args: {
    name: "currencyMask",
    precision: 0,
  },
};

export const PERCENT = {
  ...Template,
  args: {
    name: "currencyMask",
    symbol: "",
    InputProps: {
      endAdornment: <InputAdornment position="start">%</InputAdornment>,
    },
  },
};
