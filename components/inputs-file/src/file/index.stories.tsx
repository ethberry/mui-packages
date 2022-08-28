import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { SnackbarProvider } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { Story } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { IFileInputProps, FileInput } from "./index";

const i18n = {
  "form.labels.file": "File",
};

export default {
  title: "FileInput/File",
  component: FileInput,
  decorators: [
    (Story: Story): ReactElement => {
      return (
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider>
            <TestIdProvider testId="file">
              <FormProvider {...useForm({ defaultValues: {} })}>
                <Story />
              </FormProvider>
            </TestIdProvider>
          </SnackbarProvider>
        </IntlProvider>
      );
    },
  ],
};

const Template: Story<IFileInputProps> = args => <FileInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "file",
  onChange: (files: Array<File>) => {
    console.info(files);
  },
};
