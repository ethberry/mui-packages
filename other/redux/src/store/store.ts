import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";

import { LOCAL_STORAGE_KEYS, SET_LANGUAGE_ACTION_TYPE } from "@gemunion/constants";
import { saveToLS } from "@gemunion/utils";

/* javascript-obfuscator:disable */
const nodeEnv = process.env.NODE_ENV;
/* javascript-obfuscator:enable */

export const settingsMiddleware = () => {
  return (next: any) =>
    (action: any): unknown => {
      if (action.type === SET_LANGUAGE_ACTION_TYPE) {
        saveToLS(LOCAL_STORAGE_KEYS.LANGUAGE, action.payload);
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
