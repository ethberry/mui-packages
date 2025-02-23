import { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";

import { InputRegistryContext } from "./context";
import type { IRegisteredInput } from "..";

export interface IInputRegistryProviderProps {
  registeredInputs: IRegisteredInput[];
  setRegisteredInputs: Dispatch<SetStateAction<IRegisteredInput[]>>;
}

export const InputRegistryProvider: FC<PropsWithChildren<IInputRegistryProviderProps>> = props => {
  const { children, registeredInputs, setRegisteredInputs } = props;

  const registerInput = (name: string, isAsync = true) => {
    setRegisteredInputs(inputs => [...inputs, { name, isAsync }]);
  };

  const unregisterInput = (name: string) => {
    setRegisteredInputs(inputs => inputs.filter(input => input.name !== name));
  };

  return (
    <InputRegistryContext.Provider value={{ registeredInputs, registerInput, unregisterInput }}>
      {children}
    </InputRegistryContext.Provider>
  );
};
