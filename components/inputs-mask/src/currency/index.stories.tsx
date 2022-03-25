import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";

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
        <Formik onSubmit={() => {}} initialValues={{ currencyMask: 100 }}>
          <Story />
        </Formik>
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
