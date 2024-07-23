import { FC, PropsWithChildren, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  Direction,
  PaletteOptions,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";

import { useAppDispatch, useAppSelector } from "@gemunion/redux";
import { ThemeType } from "@gemunion/constants";

import { dark, light } from "./palette";
import { layoutDirectionSelector, themeTypeSelector, initializeLayout } from "../reducer";

export interface IThemeProviderProps {
  darkPalette?: PaletteOptions;
  lightPalette?: PaletteOptions;
  options?: Omit<ThemeOptions, "palette">;
}

export const ThemeProvider: FC<PropsWithChildren<IThemeProviderProps>> = props => {
  const { darkPalette = dark, lightPalette = light, options = {}, children } = props;

  const dispatch = useAppDispatch();
  const layoutDirection = useAppSelector(layoutDirectionSelector);
  const themeType: ThemeType = useAppSelector(themeTypeSelector);
  const direction = layoutDirection as Direction;

  const cacheRtl = createCache({
    key: "muirtl",
    prepend: true,
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const cacheLtr = createCache({
    key: "muiltr",
    prepend: true,
    stylisPlugins: [prefixer],
  });

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  const theme = createTheme({
    palette: {
      light: lightPalette,
      dark: darkPalette,
    }[themeType],
    direction,
    ...options,
  });

  useEffect(() => {
    void dispatch(initializeLayout());
  }, []);

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  return (
    <CacheProvider value={direction === "rtl" ? cacheRtl : cacheLtr}>
      <StylesProvider jss={jss}>
        <StyledEngineProvider injectFirst>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </CacheProvider>
  );
};
