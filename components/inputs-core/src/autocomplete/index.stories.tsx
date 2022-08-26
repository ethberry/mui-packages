import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { Story } from "@storybook/react";
import { FormProvider, useForm } from "react-hook-form";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { AutocompleteInput, IAutocompleteInputProps } from "./index";

const i18n = {
  "form.labels.autocomplete": "Autocomplete",
  "form.placeholders.autocomplete": "Star w00t",
};

export default {
  title: "Input/Autocomplete",
  component: AutocompleteInput,
  decorators: [
    (Story: Story): ReactElement => (
      <TestIdProvider testId="autocomplete">
        <IntlProvider locale="en" messages={i18n}>
          <FormProvider {...useForm({ defaultValues: { autocomplete: "sw" } })}>
            <Story />
          </FormProvider>
        </IntlProvider>
      </TestIdProvider>
    ),
  ],
};

const Template: Story<IAutocompleteInputProps> = args => <AutocompleteInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "autocomplete",
  options: [
    {
      key: "sw",
      value: "Star wars",
    },
    {
      key: "st",
      value: "Star track",
    },
  ],
};
