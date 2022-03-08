import { IntlProvider } from "react-intl";
import { cleanup, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";

import { PageHeader } from "./index";

afterEach(cleanup);

const i18n = {
  "pages.test.title": "Title",
};

describe("<PageHeader />", () => {
  it("renders component", () => {
    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <PageHeader message="pages.test.title" />
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
