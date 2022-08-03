import { createContext } from "react";

export interface ITestIdContext {
  testId: string | null;
}

export const TestIdContext = createContext<ITestIdContext>(undefined!);
