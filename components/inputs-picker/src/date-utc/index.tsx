import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";
import { MobileDatePicker, MobileDatePickerProps } from "@mui/x-date-pickers";
import { addMinutes, subMinutes } from "date-fns";

import { useTestId } from "@gemunion/provider-test-id";

interface IDateUtcInputProps extends MobileDatePickerProps<any> {
  name: string;
  label?: string | number | ReactElement;
  readOnly?: boolean;
  required?: boolean;
  textFieldSlotProps?: any;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (date: Date | null) => void;
}

export const DateUtcInput: FC<IDateUtcInputProps> = props => {
  const { name, label, variant = "standard", readOnly = true, textFieldSlotProps = {}, ...rest } = props;

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
        <MobileDatePicker
          format="MM/dd/yyyy"
          label={localizedLabel}
          value={field.value ? setter(field.value) : null}
          onChange={(date: Date | null): void => {
            form.setValue(name, date ? getter(date) : date, { shouldDirty: true, shouldTouch: true });
          }}
          slotProps={{
            textField: {
              sx: { my: 1 },
              fullWidth: true,
              variant,
              name: field.name,
              onBlur: field.onBlur,
              helperText: localizedHelperText,
              inputRef: field.ref,
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
