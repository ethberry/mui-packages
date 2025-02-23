import { string } from "yup";

import { emailMaxLength } from "../../../../common-packages/other/constants/src";

export const emailValidationSchema = string()
  .max(emailMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing")
  .email("form.validations.patternMismatch");
