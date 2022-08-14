import { FC, Fragment, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";
import { Box, TextField, TextFieldProps } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";

import { useTestId } from "@gemunion/provider-test-id";

import { useStyles } from "./styles";

interface IDateTimeInputProps {
  name: string;
  readOnly?: boolean;
  required?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (dateRange: DateRange<Date> | null) => void;
}

export const DateRangeInput: FC<IDateTimeInputProps> = props => {
  const { name, variant = "standard", ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();
  const getTestIdProps = (suffix: string) => (testId ? { "data-testid": `${testId}-${name}-${suffix}` } : {});

  const suffix = name.split(".").pop() as string;

  const { formatMessage } = useIntl();
  const localizedLabelStart = formatMessage({ id: `form.labels.${suffix}Start` });
  const localizedLabelEnd = formatMessage({ id: `form.labels.${suffix}End` });

  const form = useFormContext<any>();
  const errorStart = get(form.formState.errors, `${name}Start`);
  const errorEnd = get(form.formState.errors, `${name}End`);
  const localizedHelperTextStart = errorStart
    ? formatMessage({ id: errorStart.message }, { label: localizedLabelStart })
    : "";
  const localizedHelperTextEnd = errorEnd ? formatMessage({ id: errorEnd.message }, { label: localizedLabelEnd }) : "";

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <DateRangePicker
          inputFormat="MM/dd/yyyy"
          startText={formatMessage({ id: `form.labels.${suffix}Start` })}
          endText={formatMessage({ id: `form.labels.${suffix}End` })}
          {...field}
          renderInput={(startProps: TextFieldProps, endProps: TextFieldProps): ReactElement => {
            return (
              <Fragment>
                <TextField
                  className={classes.root}
                  {...form.register(`${name}Start`)}
                  {...startProps}
                  helperText={localizedHelperTextStart}
                  error={!!errorStart}
                  inputProps={{
                    ...startProps.inputProps,
                    ...getTestIdProps("Start"),
                  }}
                  variant={variant}
                  fullWidth
                />
                <Box sx={{ mx: 1 }}> &raquo; </Box>
                <TextField
                  className={classes.root}
                  {...form.register(`${name}End`)}
                  {...endProps}
                  helperText={localizedHelperTextEnd}
                  error={!!errorEnd}
                  inputProps={{
                    ...endProps.inputProps,
                    ...getTestIdProps("End"),
                  }}
                  name={`${name}End`}
                  variant={variant}
                  fullWidth
                />
              </Fragment>
            );
          }}
          {...rest}
        />
      )}
    />
  );
};
