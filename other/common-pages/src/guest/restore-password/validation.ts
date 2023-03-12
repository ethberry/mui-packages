import { object } from "yup";

import { confirmValidationSchema, passwordValidationSchema } from "@gemunion/yup-rules";

export const validationSchema = object().shape({
  password: passwordValidationSchema,
  confirm: confirmValidationSchema,
});
