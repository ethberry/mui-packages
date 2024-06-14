import { PayloadAction, createSlice, type Slice } from "@reduxjs/toolkit";

import type { INetwork } from "@gemunion/types-blockchain";

import { STORE_CONNECTOR } from "./constants";
import { emptyWalletState } from "./empty";
import type { IWalletState, TConnectors } from "./interfaces";

const initialState: IWalletState = emptyWalletState;

export const walletSlice: Slice<IWalletState> = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setActiveConnector: (state, action: PayloadAction<TConnectors | null>) => {
      state.activeConnector = action.payload;
      localStorage.setItem(STORE_CONNECTOR, JSON.stringify(action.payload));
    },
    setNetwork: (state, action: PayloadAction<INetwork | undefined>) => {
      state.network = action.payload;
    },
    setNetworks: (state, action: PayloadAction<Record<number, INetwork>>) => {
      state.networks = action.payload;
    },
  },
});

export const walletActions = walletSlice.actions;
