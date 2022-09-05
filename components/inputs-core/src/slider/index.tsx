import { FC, ReactElement } from "react";
import { useIntl } from "react-intl";
import { Controller, get, useFormContext, useWatch } from "react-hook-form";
import { FormControlLabel, FormHelperText, Slider, SliderProps } from "@mui/material";

import { useTestId } from "@gemunion/provider-test-id";

import { useStyles } from "./styles";

export interface ISliderInputProps extends SliderProps {
  name: string;
  label?: string | number | ReactElement;
}

export const SliderInput: FC<ISliderInputProps> = props => {
  const { name, label, ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();
  const value = useWatch({ name });

  const error = get(form.formState.errors, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;
  const localizedHelperText = error ? formatMessage({ id: error.message }, { label: localizedLabel }) : "";

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <>
          <FormControlLabel
            labelPlacement="start"
            classes={{ root: classes.label }}
            control={
              <Slider
                {...field}
                name={name}
                value={value}
                classes={{ root: classes.slider }}
                onChange={(_event, value): void => {
                  form.setValue(name, value, { shouldTouch: true });
                }}
                {...testIdProps}
                {...rest}
              />
            }
            label={localizedLabel}
          />

          {localizedHelperText && (
            <FormHelperText id={`${name}-helper-text`} error>
              {localizedHelperText}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
