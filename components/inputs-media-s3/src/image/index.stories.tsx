import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { ImageInput } from "./index";

const i18n = {
  "components.dropzone.file-invalid-type": "You can't upload {type} only {accept} are allowed",
  "components.dropzone.file-too-large": "File is {size}, maximum file size is {maxSize}",
  "components.dropzone.file-too-small": "File is {size}, minimum file size is {minSize}",
  "components.dropzone.too-many-files": "Too many files",
  "form.labels.image": "Image",
  "form.placeholders.image": "Image",
  "form.tips.delete": "Delete",
};

export default {
  title: "FileInput/S3/Image",
  component: ImageInput,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <TestIdProvider testId="image">
            <FormProvider {...useForm({ defaultValues: { image: "" } })}>
              <Story />
            </FormProvider>
          </TestIdProvider>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof ImageInput>;

type Story = StoryObj<typeof ImageInput>;

export const Simple: Story = {
  render: args => <ImageInput {...args} />,
  args: {
    name: "image",
  },
};
