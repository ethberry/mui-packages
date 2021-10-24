import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Formik } from "formik";
import { Story } from "@storybook/react";

import { ISwitchInputProps, SwitchInput } from "./index";

const i18n = {
  "form.labels.switch": "Switch",
};

export default {
  title: "Input/Switch",
  component: SwitchInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <Formik onSubmit={() => {}} initialValues={{ checkbox: false }}>
          <Story />
        </Formik>
      </IntlProvider>
    ),
  ],
};

const Template: Story<ISwitchInputProps> = args => <SwitchInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "switch",
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "switch",
  disabled: true,
};
