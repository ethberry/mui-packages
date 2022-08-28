import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";
import { constants } from "ethers";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { EthInput, IEthInputProps } from "./index";

const i18n = {
  "form.labels.ethMask": "Eth",
  "form.placeholders.ethMask": "Enter amount",
};

export default {
  title: "MaskedInput/Eth",
  component: EthInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <TestIdProvider testId="eth">
          <FormProvider {...useForm({ defaultValues: { ethMask: constants.WeiPerEther.toString() } })}>
            <Story />
          </FormProvider>
        </TestIdProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IEthInputProps> = args => <EthInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "ethMask",
};
