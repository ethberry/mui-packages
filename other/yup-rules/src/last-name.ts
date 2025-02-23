import { string } from "yup";

import { lastNameMinLength, lastNameMaxLength } from "../../../../common-packages/other/constants/src";

export const lastNameValidationSchema = string()
  .min(lastNameMinLength, "form.validations.tooShort")
  .max(lastNameMaxLength, "form.validations.tooLong")
  .required("form.validations.valueMissing");
