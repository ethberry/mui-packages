import { ReactElement } from "react";
import { Story } from "@storybook/react";

import { Spinner } from ".";

export default {
  title: "Progress/Spinner",
  component: Spinner,
  decorators: [(Story: Story): ReactElement => <Story />],
};

const Template: Story = args => <Spinner {...args} />;

export const Simple = Template.bind({});
