import { IntlProvider } from "react-intl";
import { cleanup, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { FormWrapper } from "@gemunion/mui-form";
import { SnackbarProvider } from "notistack";

import { AudioInput } from "./index";

afterEach(cleanup);

const i18n = {
  "form.labels.audio": "Audio",
  "form.tips.delete": "Delete",
  "form.validations.valueMissing": "Audio is required",
  "form.validations.whitelistValidation": "Property Audio is not recognized",
};

describe("<AudioInput />", () => {
  it("renders the empty field", () => {
    const props = {
      name: "audio",
    };

    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <FormWrapper onSubmit={Promise.resolve} initialValues={{ audio: "" }}>
              <AudioInput {...props} />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the field with audio", () => {
    const props = {
      name: "audio",
    };

    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <FormWrapper
              onSubmit={Promise.resolve}
              initialValues={{ audio: "https://trejgun-test.s3.us-west-1.amazonaws.com/DO_NOT_REMOVE_audio.mp3" }}
            >
              <AudioInput {...props} />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
