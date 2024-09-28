import { FC, FocusEvent } from "react";
import { useFormContext } from "react-hook-form";
import { jsonValidationSchema } from "@ethberry/yup-rules";

import { TextArea, ITextAreaProps } from "../textarea";

export const JsonInput: FC<ITextAreaProps> = props => {
  const { name, readOnly, ...rest } = props;

  const form = useFormContext<any>();

  const normalizeValue = (value: string) => {
    try {
      return JSON.stringify(JSON.parse(value), null, "\t");
    } catch (_e) {
      return value;
    }
  };

  const inputProps = {
    onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      if (readOnly) {
        return;
      }

      try {
        // needs to set touched for this field to true
        form.setValue(name, value, { shouldTouch: true });
        jsonValidationSchema.validateSync(value);

        const formattedValue = normalizeValue(value);
        event.target.value = formattedValue;

        form.setValue(name, formattedValue);
        form.clearErrors(name);
      } catch (e) {
        form.setError(name, { type: "custom", message: e.message }, { shouldFocus: true });
      }
    },
    onFocus: () => form.setFocus(name),
  };

  return <TextArea name={name} normalizeValue={normalizeValue} {...inputProps} readOnly={readOnly} {...rest} />;
};
