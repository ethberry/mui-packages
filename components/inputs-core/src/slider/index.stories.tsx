import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { ISliderInputProps, SliderInput } from "./index";

const i18n = {
  "form.labels.slider": "Slider",
};

export default {
  title: "Input/Slider",
  component: SliderInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="slider">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { slider: 250 } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<ISliderInputProps> = args => <SliderInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "slider",
  min: 100,
  max: 1000,
};

export const Disabled = Template.bind({});
Disabled.args = {
  name: "slider",
  min: 100,
  max: 1000,
  disabled: true,
};
