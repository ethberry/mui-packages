import { FC, Fragment, MouseEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { Translate } from "@mui/icons-material";

import { useSettings } from "@gemunion/provider-settings";

export interface ILocalizationProps {
  languages: Array<string>;
}

export const Localization: FC<ILocalizationProps> = props => {
  const { languages } = props;

  const { formatMessage } = useIntl();
  const settings = useSettings();
  const [anchor, setAnchor] = useState<Element | null>(null);

  const handleLanguageIconClick = (e: MouseEvent): void => {
    setAnchor(e.currentTarget);
  };

  const handleLanguageMenuClose = (): void => {
    setAnchor(null);
  };

  const handleLanguageMenuItemClick = (language: string) => (): void => {
    settings.setLanguage(language);
    document.documentElement.setAttribute("lang", language);
    handleLanguageMenuClose();
  };

  return (
    <Fragment>
      <Tooltip title={formatMessage({ id: "components.header.language.switch" })} enterDelay={300}>
        <IconButton
          color="inherit"
          aria-owns={anchor ? "language-menu" : undefined}
          aria-haspopup="true"
          onClick={handleLanguageIconClick}
        >
          <Translate />
        </IconButton>
      </Tooltip>
      <Menu id="language-menu" anchorEl={anchor} open={!!anchor} onClose={handleLanguageMenuClose}>
        {languages.map(language => (
          <MenuItem
            key={language}
            selected={settings.getLanguage() === language}
            onClick={handleLanguageMenuItemClick(language)}
          >
            <FormattedMessage id={`enums.language.${language}`} />
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
