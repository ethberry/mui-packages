import { Resolver } from "react-hook-form";
import { ValidationError } from "yup";

export const useYupValidationResolver =
  (validate: (data: any) => Promise<any>): Resolver =>
  async (data: any) => {
    try {
      const values = await validate(data);

      return {
        values,
        errors: {},
      };
    } catch (errors) {
      return {
        values: {},
        errors: (errors?.inner || []).reduce(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          (allErrors: ValidationError | any, currentError: ValidationError) => ({
            ...allErrors,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            [currentError.path!]: {
              type: currentError.type ?? "validation",
              message: currentError.message,
            },
          }),
          {},
        ),
      };
    }
  };
