import { FC, ReactNode } from "react";
import { useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";

import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { useStyles } from "./styles";

export interface ISwitchInputProps extends SwitchProps {
  name: string;
  label?: ReactNode;
}

export const SwitchInput: FC<ISwitchInputProps & SwitchProps> = props => {
  const { name, label, ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  return (
    <FormControlLabel
      classes={classes}
      control={
        <Switch name={name} checked={value} onChange={formik.handleChange} onBlur={formik.handleBlur} {...rest} />
      }
      label={localizedLabel}
    />
  );
};
