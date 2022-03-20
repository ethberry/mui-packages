import { FC } from "react";
import { useIntl } from "react-intl";
import { IconButton, Tooltip } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import { ThemeType } from "@gemunion/constants";
import { useSettings } from "@gemunion/provider-settings";

export const Theme: FC = () => {
  const { formatMessage } = useIntl();
  const settings = useSettings();

  const handleThemeIconClick = () => {
    settings.setTheme(settings.getTheme() === ThemeType.light ? ThemeType.dark : ThemeType.light);
  };

  return (
    <Tooltip title={formatMessage({ id: "components.header.theme.switch" })}>
      <IconButton color="inherit" onClick={handleThemeIconClick}>
        {settings.getTheme() === ThemeType.light ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};
