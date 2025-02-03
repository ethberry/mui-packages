import { MemoryRouter } from "react-router";
import { createTheme, CssBaseline, StyledEngineProvider, ThemeProvider } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { Preview } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";

import { createStore, ReduxProvider } from "../other/redux";

const decorators = [
  Story => {
    return (
      <MemoryRouter>
        <ReduxProvider store={createStore([])}>
          <ThemeProvider theme={createTheme()}>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <FormProvider {...useForm()}>
                <Story />
              </FormProvider>
            </StyledEngineProvider>
          </ThemeProvider>
        </ReduxProvider>
      </MemoryRouter>
    );
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
