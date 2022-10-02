import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { addMinutes, subMinutes } from "date-fns";

import { useTestId } from "@gemunion/provider-test-id";

interface IDateUtcInputProps {
  name: string;
  label?: string | number | ReactElement;
  readOnly?: boolean;
  required?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (date: Date | null) => void;
}

export const DateUtcInput: FC<IDateUtcInputProps> = props => {
  const { name, label, variant = "standard", readOnly, ...rest } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const setter = (date: Date | string): Date => {
    const d = new Date(date);
    return addMinutes(d, d.getTimezoneOffset());
  };

  const getter = (date: Date | string): Date => {
    const d = new Date(date);
    return subMinutes(d, d.getTimezoneOffset());
  };

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <DatePicker
          inputFormat="MM/dd/yyyy"
          label={localizedLabel}
          value={field.value ? setter(field.value) : field.value}
          onChange={(date: Date | null): void => {
            form.setValue(name, date ? getter(date) : date);
          }}
          renderInput={(props: TextFieldProps): ReactElement => (
            <TextField
              sx={{ my: 1 }}
              name={field.name}
              inputRef={field.ref}
              onBlur={field.onBlur}
              fullWidth
              variant={variant}
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
