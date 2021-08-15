import React, { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { TextField, TextFieldProps } from "@material-ui/core";
import { DatePicker } from "@material-ui/lab";
import { addMinutes, subMinutes } from "date-fns";

interface IDateUtcInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: (date: Date | null) => void;
}

export const DateUtcInput: FC<IDateUtcInputProps> = props => {
  const { name, ...rest } = props;

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
