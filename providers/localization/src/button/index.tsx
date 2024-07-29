import { FC, Fragment, MouseEvent, ReactElement, useLayoutEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { IconButton, Menu, MenuItem, MenuItemProps, MenuProps, Tooltip } from "@mui/material";
import { Translate } from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "@gemunion/redux";

import { languageSelector, setLanguage, TLanguage } from "../reducer";

export interface ILocalizationProps {
  languages: Array<string>;
  icon?: ReactElement;
  menuProps?: Partial<MenuProps>;
  menuItemProps?: MenuItemProps;
}

export const Localization: FC<ILocalizationProps> = props => {
  const { languages, icon, menuProps = {}, menuItemProps = {} } = props;
  const { formatMessage } = useIntl();

  const languageFromState = useAppSelector(languageSelector);
  const dispatch = useAppDispatch();

  const [anchor, setAnchor] = useState<Element | null>(null);

  const handleLanguageIconClick = (e: MouseEvent): void => {
    setAnchor(e.currentTarget);
  };

  const handleLanguageMenuClose = (): void => {
    setAnchor(null);
  };

  const cleanLanguageValue = (value: string): string => {
    let cleanedValue = value;
    while (cleanedValue.startsWith('"') && cleanedValue.endsWith('"')) {
      cleanedValue = cleanedValue.slice(1, -1);
    }
    return cleanedValue;
  };

  const handleLanguageMenuItemClick = (language: string) => (): void => {
    dispatch(setLanguage(language as TLanguage));
    localStorage.setItem("language", language);
    document.documentElement.setAttribute("lang", language);
    handleLanguageMenuClose();
  };

  useLayoutEffect(() => {
    const language = localStorage.getItem("language");
    if (language) {
      dispatch(setLanguage(cleanLanguageValue(language)));
      document.documentElement.setAttribute("lang", language);
    }
  }, []);

  return (
    <Fragment>
      <Tooltip title={formatMessage({ id: "components.header.language.switch" })} enterDelay={300}>
        <IconButton
          color="inherit"
          aria-owns={anchor ? "language-menu" : undefined}
          aria-haspopup="true"
          onClick={handleLanguageIconClick}
          data-testid="switchLanguage"
        >
          {icon || <Translate />}
        </IconButton>
      </Tooltip>
      <Menu id="language-menu" anchorEl={anchor} open={!!anchor} onClose={handleLanguageMenuClose} {...menuProps}>
        {languages.map(language => (
          <MenuItem
            key={language}
            selected={languageFromState === language}
            onClick={handleLanguageMenuItemClick(language)}
            {...menuItemProps}
          >
            <FormattedMessage id={`enums.language.${language}`} />
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};
