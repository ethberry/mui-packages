import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";
import { InputAdornment } from "@mui/material";

import { CurrencyInput, ICurrencyInputProps } from "./index";

const i18n = {
  "form.labels.currencyMask": "Currency",
  "form.placeholders.currencyMask": "Enter amount",
};

export default {
  title: "MaskedInput/Currency",
  component: CurrencyInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <FormProvider {...useForm({ defaultValues: { currencyMask: 100 } })}>
          <Story />
        </FormProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ICurrencyInputProps> = args => <CurrencyInput {...args} />;

export const USD = Template.bind({});
USD.args = {
  name: "currencyMask",
};

export const YEN = Template.bind({});
YEN.args = {
  name: "currencyMask",
  precision: 0,
};

export const PERCENT = Template.bind({});
PERCENT.args = {
  name: "currencyMask",
  symbol: "",
  InputProps: {
    endAdornment: <InputAdornment position="start">%</InputAdornment>,
  },
};
