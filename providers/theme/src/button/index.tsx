import { FC } from "react";
import { useIntl } from "react-intl";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { ThemeType } from "@gemunion/constants";
import { useAppDispatch, useAppSelector } from "@gemunion/redux";

import { themeTypeSelector, setThemeType } from "../reducer";

export const Theme: FC = () => {
  const { formatMessage } = useIntl();
  const themeType = useAppSelector(themeTypeSelector);
  const dispatch = useAppDispatch();

  const handleThemeIconClick = () => {
    dispatch(setThemeType(themeType === ThemeType.light ? ThemeType.dark : ThemeType.light));
  };

  return (
    <Tooltip title={formatMessage({ id: "components.header.theme.switch" })}>
      <IconButton color="inherit" onClick={handleThemeIconClick} data-testid="switchTheme">
        {themeType === ThemeType.light ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};
