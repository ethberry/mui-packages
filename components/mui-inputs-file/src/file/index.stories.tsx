import { IntlProvider } from "react-intl";
import { SnackbarProvider } from "notistack";
import { FormProvider, useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { FileInput } from "./index";

const i18n = {
  "form.labels.file": "File",
};

export default {
  title: "FileInput/File",
  component: FileInput,
  decorators: [
    Story => {
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
} as Meta<typeof FileInput>;

type Story = StoryObj<typeof FileInput>;

export const Simple: Story = {
  render: args => <FileInput {...args} />,
  args: {
    name: "file",
    onChange: (files: Array<File>) => {
      console.info(files);
    },
  },
};
