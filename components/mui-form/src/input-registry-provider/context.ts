import { createContext } from "react";

export interface IInputRegistry {
  name: string;
  isAsync?: boolean;
}

export interface IInputRegistryContext {
  registeredInputs: IInputRegistry[];
  registerInput: (name: string, isAsync: boolean) => void;
  unregisterInput: (name: string) => void;
}

export const InputRegistryContext = createContext<IInputRegistryContext>(undefined!);
