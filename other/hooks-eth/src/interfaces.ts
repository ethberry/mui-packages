export interface IHandlerOptionsParams {
  success?: boolean;
  error?: boolean;
}

export enum SystemModuleType {
  CONTRACT_MANAGER = "CONTRACT_MANAGER",
  EXCHANGE = "EXCHANGE",
  DISPENSER = "DISPENSER",
}
