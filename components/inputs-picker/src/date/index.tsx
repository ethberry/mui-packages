import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { useTestId } from "@gemunion/provider-test-id";

import { useStyles } from "./styles";

interface IDateInputProps {
  name: string;
  label?: string | number | ReactElement;
  readOnly?: boolean;
  required?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (date: Date | null) => void;
}

export const DateInput: FC<IDateInputProps> = props => {
  const { name, label, variant = "standard", readOnly, ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = useWatch({ name });

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const setter = (date: Date | string): string => {
    const isDateString = !isNaN(Date.parse(date as string));
    return isDateString ? new Date(date).toISOString() : (date as string);
  };

  const getter = (date: Date | string): string => {
    const isDateString = !isNaN(Date.parse(date as string));
    return isDateString ? new Date(date).toISOString() : (date as string);
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <DatePicker
          inputFormat="MM/dd/yyyy"
          label={localizedLabel}
          value={value ? setter(value) : value}
          onChange={(date: Date | null): void => {
            form.setValue(name, date ? getter(date) : date);
          }}
          ref={field.ref}
          renderInput={(props: TextFieldProps): ReactElement => (
            <TextField
              className={classes.root}
              fullWidth
              variant={variant}
              name={field.name}
              onBlur={field.onBlur}
              {...props}
              helperText={localizedHelperText}
              error={!!error}
              inputProps={{
                readOnly,
                ...props.inputProps,
                ...testIdProps,
              }}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};
