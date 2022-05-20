import { ReactElement } from "react";
import { IntlProvider } from "react-intl";
import { SnackbarProvider } from "notistack";
import { Formik } from "formik";
import { Story } from "@storybook/react";

import { IFileInputProps, FileInput } from "./index";

export default {
  title: "FileInput/File",
  component: FileInput,
  decorators: [
    (Story: Story): ReactElement => (
      <IntlProvider locale="en" messages={{}}>
        <SnackbarProvider>
          <Formik onSubmit={() => {}} initialValues={{}}>
            <Story />
          </Formik>
        </SnackbarProvider>
      </IntlProvider>
    ),
  ],
};

const Template: Story<IFileInputProps> = args => <FileInput {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  onChange: (files: Array<File>) => {
    console.info(files);
  },
};
