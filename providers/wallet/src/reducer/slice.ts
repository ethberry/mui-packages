import { PayloadAction, createSlice, isAnyOf, Slice } from "@reduxjs/toolkit";

import type { INetwork } from "@gemunion/types-blockchain";
import { WALLET_SLICE_NAME } from "@gemunion/constants";

import { emptyWalletState } from "./empty";
import type { IWalletState, TConnectors, TWalletConnectorTuple } from "./interfaces";
import { initializeActiveConnector } from "./async-actions";
import { initializeWalletConnector } from "../connectors/wallet-connect";

const initialState: IWalletState = emptyWalletState;

export const walletSlice: Slice<IWalletState> = createSlice({
  name: WALLET_SLICE_NAME,
  initialState,
  selectors: {
    isDialogOpenSelector: state => state.isDialogOpen,
    activeConnectorSelector: state => state.activeConnector,
    networkSelector: state => state.network,
    networksSelector: state => state.networks,
    walletConnectorSelector: state => state.walletConnector,
    referrerSelector: state => state.referrer,
  },
  reducers: {
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setActiveConnector: (state, action: PayloadAction<TConnectors | null>) => {
      state.activeConnector = action.payload;
    },
    setNetwork: (state, action: PayloadAction<INetwork | undefined>) => {
      state.network = action.payload;
    },
    setNetworks: (state, action: PayloadAction<Record<number, INetwork>>) => {
      state.networks = action.payload;
      state.walletConnector = initializeWalletConnector(action.payload);
    },
    setReferrer: (state, action: PayloadAction<string>) => {
      state.referrer = action.payload;
    },
    setWalletConnector: (state, action: PayloadAction<TWalletConnectorTuple>) => {
      state.walletConnector = action.payload;
    },
  },
  extraReducers: builder =>
    builder.addMatcher(isAnyOf(initializeActiveConnector.fulfilled), (state, action) => {
      state.activeConnector = action.payload;
    }),
});

export const walletActions = walletSlice.actions;

export const walletSelectors = walletSlice.selectors as any;
