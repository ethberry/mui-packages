import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

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

export const USD: Story = {
  render: args => <CurrencyInput {...args} />,
  args: {
    name: "currencyMask",
  },
};

export const YEN: Story = {
  render: args => <CurrencyInput {...args} />,
  args: {
    name: "currencyMask",
    precision: 0,
  },
};

export const PERCENT: Story = {
  render: args => <CurrencyInput {...args} />,
  args: {
    name: "currencyMask",
    symbol: "",
    InputProps: {
      endAdornment: <InputAdornment position="start">%</InputAdornment>,
    },
  },
};
