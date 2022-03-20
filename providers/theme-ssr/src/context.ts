import { createContext } from "react";

export enum ThemeType {
  light = "light",
  dark = "dark",
}

export interface IThemeContext {
  type: ThemeType;
  changeThemeType: (type: ThemeType) => void;
}

export const ThemeContext = createContext<IThemeContext>(undefined!);
