import { PayloadAction, Slice, createSlice, isAnyOf } from "@reduxjs/toolkit";

import { EnabledLanguages, LOCALIZATION_SLICE_NAME } from "@gemunion/constants";

import { ILocalizationState, TLanguage } from "./interfaces";
import { initializeLanguage } from "./async-actions";

export const localizationSlice: Slice<ILocalizationState> = createSlice({
  name: LOCALIZATION_SLICE_NAME,
  initialState: {
    language: EnabledLanguages.EN,
  } as ILocalizationState,
  selectors: {
    languageSelector: state => state.language,
  },
  reducers: {
    setLanguage: (state, action: PayloadAction<TLanguage>) => {
      state.language = action.payload;
    },
  },
  extraReducers: builder =>
    builder.addMatcher(isAnyOf(initializeLanguage.fulfilled), (state, action) => {
      state.language = action.payload;
    }),
});

export const { setLanguage } = localizationSlice.actions;

export const { languageSelector } = localizationSlice.selectors as any;
