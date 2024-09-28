import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { MobileDateTimePicker, MobileDateTimePickerProps } from "@mui/x-date-pickers";

import { useTestId } from "@ethberry/provider-test-id";

interface IDateTimeInputProps extends MobileDateTimePickerProps<any> {
  name: string;
  label?: string | number | ReactElement;
  readOnly?: boolean;
  required?: boolean;
  textFieldSlotProps?: any;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (date: Date | null) => void;
  format?: string;
}

// "dd/LL/yyyy hh:mm:ss a" 01/12/2023 04:47 PM
export const DateTimeInput: FC<IDateTimeInputProps> = props => {
  const {
    name,
    label,
    format = "dd/LL/yyyy hh:mm:ss",
    variant = "standard",
    readOnly,
    textFieldSlotProps = {},
    ...rest
  } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);
  const value = useWatch({ name });

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  const setter = (date: Date | string): Date => {
    return new Date(date);
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
        <MobileDateTimePicker
          format={format}
          label={localizedLabel}
          value={value ? setter(value) : null}
          onChange={(date: Date | null): void => {
            form.setValue(name, date ? getter(date) : date, { shouldDirty: true, shouldTouch: true });
          }}
          ref={field.ref}
          slotProps={{
            textField: {
              sx: { my: 1 },
              fullWidth: true,
              variant,
              name: field.name,
              onBlur: field.onBlur,
              helperText: localizedHelperText,
              error: !!error,
              inputProps: {
                readOnly,
                ...testIdProps,
              },
              ...textFieldSlotProps,
            },
          }}
          {...rest}
        />
      )}
    />
  );
};
