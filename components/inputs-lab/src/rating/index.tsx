import { ChangeEvent, createElement, FC, PropsWithChildren } from "react";
import { clsx } from "clsx";
import { FormattedMessage } from "react-intl";
import { Controller, useFormContext } from "react-hook-form";
import { InputLabel } from "@mui/material";
import { Rating, RatingProps } from "@mui/lab";
import { Star, SvgIconComponent } from "@mui/icons-material";

import { useTestId } from "@gemunion/provider-test-id";

import { useStyles } from "./styles";

export interface IRatingInputProps extends RatingProps {
  name: string;
  color?: "inherit" | "disabled" | "error" | "primary" | "secondary" | "action";
}

export const RatingInput: FC<PropsWithChildren<IRatingInputProps>> = props => {
  const { name, icon = Star, color, ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop() as string;

  const form = useFormContext<any>();

  return (
    <div className={clsx(classes.root)}>
      <InputLabel filled shrink>
        <FormattedMessage id={`form.labels.${suffix}`} />
      </InputLabel>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Rating
            {...field}
            max={10}
            icon={createElement(icon as SvgIconComponent, { fontSize: "inherit", color })}
            onChange={(_event: ChangeEvent<unknown>, value): void => {
              form.setValue(name, value);
            }}
            {...testIdProps}
            {...rest}
          />
        )}
      />
    </div>
  );
};
