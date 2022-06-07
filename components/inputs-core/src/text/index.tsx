import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller } from "react-hook-form";
import { TextField, StandardTextFieldProps, FilledTextFieldProps, OutlinedTextFieldProps } from "@mui/material";

import { useStyles } from "./styles";

export interface IStandardTextInputProps extends StandardTextFieldProps {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: number | string) => number | string;
}

export interface IFilledTextInputProps extends FilledTextFieldProps {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: number | string) => number | string;
}

export interface IOutlinedTextInputProps extends OutlinedTextFieldProps {
  name: string;
  readOnly?: boolean;
  maskedRef?: any;
  formatValue?: (value: any) => number | string;
}

export type ITextInputProps = IStandardTextInputProps | IFilledTextInputProps | IOutlinedTextInputProps;

export const TextInput: FC<ITextInputProps> = props => {
  const { name, label, readOnly, InputProps, placeholder, formatValue, variant = "standard", ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();

  const error = form.formState.errors[name];
  const touched = Boolean(form.formState.touchedFields[name]);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedPlaceholder =
    placeholder === void 0 ? formatMessage({ id: `form.placeholders.${suffix}` }) : placeholder;
  const localizedHelperText = error && touched ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

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
