import { FC, FocusEvent } from "react";
import { useFormikContext } from "formik";
import { jsonValidationSchema } from "@gemunion/yup-rules";

import { TextArea, ITextAreaProps } from "../textarea";

export const JsonInput: FC<ITextAreaProps> = props => {
  const { name, ...rest } = props;

  const formik = useFormikContext<any>();

  const inputProps = {
    onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      try {
        jsonValidationSchema.validateSync(value);

        const formattedValue = JSON.stringify(JSON.parse(value), null, "\t");
        event.target.value = formattedValue;

        formik.setFieldValue(name, formattedValue);
      } catch (e) {
        formik.setErrors({ [name]: e.message });
      }
    },
    onFocus: () => formik.setTouched({ [name]: true }),
  };

  return <TextArea name={name} {...inputProps} {...rest} />;
};
