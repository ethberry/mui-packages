import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { ITextInputProps, TextInput } from "./index";

const i18n = {
  "form.labels.text": "Text",
  "form.placeholders.text": "Lorem ipsum...",
  "form.validations.required": "Required",
};

export default {
  title: "Input/Text",
  component: TextInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <FormProvider {...useForm({ defaultValues: { text: "qwerty" } })}>
          <Story />
        </FormProvider>
      </IntlProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["standard", "outlined", "filled"],
    },
    disabled: {
      control: { type: "boolean" },
    },
    readOnly: {
      control: { type: "boolean" },
    },
  },
  args: {
    variant: "standard",
    disabled: false,
    readOnly: false,
  },
};

const SimpleTemplate: Story<ITextInputProps> = args => {
  return <TextInput {...args} />;
};

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  name: "text",
};

export const CustomLabel = SimpleTemplate.bind({});
CustomLabel.args = {
  name: "text",
  label: "My label",
  placeholder: "My placeholder",
};
