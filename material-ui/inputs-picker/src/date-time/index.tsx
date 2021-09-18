import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@mui/material";
import { DateTimePicker } from "@mui/lab";

import { useStyles } from "./styles";

interface IDateTimeInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (date: Date | null) => void;
}

export const DateTimeInput: FC<IDateTimeInputProps> = props => {
  const { name, ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();

  return (
    <DateTimePicker
      className={classes.root}
      inputFormat="MM/dd/yyyy hh:mm a"
      label={formatMessage({ id: `form.labels.${suffix}` })}
      value={value}
      onChange={(date: Date | null): void => {
        formik.setFieldValue(name, date);
      }}
      renderInput={(props: TextFieldProps): ReactElement => (
        <TextField name={name} onBlur={formik.handleBlur} fullWidth {...props} />
      )}
      {...rest}
    />
  );
};
