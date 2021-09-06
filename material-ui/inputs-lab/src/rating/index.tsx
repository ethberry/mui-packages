import { FC, createElement, ChangeEvent } from "react";
import clsx from "clsx";
import { FormattedMessage } from "react-intl";
import { getIn, useFormikContext } from "formik";
import { InputLabel } from "@material-ui/core";
import { Rating, RatingProps } from "@material-ui/lab";
import { Star, SvgIconComponent } from "@material-ui/icons";
import { useStyles } from "./styles";

export interface IRatingInputProps extends RatingProps {
  name: string;
  icon?: SvgIconComponent;
  color?: "inherit" | "disabled" | "error" | "primary" | "secondary" | "action";
}

export const RatingInput: FC<IRatingInputProps> = props => {
  const { name, icon = Star, color, ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  return (
    <div className={clsx(classes.root)}>
      <InputLabel filled shrink>
        <FormattedMessage id={`form.labels.${suffix}`} />
      </InputLabel>
      <Rating
        max={10}
        name={name}
        icon={createElement(icon, { fontSize: "inherit", color })}
        value={value}
        onChange={(_event: ChangeEvent<unknown>, value): void => {
          formik.setFieldValue(name, value);
        }}
        {...rest}
      />
    </div>
  );
};
