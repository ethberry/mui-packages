import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";
import { constants } from "ethers";

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
        <Formik onSubmit={() => {}} initialValues={{ ethMask: constants.WeiPerEther }}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IEthInputProps> = args => <EthInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "ethMask",
};
