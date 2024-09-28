import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Meta, StoryObj } from "@storybook/react";

import { TestIdProvider } from "@ethberry/provider-test-id";

import { AvatarInput } from "./index";

const i18n = {
  "components.dropzone.file-invalid-type": "You can't upload {type} only {accept} are allowed",
  "components.dropzone.file-too-large": "File is {size}, maximum file size is {maxSize}",
  "components.dropzone.file-too-small": "File is {size}, minimum file size is {minSize}",
  "components.dropzone.too-many-files": "Too many files",
  "form.labels.avatar": "Avatar",
  "form.placeholders.avatar": "Avatar",
  "form.tips.delete": "Delete",
};

export default {
  title: "FileInput/Firebase/Avatar",
  component: AvatarInput,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <TestIdProvider testId="avatar">
            <FormProvider {...useForm({ defaultValues: { avatar: "" } })}>
              <Story />
            </FormProvider>
          </TestIdProvider>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
} as Meta<typeof AvatarInput>;

type Story = StoryObj<typeof AvatarInput>;

const Template: Story = {
  render: args => <AvatarInput {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "avatar",
  },
};
