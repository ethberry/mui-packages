import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { VideoInput } from "./index";

const i18n = {
  "components.dropzone.file-invalid-type": "You can't upload {type} only {accept} are allowed",
  "components.dropzone.file-too-large": "File is {size}, maximum file size is {maxSize}",
  "components.dropzone.file-too-small": "File is {size}, minimum file size is {minSize}",
  "components.dropzone.too-many-files": "Too many files",
  "form.labels.video": "Video",
  "form.placeholders.video": "Video",
  "form.tips.delete": "Delete",
};

export default {
  title: "FileInput/S3/Video",
  component: VideoInput,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <TestIdProvider testId="video">
            <FormProvider {...useForm({ defaultValues: { video: "" } })}>
              <Story />
            </FormProvider>
          </TestIdProvider>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof VideoInput>;

type Story = StoryObj<typeof VideoInput>;

const Template: Story = {
  render: args => <VideoInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "video",
  },
};
