import { FC, PropsWithChildren } from "react";

import { TestIdContext } from "./context";

export interface ITestIdProviderProps {
  testId?: string;
}

export const TestIdProvider: FC<PropsWithChildren<ITestIdProviderProps>> = props => {
  const { children, testId = null } = props;

  return <TestIdContext.Provider value={{ testId }}>{children}</TestIdContext.Provider>;
};
