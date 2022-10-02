import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox, CheckboxProps, FormControlLabel } from "@mui/material";

import { useTestId } from "@gemunion/provider-test-id";

export interface ICheckboxInputProps extends CheckboxProps {
  name: string;
  label?: string | number | ReactElement;
}

export const CheckboxInput: FC<ICheckboxInputProps> = props => {
  const { name, label, ...rest } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControlLabel
          sx={{ my: 1 }}
          control={<Checkbox {...field} checked={field.value} {...testIdProps} {...rest} />}
          label={localizedLabel}
        />
      )}
    />
  );
};
