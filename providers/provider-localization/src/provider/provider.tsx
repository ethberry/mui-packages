import { FC } from "react";
import { IntlProvider } from "react-intl";

import { useSettings } from "@gemunion/provider-settings";

import { flattenMessages } from "./utils";

interface ILocalizationProviderProps {
  i18n: Record<string, any>;
  defaultLanguage: string;
}

export const LocalizationProvider: FC<ILocalizationProviderProps> = props => {
  const { children, i18n, defaultLanguage } = props;
  const settings = useSettings();

  return (
    <IntlProvider
      defaultLocale={defaultLanguage}
      locale={settings.getLanguage()}
      messages={Object.assign(flattenMessages(i18n[defaultLanguage]), flattenMessages(i18n[settings.getLanguage()]))}
    >
      {children}
    </IntlProvider>
  );
};
