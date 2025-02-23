import { FC, PropsWithChildren } from "react";
import { IntlProvider } from "react-intl";
import { cleanup, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { MemoryRouter } from "react-router";

import { FormDialog } from "./";

afterEach(cleanup);

const i18n = {
  "dialog.title": "Please fill the form",
  "form.buttons.cancel": "Cancel",
  "form.buttons.ok": "Ok",
  "form.hints.prompt": "Prompt",
};

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          {children}
        </IntlProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("<FormDialog />", () => {
  it("renders closed dialog", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const props = {
      container,
      open: false,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      children: "some text",
      message: "dialog.title",
      initialValues: {
        id: 1,
        title: "Title",
      },
    };

    const { asFragment } = render(<FormDialog {...props} />, { container, wrapper: AllTheProviders });

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders open dialog", () => {
    const container = document.createElement("div");
    document.body.append(container);

    const props = {
      container,
      open: true,
      onConfirm: jest.fn(),
      onCancel: jest.fn(),
      children: "some text",
      message: "dialog.title",
      initialValues: {
        id: 1,
        title: "Title",
      },
    };

    const { asFragment } = render(<FormDialog {...props} />, { container, wrapper: AllTheProviders });

    expect(asFragment()).toMatchSnapshot();
  });
});
