import { FC, ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { createTheme, ThemeProvider } from "@mui/material";
import fetch from "node-fetch";

import { TestIdProvider } from "@gemunion/provider-test-id";

import { NumberInput } from "./index";

beforeAll(() => (window.fetch = window.fetch || fetch));
afterEach(cleanup);

const i18n = {
  "form.labels.number": "Number",
  "form.placeholders.number": "50",
};

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MemoryRouter>
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <TestIdProvider testId="number">
            <FormProvider {...useForm()}>{children}</FormProvider>
          </TestIdProvider>
        </IntlProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe("<NumberInput />", () => {
  it("renders positive value", () => {
    const props = {
      name: "number",
      value: 50,
    };

    const { asFragment } = render(<NumberInput {...props} />, { wrapper: AllTheProviders });

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders negative value", () => {
    const props = {
      name: "number",
      value: -50,
    };

    const { asFragment } = render(<NumberInput {...props} />, { wrapper: AllTheProviders });

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders decimal value", () => {
    const props = {
      name: "number",
      value: 9.99,
    };

    const { asFragment } = render(<NumberInput {...props} />, { wrapper: AllTheProviders });

    expect(asFragment()).toMatchSnapshot();
  });
});
