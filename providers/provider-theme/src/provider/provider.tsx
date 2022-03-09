import { FC } from "react";

import { CssBaseline } from "@mui/material";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { PaletteOptions } from "@mui/material/styles/createPalette";
import { useSettings } from "@gemunion/provider-settings";
import { ThemeType } from "@gemunion/constants";

import { dark, light } from "./palette";

export interface IThemeProviderProps {
  type?: ThemeType;
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
}

export const GemunionThemeProvider: FC<IThemeProviderProps> = props => {
  const { darkPalette = dark, lightPalette = light, children } = props;

  const settings = useSettings();

  const theme = createTheme({
    palette: {
      light: lightPalette,
      dark: darkPalette,
    }[settings.getTheme()],
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
