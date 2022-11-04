import { IntlProvider } from "react-intl";
import { cleanup, render } from "@testing-library/react";
import { createTheme, ThemeProvider } from "@mui/material";
import { FormWrapper } from "@gemunion/mui-form";
import { SnackbarProvider } from "notistack";

import { VideoInput } from "./index";

afterEach(cleanup);

const i18n = {
  "form.labels.video": "Video",
  "form.tips.delete": "Delete",
  "form.validations.valueMissing": "Video is required",
  "form.validations.whitelistValidation": "Property Video is not recognized",
};

describe("<VideoInput />", () => {
  it("renders the empty field", () => {
    const props = {
      name: "video",
    };

    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <FormWrapper onSubmit={Promise.resolve} initialValues={{ video: "" }}>
              <VideoInput {...props} />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the field with video", () => {
    const props = {
      name: "video",
    };

    const { asFragment } = render(
      <ThemeProvider theme={createTheme()}>
        <IntlProvider locale="en" messages={i18n}>
          <SnackbarProvider maxSnack={3}>
            <FormWrapper
              onSubmit={Promise.resolve}
              initialValues={{ video: "https://trejgun-test.s3.us-west-1.amazonaws.com/DO_NOT_REMOVE_video.mp4" }}
            >
              <VideoInput {...props} />
            </FormWrapper>
          </SnackbarProvider>
        </IntlProvider>
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
