import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { STORE_CONNECTOR } from "./constants";
import { emptyWalletState } from "./empty";
import type { INetwork, IWalletState, TConnectors } from "./interfaces";

const initialState: IWalletState = emptyWalletState;

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setIsDialogOpen(state, action: PayloadAction<boolean>) {
      state.isDialogOpen = action.payload;
    },
    setActiveConnector(state, action: PayloadAction<TConnectors | null>) {
      state.activeConnector = action.payload;
      localStorage.setItem(STORE_CONNECTOR, JSON.stringify(action.payload));
    },
    setNetwork(state, action: PayloadAction<INetwork | null>) {
      state.network = action.payload;
    },
  },
});

export const walletActions = walletSlice.actions;
