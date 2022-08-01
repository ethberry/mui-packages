import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch, SwitchProps } from "@mui/material";

import { useTestId } from "@gemunion/mui-form";

import { useStyles } from "./styles";

export interface ISwitchInputProps extends SwitchProps {
  name: string;
  label?: string | number | ReactElement;
}

export const SwitchInput: FC<ISwitchInputProps & SwitchProps> = props => {
  const { name, label, ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormControlLabel
          classes={classes}
          control={
            <Switch
              name={field.name}
              checked={field.value}
              inputRef={field.ref}
              onChange={field.onChange}
              onBlur={field.onBlur}
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
