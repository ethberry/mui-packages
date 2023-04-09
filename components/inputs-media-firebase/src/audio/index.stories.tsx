import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { AudioInput } from "./index";

const i18n = {
  "components.dropzone.file-invalid-type": "You can't upload {type} only {accept} are allowed",
  "components.dropzone.file-too-large": "File is {size}, maximum file size is {maxSize}",
  "components.dropzone.file-too-small": "File is {size}, minimum file size is {minSize}",
  "components.dropzone.too-many-files": "Too many files",
  "form.labels.audio": "Audio",
  "form.placeholders.audio": "Audio",
  "form.tips.delete": "Delete",
};

export default {
  title: "FileInput/Firebase/Audio",
  component: AudioInput,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <TestIdProvider testId="image">
            <FormProvider {...useForm({ defaultValues: { audio: "" } })}>
              <Story />
            </FormProvider>
          </TestIdProvider>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof AudioInput>;

type Story = StoryObj<typeof AudioInput>;

const Template: Story = {
  render: args => <AudioInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "audio",
  },
};
