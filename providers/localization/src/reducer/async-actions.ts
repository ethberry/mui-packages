import { createAsyncThunk } from "@reduxjs/toolkit";

import { EnabledLanguages, LOCAL_STORAGE_KEYS, LOCALIZATION_SLICE_NAME } from "@ethberry/constants";
import { readFromLS } from "@ethberry/utils";

import { TLanguage } from "./interfaces";

export const initializeLanguage = createAsyncThunk<TLanguage, void, any>(
  `${LOCALIZATION_SLICE_NAME}/initializeLanguage`,
  (_, thunkAPI) => {
    try {
      const language: TLanguage = readFromLS(LOCAL_STORAGE_KEYS.LANGUAGE, EnabledLanguages.EN);
      if (!language) {
        return thunkAPI.rejectWithValue(null);
      }
      return language;
    } catch (e) {
      void e;
      return thunkAPI.rejectWithValue(null);
    }
  },
);
