import { ThemeType, LAYOUT_DIRECTION } from "@ethberry/constants";

import { ILayoutState } from "./interfaces";

export const emptyLayoutState: ILayoutState = {
  layoutDirection: LAYOUT_DIRECTION.ltr,
  themeType: ThemeType.light,
};
