import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { FormProvider, useForm } from "react-hook-form";
import { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { LicenseProvider } from "@gemunion/provider-license";
import { SettingsProvider } from "@gemunion/provider-settings";

const decorators = [
  Story => {
    const router = createBrowserRouter([
      {
        path: "*",
        element: (
          <LicenseProvider licenseKey={process.env.STORYBOOK_GEMUNION_LICENSE}>
            <SettingsProvider>
              <ThemeProvider theme={createTheme()}>
                <StyledEngineProvider injectFirst>
                  <CssBaseline />
                  <FormProvider {...useForm()}>
                    <Story />
                  </FormProvider>
                </StyledEngineProvider>
              </ThemeProvider>
            </SettingsProvider>
          </LicenseProvider>
        ),
      },
    ]);

    return <RouterProvider router={router} />;
  },
];

const parameters = {
  actions: { argTypesRegex: "^on.*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
};

const preview: Preview = {
  decorators,
  parameters,
};

export default preview;
