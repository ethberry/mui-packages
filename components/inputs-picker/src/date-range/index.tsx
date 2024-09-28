import { FC } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext } from "react-hook-form";
import { DateRange, MobileDateRangePicker, MobileDateRangePickerProps } from "@mui/x-date-pickers-pro";

import { useTestId } from "@ethberry/provider-test-id";

interface IDateTimeInputProps extends MobileDateRangePickerProps<any> {
  fieldSeparator?: any;
  name: string;
  readOnly?: boolean;
  required?: boolean;
  textFieldSlotProps?: any;
  variant?: "standard" | "filled" | "outlined";
  onChange?: (dateRange: DateRange<Date> | null) => void;
}

const defaultFieldSeparator = <>&raquo;</>;

export const DateRangeInput: FC<IDateTimeInputProps> = props => {
  const {
    fieldSeparator = defaultFieldSeparator,
    name,
    variant = "standard",
    readOnly,
    textFieldSlotProps = {},
    ...rest
  } = props;

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
        <MobileDateRangePicker
          format="MM/dd/yyyy"
          localeText={{
            start: formatMessage({ id: `form.labels.${suffix}Start` }),
            end: formatMessage({ id: `form.labels.${suffix}End` }),
          }}
          ref={field.ref}
          value={field.value}
          onChange={(value: DateRange<Date> | null) => {
            form.setValue(name, value, { shouldDirty: true, shouldTouch: true });
          }}
          slotProps={{
            textField: ({ position }: any) => {
              const isStart = position === "start";

              // eslint-disable-next-line @typescript-eslint/no-unsafe-return
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
                ...textFieldSlotProps,
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
