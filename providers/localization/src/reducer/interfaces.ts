import { EnabledLanguages, RTLLanguages } from "@ethberry/constants";

// remove RTLLanguages after common next release
export type TLanguage = EnabledLanguages | RTLLanguages;

export interface ILocalizationState {
  language: TLanguage;
}
