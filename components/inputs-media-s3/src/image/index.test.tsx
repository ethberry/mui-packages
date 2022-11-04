import { IntlProvider } from "react-intl";
import { cleanup, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { FormWrapper } from "@gemunion/mui-form";
import { SnackbarProvider } from "notistack";

import { ImageInput } from "./index";

afterEach(cleanup);

const i18n = {
  "form.labels.image": "Image",
  "form.tips.delete": "Delete",
  "form.validations.valueMissing": "Image is required",
  "form.validations.whitelistValidation": "Property Image is not recognized",
};

describe("<ImageInput />", () => {
  it("renders the empty field", () => {
    const props = {
      name: "image",
    };

    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <FormWrapper onSubmit={Promise.resolve} initialValues={{ image: "" }}>
              <ImageInput {...props} />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the field with image", () => {
    const props = {
      name: "image",
    };

    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <FormWrapper
              onSubmit={Promise.resolve}
              initialValues={{
                image: "https://lms2-dev.s3-us-west-2.amazonaws.com/7f0f427f-eeba-4ffb-a1c8-f730721bfd46.jpeg",
              }}
            >
              <ImageInput {...props} />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
