import { configureStore, combineReducers, ThunkAction, Action } from "@reduxjs/toolkit";

import { settingsMiddleware } from "./middlewares";

/* javascript-obfuscator:disable */
const nodeEnv = process.env.NODE_ENV;
/* javascript-obfuscator:enable */

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
