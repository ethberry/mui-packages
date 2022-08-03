import { ReactElement } from "react";

import { TestIdContext } from "./context";

export interface ITestIdProviderProps {
  children: ReactElement;
  testId?: string;
}

export const TestIdProvider = (props: ITestIdProviderProps) => {
  const { children, testId = null } = props;

  return <TestIdContext.Provider value={{ testId }}>{children}</TestIdContext.Provider>;
};
