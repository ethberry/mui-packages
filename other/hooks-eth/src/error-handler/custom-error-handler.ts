import { CustomErrors } from "./interfaces";

export const customErrorToReason = (error: string): string => {
  const code = error.slice(0, 10);
  for (const key in CustomErrors) {
    if (key === code) {
      return CustomErrors[key as keyof typeof CustomErrors];
    }
  }
  return "Unknown custom error";
};
