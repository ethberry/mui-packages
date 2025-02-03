import { Meta, StoryObj } from "@storybook/react";

import { Spinner } from ".";

export default {
  title: "Progress/Spinner",
  component: Spinner,
} as Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

export const Simple: Story = {
  render: args => <Spinner {...args} />,
};
