import { useContext } from "react";

import { InputRegistryContext } from "./context";

export const useInputRegistry = () => {
  return useContext(InputRegistryContext);
};
