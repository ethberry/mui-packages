import { BrowserRouter } from 'react-router-dom';
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider, StyledEngineProvider} from "@mui/material/styles";

import { LicenseProvider } from "@gemunion/provider-license";

export const decorators = [
  Story => (
    <BrowserRouter>
      <ThemeProvider theme={createTheme()}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <LicenseProvider licenseKey={process.env.STORYBOOK_GEMUNION_LICENSE}>
            <Story />
          </LicenseProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </BrowserRouter>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    page: null
  }
};
