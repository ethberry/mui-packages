import { CustomErrors } from "./interfaces";

export const customErrorToReason = (error: string, customProjectErrors: Record<string, string> = {}): string => {
  const code = error.slice(0, 10);
  const errors = { ...CustomErrors, ...customProjectErrors };

  for (const key in errors) {
    if (key === code) {
      return errors[key as keyof typeof CustomErrors];
    }
  }
  return "Unknown custom error";
};
