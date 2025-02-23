import { ChangeEvent, createElement, FC, PropsWithChildren } from "react";
import { FormattedMessage } from "react-intl";
import { Controller, useFormContext } from "react-hook-form";
import { Box, InputLabel } from "@mui/material";
import { Rating, RatingProps } from "@mui/lab";
import { Star, SvgIconComponent } from "@mui/icons-material";

import { useTestId } from "@ethberry/provider-test-id";

export interface IRatingInputProps extends RatingProps {
  name: string;
  color?: "inherit" | "disabled" | "error" | "primary" | "secondary" | "action";
}

export const RatingInput: FC<PropsWithChildren<IRatingInputProps>> = props => {
  const { name, icon = Star, color, ...rest } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const suffix = name.split(".").pop()!;

  const form = useFormContext<any>();

  return (
    <Box sx={{ my: 1 }}>
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
    </Box>
  );
};
