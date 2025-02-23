import { string } from "yup";

import { symbolMinLength, symbolMaxLength } from "../../../../common-packages/other/constants/src";

export const symbolValidationSchema = string()
  .required("form.validations.valueMissing")
  .min(symbolMinLength, "form.validations.tooShort")
  .max(symbolMaxLength, "form.validations.tooLong");
