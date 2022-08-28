import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { FormProvider, useForm } from "react-hook-form";
import { SnackbarProvider } from "notistack";
import { Story } from "@storybook/react";

import { JwtApiProvider } from "@gemunion/provider-api-jwt";
import { TestIdProvider } from "@gemunion/provider-test-id";

import { AvatarInput, IAvatarInputProps } from "./index";

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
  title: "FileInput/S3/Avatar",
  component: AvatarInput,
  decorators: [
    (Story: Story): ReactElement => (
      <JwtApiProvider baseUrl={"http://localhost/"}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider>
            <TestIdProvider testId="avatar">
              <FormProvider {...useForm({ defaultValues: { avatar: "" } })}>
                <Story />
              </FormProvider>
            </TestIdProvider>
          </SnackbarProvider>
        </IntlProvider>
      </JwtApiProvider>
    ),
  ],
};

const Template: Story<IAvatarInputProps> = args => <AvatarInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "avatar",
};
