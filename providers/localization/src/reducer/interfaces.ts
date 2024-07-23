import { EnabledLanguages, RTLLanguages } from "@gemunion/constants";

export type TLanguage = EnabledLanguages | RTLLanguages;

export interface ILocalizationState {
  language: TLanguage;
}
