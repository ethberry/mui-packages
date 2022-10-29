import { ReactElement } from "react";

import { Story } from "@storybook/react";

import { FormWrapper } from "@gemunion/mui-form";
import { ApiProviderJwt } from "@gemunion/provider-api-jwt";

import { IGeeTestCaptchaProps, GeeTestCaptcha } from ".";

export default {
  title: "Example/GeeTestCaptcha",
  component: GeeTestCaptcha,
  decorators: [
    (Story: Story): ReactElement => (
      <ApiProviderJwt baseUrl={"http://localhost/"}>
        <FormWrapper onSubmit={Promise.resolve} initialValues={{ photo: [] }}>
          <Story />
        </FormWrapper>
      </ApiProviderJwt>
    ),
  ],
};

const Template: Story<IGeeTestCaptchaProps> = args => <GeeTestCaptcha {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  name: "captcha",
};
