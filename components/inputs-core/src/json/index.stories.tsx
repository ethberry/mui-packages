import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";
import { TextFieldProps } from "@mui/material";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { JsonInput } from "./index";

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
      <TestIdProvider testId="json">
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
      </TestIdProvider>
    ),
  ],
};

const Template: Story<TextFieldProps & { name: string }> = args => <JsonInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "json",
};
