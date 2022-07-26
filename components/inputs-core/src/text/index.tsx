import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller, get } from "react-hook-form";
import { TextField, StandardTextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps } from "@mui/material";

import { useStyles } from "./styles";

export interface IStandardTextInputProps extends StandardTextFieldProps {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: any) => number | string;
  normalizeValue?: (value: any) => number | string;
}

export interface IFilledTextInputProps extends FilledTextFieldProps {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: any) => number | string;
  normalizeValue?: (value: any) => number | string;
}

export interface IOutlinedTextInputProps extends OutlinedTextFieldProps {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: any) => number | string;
  normalizeValue?: (value: any) => number | string;
}

export type ITextInputProps = IStandardTextInputProps | IFilledTextInputProps | IOutlinedTextInputProps;

export const TextInput: FC<ITextInputProps> = props => {
  const {
    name,
    label,
    readOnly,
    InputProps,
    placeholder,
    formatValue,
    normalizeValue,
    variant = "standard",
    ...rest
  } = props;
  const classes = useStyles();

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
            classes={classes}
            label={localizedLabel}
            placeholder={localizedPlaceholder}
            helperText={localizedHelperText}
            error={Boolean(error)}
            variant={variant}
            fullWidth
            InputProps={{
              ...InputProps,
              readOnly,
            }}
            {...field}
            value={normalizeValue ? normalizeValue(field.value) : field.value}
            onChange={(e: any) => {
              if (formatValue) {
                field.onChange({ target: { name, value: formatValue(e.target.value) } });
              } else {
                field.onChange(e);
              }
            }}
            {...rest}
          />
        );
      }}
    />
  );
};
