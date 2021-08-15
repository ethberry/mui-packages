import * as Yup from "yup";

import {
  confirmValidationSchema,
  emailValidationSchema,
  firstNameValidationSchema,
  lastNameValidationSchema,
  passwordValidationSchema,
} from "@gemunion/yup-rules";

export const validationSchema = Yup.object().shape({
  email: emailValidationSchema,
  password: passwordValidationSchema,
  confirm: confirmValidationSchema,
  firstName: firstNameValidationSchema,
  lastName: lastNameValidationSchema,
});
