import { useCallback } from "react";
import { Resolver } from "react-hook-form";
import * as Yup from "yup";

export const useYupValidationResolver = (validate: (data: any) => Promise<any>): Resolver =>
  useCallback(
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
            (allErrors: Yup.ValidationError | any, currentError: Yup.ValidationError) => ({
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
    },
    [validate],
  );
