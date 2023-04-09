import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { SliderInput } from "./index";

const i18n = {
  "form.labels.slider": "Slider",
};

export default {
  title: "Input/Slider",
  component: SliderInput,
  decorators: [
    Story => (
      <TestIdProvider testId="slider">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { slider: 250 } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
} as Meta<typeof SliderInput>;

type Story = StoryObj<typeof SliderInput>;

const Template: Story = {
  render: args => <SliderInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "slider",
    min: 100,
    max: 1000,
  },
};

export const Disabled = {
  ...Template,
  args: {
    name: "slider",
    min: 100,
    max: 1000,
    disabled: true,
  },
};
