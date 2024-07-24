import { PayloadAction, createSlice, isAnyOf, Slice } from "@reduxjs/toolkit";

import {
  RTLLanguages,
  ThemeType,
  LAYOUT_DIRECTION,
  LAYOUT_SLICE_NAME,
  SET_LANGUAGE_ACTION_TYPE,
} from "@gemunion/constants";

import { ILayoutState } from "./interfaces";
import { emptyLayoutState } from "./empty";
import { initializeLayout } from "./async-actions";

export const layoutSlice: Slice<ILayoutState> = createSlice({
  name: LAYOUT_SLICE_NAME,
  initialState: emptyLayoutState,
  selectors: {
    layoutDirectionSelector: state => state.layoutDirection,
    themeTypeSelector: state => state.themeType,
  },
  reducers: {
    setLayoutDirection: (state, action: PayloadAction<LAYOUT_DIRECTION>) => {
      state.layoutDirection = action.payload;
    },
    setThemeType: (state, action: PayloadAction<ThemeType>) => {
      state.themeType = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addMatcher(isAnyOf(initializeLayout.fulfilled), (state, action) => {
        state.layoutDirection = action.payload.layoutDirection;
        state.themeType = action.payload.themeType;
      })
      .addMatcher(
        action => action.type === SET_LANGUAGE_ACTION_TYPE,
        (state, action: PayloadAction<RTLLanguages>) => {
          state.layoutDirection = action.payload === RTLLanguages.AR ? LAYOUT_DIRECTION.rtl : LAYOUT_DIRECTION.ltr;
        },
      ),
});

export const { setThemeType } = layoutSlice.actions;

export const { layoutDirectionSelector, themeTypeSelector } = layoutSlice.selectors as any;
