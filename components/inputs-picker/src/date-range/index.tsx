import { FC } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";
import { Typography } from "@mui/material";
import { DateRange, DateRangePicker } from "@mui/x-date-pickers-pro";

import { useTestId } from "@gemunion/provider-test-id";

interface IDateTimeInputProps {
  fieldSeparator?: any;
  name: string;
  readOnly?: boolean;
  required?: boolean;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (dateRange: DateRange<Date> | null) => void;
}

const defaultFieldSeparator = <Typography>&raquo;</Typography>;

export const DateRangeInput: FC<IDateTimeInputProps> = props => {
  const { fieldSeparator = defaultFieldSeparator, name, variant = "standard", readOnly, ...rest } = props;

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
          format="MM/dd/yyyy"
          localeText={{
            start: formatMessage({ id: `form.labels.${suffix}Start` }),
            end: formatMessage({ id: `form.labels.${suffix}End` }),
          }}
          ref={field.ref}
          value={field.value}
          onAccept={value => {
            form.setValue(name, value, { shouldDirty: true, shouldTouch: true });
          }}
          slotProps={{
            textField: ({ position }: any) => {
              const isStart = position === "start";

              return {
                sx: { my: 1 },
                ...form.register(`${name}${isStart ? "Start" : "End"}`),
                helperText: isStart ? localizedHelperTextStart : localizedHelperTextEnd,
                error: isStart ? !!errorStart : !!errorEnd,
                inputProps: {
                  readOnly,
                  ...getTestIdProps(isStart ? "Start" : "End"),
                },
                variant,
                fullWidth: true,
              };
            },
            fieldSeparator: { children: fieldSeparator },
          }}
          {...rest}
        />
      )}
    />
  );
};
