import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";

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
        <Story />
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
  const methods = useForm({
    defaultValues: {
      text: "qwerty",
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}>
        <TextInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Simple = SimpleTemplate.bind({});
Simple.args = {
  name: "text",
};

const ErroredTemplate: Story<ITextInputProps> = args => {
  const methods = useForm({
    defaultValues: {
      text: "qwerty",
    },
  });

  methods.setValue("text", "qwerty", { shouldTouch: true });
  methods.setError("text", { type: "custom", message: "form.validations.required" }, { shouldFocus: true });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(action("[React Hooks Form] Submit"))}>
        <TextInput {...args} />
      </form>
    </FormProvider>
  );
};

export const Errored = ErroredTemplate.bind({});
Errored.args = {
  name: "text",
};
