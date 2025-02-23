import { string } from "yup";

import { reUrl } from "../../../../common-packages/other/constants/src";

export const urlValidationSchema = string()
  .required("form.validations.valueMissing")
  .matches(reUrl, "form.validations.patternMismatch");
