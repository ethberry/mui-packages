import { CustomErrorPrefix, CustomErrorReasons } from "./interfaces";

export const customErrorToReason = (error: string): string => {
  const code = error.slice(0, 10);
  for (const key in CustomErrorPrefix) {
    if (key === code) {
      return CustomErrorReasons[CustomErrorPrefix[key as keyof typeof CustomErrorPrefix]];
    }
  }
  return "Unknown custom error";
};
