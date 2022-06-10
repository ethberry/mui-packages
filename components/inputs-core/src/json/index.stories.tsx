import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { JsonInput } from "./index";
import { TextFieldProps } from "@mui/material";

const i18n = {
  "form.labels.json": "JSON",
  "form.placeholders.json": "JSON",
  "form.validations.valueMissing": "Value missing",
  "form.validations.invalidJSON": "JSON is invalid",
};

export default {
  title: "Input/Json",
  component: JsonInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <FormProvider
          {...useForm({
            defaultValues: {
              json: JSON.stringify({
                a: 1,
              }),
            },
          })}
        >
          <Story />
        </FormProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<TextFieldProps & { name: string }> = args => <JsonInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "json",
};
