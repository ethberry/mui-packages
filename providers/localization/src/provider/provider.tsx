import { PropsWithChildren, ReactElement } from "react";
import { IntlProvider } from "react-intl";

import { useLicense } from "@gemunion/provider-license";
import { useAppSelector } from "@gemunion/redux";

import { flattenMessages } from "./utils";

interface ILocalizationProviderProps<T extends string> {
  i18n: Record<T, any>;
  defaultLanguage: T;
}

export const LocalizationProvider = <T extends string>(
  props: PropsWithChildren<ILocalizationProviderProps<T>>,
): ReactElement | null => {
  const { children, i18n, defaultLanguage } = props;
  const { language } = useAppSelector(state => state.settings);
  const license = useLicense();

  if (!license.isValid()) {
    return null;
  }

  return (
    <IntlProvider
      defaultLocale={defaultLanguage}
      locale={language}
      messages={Object.assign(flattenMessages(i18n[defaultLanguage]), flattenMessages(i18n[language as T]))}
    >
      {children}
    </IntlProvider>
  );
};
