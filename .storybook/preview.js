import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider, StyledEngineProvider} from "@mui/material/styles";

export const decorators = [
  Story => (
    <ThemeProvider theme={createTheme()}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Story />
      </StyledEngineProvider>
    </ThemeProvider>
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
