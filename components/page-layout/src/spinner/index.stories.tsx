import { Meta, StoryObj } from "@storybook/react";

import { Spinner } from ".";

export default {
  title: "Progress/Spinner",
  component: Spinner,
} as Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

const Template: Story = {
  render: args => <Spinner {...args} />,
};

export const Simple = Template;
