import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { addMinutes, subMinutes } from "date-fns";

import { useStyles } from "./styles";

interface IDateUtcInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (date: Date | null) => void;
}

export const DateUtcInput: FC<IDateUtcInputProps> = props => {
  const { name, ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();

  const setter = (date: Date | string): Date => {
    const d = new Date(date);
    return addMinutes(d, d.getTimezoneOffset());
  };

  const getter = (date: Date | string): Date => {
    const d = new Date(date);
    return subMinutes(d, d.getTimezoneOffset());
  };

  return (
    <DatePicker
      className={classes.root}
      inputFormat="MM/dd/yyyy"
      label={formatMessage({ id: `form.labels.${suffix}` })}
      value={value ? setter(value) : value}
      onChange={(date: Date | null): void => {
        formik.setFieldValue(name, date ? getter(date) : date);
      }}
      renderInput={(props: TextFieldProps): ReactElement => (
        <TextField name={name} onBlur={formik.handleBlur} fullWidth {...props} />
      )}
      {...rest}
    />
  );
};
