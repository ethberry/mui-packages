import { Keplr, OfflineAminoSigner, OfflineDirectSigner } from "@keplr-wallet/types";

export interface IHandlerOptionsParams {
  success?: boolean;
  error?: boolean;
}

export interface ICosmosParams {
  keplr: Keplr;
  offlineSigner: OfflineAminoSigner & OfflineDirectSigner;
}
