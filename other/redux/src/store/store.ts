import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";

import {
  LAYOUT_DIRECTION,
  LOCAL_STORAGE_KEYS,
  RTLLanguages,
  LAYOUT_SLICE_NAME,
  SET_ACTIVE_CONNECTOR_ACTION_TYPE,
  SET_LANGUAGE_ACTION_TYPE,
  SET_LAYOUT_DIRECTION_ACTION_TYPE,
  SET_LAYOUT_THEME_ACTION_TYPE,
  SET_REFERRER_ACTION_TYPE,
} from "@gemunion/constants";
import { saveToLS } from "@gemunion/utils";

/* javascript-obfuscator:disable */
const nodeEnv = process.env.NODE_ENV;
/* javascript-obfuscator:enable */

export const settingsMiddleware = (api: any) => {
  return (next: any) =>
    (action: any): unknown => {
      if (action.type === SET_REFERRER_ACTION_TYPE) {
        saveToLS(LOCAL_STORAGE_KEYS.REFERRER, action.payload);
      }
      if (action.type === SET_ACTIVE_CONNECTOR_ACTION_TYPE) {
        saveToLS(LOCAL_STORAGE_KEYS.STORE_CONNECTOR, action.payload);
      }
      if (action.type === SET_LANGUAGE_ACTION_TYPE) {
        const state = api.getState();
        saveToLS(LOCAL_STORAGE_KEYS.LANGUAGE, action.payload);
        saveToLS(LOCAL_STORAGE_KEYS.LAYOUT, {
          layoutDirection: action.payload === RTLLanguages.AR ? LAYOUT_DIRECTION.rtl : LAYOUT_DIRECTION.ltr,
          themeType: state[LAYOUT_SLICE_NAME].themeType,
        });
      }
      if (action.type === SET_LAYOUT_DIRECTION_ACTION_TYPE) {
        const state = api.getState();
        saveToLS(LOCAL_STORAGE_KEYS.LAYOUT, {
          layoutDirection: action.payload,
          themeType: state[LAYOUT_SLICE_NAME].themeType,
        });
      }
      if (action.type === SET_LAYOUT_THEME_ACTION_TYPE) {
        const state = api.getState();
        saveToLS(LOCAL_STORAGE_KEYS.LAYOUT, {
          layoutDirection: state[LAYOUT_SLICE_NAME].layoutDirection,
          themeType: action.payload,
        });
      }
      return next(action);
    };
};

export const createStore = <T extends Record<string, any>>(slices: Array<T>) => {
  const reducers = slices.reduce((obj: Record<string, any>, slice) => {
    obj[slice.name] = slice.reducer;
    return obj;
  }, {});
  return configureStore({
    reducer: combineReducers(reducers),
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat([settingsMiddleware]),
    devTools: nodeEnv !== "production",
  });
};

export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
export type RootState = ReturnType<typeof createStore>["getState"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
