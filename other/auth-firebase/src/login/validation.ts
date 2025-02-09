import { object, string } from "yup";

import { emailValidationSchema } from "@ethberry/yup-rules";

export const validationSchema = object().shape({
  email: emailValidationSchema,
  password: string().required("form.validations.valueMissing"),
});
