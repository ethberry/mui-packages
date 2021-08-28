import React, { FC, useState } from "react";

import { CssBaseline } from "@material-ui/core";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

import { ThemeContext, ThemeType } from "./context";
import { dark, light } from "./palette";

export interface IThemeProviderProps {
  type?: ThemeType;
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
}

export const GemunionThemeProvider: FC<IThemeProviderProps> = props => {
  const { type: defaultType = ThemeType.light, darkPalette = dark, lightPalette = light, children } = props;

  const [type, setType] = useState<ThemeType>(defaultType);

  const changeThemeType = (type: ThemeType): void => {
    setType(type);
  };

  const theme = createTheme({
    palette: {
      light: lightPalette,
      dark: darkPalette,
    }[type],
  });

  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <ThemeContext.Provider
          value={{
            type,
            changeThemeType,
          }}
        >
          {children}
        </ThemeContext.Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};
