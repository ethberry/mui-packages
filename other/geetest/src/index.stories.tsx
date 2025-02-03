import { Meta, StoryObj } from "@storybook/react";

import { FormWrapper } from "@ethberry/mui-form";
import { ApiProviderJwt } from "@ethberry/provider-api-jwt";

import { GeeTestCaptcha } from ".";

export default {
  title: "Example/GeeTestCaptcha",
  component: GeeTestCaptcha,
  decorators: [
    Story => (
      <ApiProviderJwt baseUrl={"http://localhost/"}>
        <FormWrapper onSubmit={Promise.resolve} initialValues={{ photo: [] }}>
          <Story />
        </FormWrapper>
      </ApiProviderJwt>
    ),
  ],
} as Meta<typeof GeeTestCaptcha>;

type Story = StoryObj<typeof GeeTestCaptcha>;

export const Simple: Story = {
  render: args => <GeeTestCaptcha {...args} />,
  args: {
    name: "captcha",
  },
};
