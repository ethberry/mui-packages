import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/lab";

import { useStyles } from "./styles";

interface IDateInputProps {
  name: string;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (date: Date | null) => void;
}

export const DateInput: FC<IDateInputProps> = props => {
  const { name, label, variant = "standard", ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  return (
    <DatePicker
      className={classes.root}
      inputFormat="MM/dd/yyyy"
      label={localizedLabel}
      value={value}
      onChange={(date: Date | null): void => {
        formik.setFieldValue(name, date);
      }}
      renderInput={(props: TextFieldProps): ReactElement => (
        <TextField name={name} onBlur={formik.handleBlur} fullWidth variant={variant} {...props} />
      )}
      {...rest}
    />
  );
};
