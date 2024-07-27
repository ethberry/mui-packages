import { EnabledLanguages, RTLLanguages } from "@gemunion/constants";

// remove RTLLanguages after common next release
export type TLanguage = EnabledLanguages | RTLLanguages;

export interface ILocalizationState {
  language: TLanguage;
}
