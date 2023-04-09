import { IntlProvider, FormattedMessage } from "react-intl";
import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/react";

import { PageHeader } from "./index";

const i18n = {
  "pages.test.title": "Page header",
  "pages.test.title-with-var": "Page header with variable: {var}",
  "pages.test.button": "Click me!",
};

export default {
  title: "Component/PageHeader",
  component: PageHeader,
  decorators: [
    Story => (
      <IntlProvider locale="en" messages={i18n}>
        <Story />
      </IntlProvider>
    ),
  ],
} as Meta<typeof PageHeader>;

type Story = StoryObj<typeof PageHeader>;

const Template: Story = {
  render: args => <PageHeader {...args} />,
};

export const Simple = {
  ...Template,
  args: {
    message: "pages.test.title",
  },
};

export const WithVariable = {
  ...Template,
  args: {
    message: "pages.test.title-with-var",
    data: { var: "VAR" },
  },
};

const TemplateWithButton: Story = {
  render: args => (
    <PageHeader {...args}>
      <Button color="primary" variant="contained">
        <FormattedMessage id="pages.test.button" />
      </Button>
    </PageHeader>
  ),
};

export const WithButton = {
  ...TemplateWithButton,
  args: {
    message: "pages.test.title",
  },
};
