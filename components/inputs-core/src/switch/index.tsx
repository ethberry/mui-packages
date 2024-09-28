import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch, SwitchProps } from "@mui/material";

import { useTestId } from "@ethberry/provider-test-id";

export interface ISwitchInputProps extends SwitchProps {
  name: string;
  label?: string | number | ReactElement;
}

export const SwitchInput: FC<ISwitchInputProps & SwitchProps> = props => {
  const { name, label, disabled, readOnly, ...rest } = props;

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
          control={
            <Switch
              name={field.name}
              checked={field.value}
              inputRef={field.ref}
              onChange={field.onChange}
              onBlur={field.onBlur}
              // https://github.com/mui/material-ui/issues/37753 readOnly prop still evaluate `onChange` event
              disabled={disabled || readOnly}
              {...testIdProps}
              {...rest}
            />
          }
          label={localizedLabel}
        />
      )}
    />
  );
};
