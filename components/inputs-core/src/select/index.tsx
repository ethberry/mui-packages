import { FC } from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  InputLabelProps as MuiInputLabelProps,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";

import { useTestId } from "@gemunion/provider-test-id";

export type ISelectInputProps = {
  name: string;
  options: Record<string, string>; // enum
  disabledOptions?: Array<string>;
  InputLabelProps?: Partial<MuiInputLabelProps>;
} & SelectProps;

export const SelectInput: FC<ISelectInputProps> = props => {
  const {
    options,
    label,
    name,
    multiple,
    variant = "standard",
    disabledOptions = [],
    InputLabelProps = {},
    ...rest
  } = props;

  const suffix = name.split(".").pop() as string;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const form = useFormContext<any>();
  const formValues = useWatch();

  const error = get(form.formState.errors, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControl fullWidth sx={{ my: 1 }}>
          <InputLabel id={`${name}-select-label`} variant={variant} {...InputLabelProps}>
            {localizedLabel}
          </InputLabel>
          <Select
            multiple={multiple}
            labelId={`${name}-select-label`}
            label={localizedLabel}
            id={`${name}-select`}
            variant={variant}
            renderValue={
              multiple
                ? (values): string =>
                    ((Array.isArray(values) ? values : [values]) as Array<string>)
                      .map(value => formatMessage({ id: `enums.${suffix}.${value}` }))
                      .join(", ")
                : (value): string => formatMessage({ id: `enums.${suffix}.${value as string}` })
            }
            {...field}
            value={get(formValues, name) ?? ""}
            onChange={(e: any) => {
              form.setValue(name, e.target.value, { shouldTouch: true, shouldDirty: true });
            }}
            {...testIdProps}
            {...rest}
          >
            {Object.values(options).map((option, i) => (
              <MenuItem value={option} key={i} disabled={disabledOptions.includes(option)}>
                <FormattedMessage id={`enums.${suffix}.${option}`} />
              </MenuItem>
            ))}
          </Select>

          {localizedHelperText && (
            <FormHelperText id={`${name}-helper-text`} error sx={{ ml: 0 }}>
              {localizedHelperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
