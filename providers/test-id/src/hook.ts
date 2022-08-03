import { useContext } from "react";

import { TestIdContext } from "./context";

export const useTestId = () => {
  return useContext(TestIdContext);
};
