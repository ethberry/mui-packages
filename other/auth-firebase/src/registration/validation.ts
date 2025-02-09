import { object, string } from "yup";

import { confirmValidationSchema, displayNameValidationSchema, emailValidationSchema } from "@ethberry/yup-rules";

export const validationSchema = object().shape({
  email: emailValidationSchema,
  password: string().required("form.validations.valueMissing"),
  confirm: confirmValidationSchema,
  displayName: displayNameValidationSchema,
});
