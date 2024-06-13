import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { collectionSlice } from "./collection";
import { settingsSlice } from "./settings";
import { walletSlice } from "./wallet";

/* javascript-obfuscator:disable */
const nodeEnv = process.env.NODE_ENV;
/* javascript-obfuscator:enable */

export interface IStore {
  collection: ReturnType<typeof collectionSlice.reducer>;
  settings: ReturnType<typeof settingsSlice.reducer>;
  wallet: ReturnType<typeof walletSlice.reducer>;
}

export const store = configureStore<IStore>({
  reducer: {
    collection: collectionSlice.reducer,
    settings: settingsSlice.reducer,
    wallet: walletSlice.reducer,
  },
  devTools: nodeEnv !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
