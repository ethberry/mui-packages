import { FC, FocusEvent } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { getIn, useFormikContext } from "formik";
import { useIntl } from "react-intl";
import { jsonValidationSchema } from "@gemunion/yup-rules";

import { useStyles } from "./styles";

export const JsonInput: FC<TextFieldProps & { name: string }> = props => {
  const { id, name, InputLabelProps, ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();
  const localizedPlaceholder = formatMessage({ id: `form.placeholders.${suffix}` });
  const localizedLabel = formatMessage({ id: `form.labels.${suffix}` });
  const localizedError = error && formatMessage({ id: error });

  const inputProps = {
    defaultValue: value,
    onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;

      try {
        jsonValidationSchema.validateSync(value);

        const formattedValue = JSON.stringify(JSON.parse(value), undefined, "\t");
        event.target.value = formattedValue;

        formik.setFieldValue(name, formattedValue);
      } catch (e) {
        formik.setErrors({ [name]: e.message });
      }
    },
    onFocus: () => formik.setTouched({ [name]: true }),
  };

  return (
    <>
      <TextField
        id={id}
        name={name}
        multiline
        minRows={3}
        classes={classes}
        error={error && touched}
        helperText={localizedError}
        label={localizedLabel}
        placeholder={localizedPlaceholder}
        InputLabelProps={{
          ...InputLabelProps,
          shrink: true,
        }}
        fullWidth
        {...inputProps}
        {...rest}
      />
    </>
  );
};
