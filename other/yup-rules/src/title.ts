import { string } from "yup";

import { titleMinLength, titleMaxLength } from "../../../../common-packages/other/constants/src";

export const titleValidationSchema = string()
  .required("form.validations.valueMissing")
  .min(titleMinLength, "form.validations.tooShort")
  .max(titleMaxLength, "form.validations.tooLong");
