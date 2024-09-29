import { createAsyncThunk } from "@reduxjs/toolkit";

import { LAYOUT_SLICE_NAME, LOCAL_STORAGE_KEYS } from "@ethberry/constants";
import { readFromLS } from "@ethberry/utils";

import { ILayoutState } from "./interfaces";
import { emptyLayoutState } from "./empty";

export const initializeLayout = createAsyncThunk<ILayoutState, void, any>(
  `${LAYOUT_SLICE_NAME}/initializeLayout`,
   (_, thunkAPI) => {
    try {
      const layout: ILayoutState = readFromLS(LOCAL_STORAGE_KEYS.LAYOUT, emptyLayoutState);
      if (!layout) {
        return thunkAPI.rejectWithValue(null);
      }
      return layout;
    } catch (e) {
      void e;
      return thunkAPI.rejectWithValue(null);
    }
  },
);
