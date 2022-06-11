import { FC } from "react";

import { CssBaseline } from "@mui/material";
import {
  createTheme,
  PaletteOptions,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { useSettings } from "@gemunion/provider-settings";

import { dark, light } from "./palette";

export interface IThemeProviderProps {
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
  options?: Omit<ThemeOptions, "palette">;
}

export const ThemeProvider: FC<IThemeProviderProps> = props => {
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
    <MuiThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        {children}
      </StyledEngineProvider>
    </MuiThemeProvider>
  );
};
