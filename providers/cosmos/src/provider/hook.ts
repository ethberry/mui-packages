import { useContext } from "react";

import { CosmosContext } from "./context";

export const useCosmos = () => {
  return useContext(CosmosContext);
};
