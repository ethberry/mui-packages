import { object } from "yup";

import { confirmValidationSchema, passwordValidationSchema } from "@ethberry/yup-rules";

export const validationSchema = object().shape({
  password: passwordValidationSchema,
  confirm: confirmValidationSchema,
});
