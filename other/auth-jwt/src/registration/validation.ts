import { object } from "yup";

import {
  confirmValidationSchema,
  displayNameValidationSchema,
  emailValidationSchema,
  passwordValidationSchema,
} from "@ethberry/yup-rules";

export const validationSchema = object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirm: confirmValidationSchema,
  displayName: displayNameValidationSchema,
});
