import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller, get } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

import { useTestId } from "@ethberry/provider-test-id";

export type ITextInputProps = {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: any) => number | string;
  normalizeValue?: (value: any) => number | string;
  showLabel?: boolean;
} & TextFieldProps;

export const TextInput: FC<ITextInputProps> = props => {
  const {
    name,
    label,
    showLabel = true,
    readOnly,
    inputProps,
    InputProps,
    placeholder,
    formatValue,
    normalizeValue,
    variant = "standard",
    ...rest
  } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();
  const error = get(form.formState.errors, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label ?? formatMessage({ id: `form.labels.${suffix}` });
  const localizedPlaceholder = placeholder ?? formatMessage({ id: `form.placeholders.${suffix}` });
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => {
        return (
          <TextField
            sx={{ my: 1 }}
            label={showLabel ? localizedLabel : ""}
            placeholder={localizedPlaceholder}
            helperText={localizedHelperText}
            error={Boolean(error)}
            variant={variant}
            fullWidth
            InputProps={{
              ...InputProps,
            }}
            inputProps={{
              readOnly,
              ...inputProps,
              ...testIdProps,
            }}
            {...field}
            value={normalizeValue ? normalizeValue(field.value) : field.value}
            onChange={(e: any) => {
              form.setValue(name, formatValue ? formatValue(e.target.value) : e.target.value, {
                shouldTouch: true,
                shouldDirty: true,
              });
            }}
            {...rest}
          />
        );
      }}
    />
  );
};
