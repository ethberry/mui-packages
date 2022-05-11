import { FC } from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, StyledEngineProvider, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { useSettings } from "@gemunion/provider-settings";

import { dark, light } from "./palette";

export interface IThemeProviderProps {
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
  options?: Omit<ThemeOptions, "palette">;
}

export const GemunionThemeProvider: FC<IThemeProviderProps> = props => {
  const { darkPalette = dark, lightPalette = light, options = {}, children } = props;
  const settings = useSettings();

  const theme = createTheme({
    palette: {
      light: lightPalette,
      dark: darkPalette,
    }[settings.getTheme()],
    ...options,
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {children}
      </StyledEngineProvider>
    </ThemeProvider>
  );
};
