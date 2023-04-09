import { Meta, StoryObj } from "@storybook/react";

import { FormWrapper } from "@gemunion/mui-form";
import { ApiProviderJwt } from "@gemunion/provider-api-jwt";

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

const Template: Story = {
  render: args => <GeeTestCaptcha {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    name: "captcha",
  },
};
