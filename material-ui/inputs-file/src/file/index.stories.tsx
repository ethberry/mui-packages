import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { SnackbarProvider } from "notistack";
import { Story } from "@storybook/react";

import { IFileInputProps, FileInput } from "./index";

const i18n = {
  "form.labels.photo": "Photo",
  "form.placeholders.photo": "Photo",
};

export default {
  title: "Example/File",
  component: FileInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={i18n}>
        <SnackbarProvider>
          <Story />
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IFileInputProps> = args => <FileInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  onChange: (files: Array<File>) => {
    void files;
  },
};
