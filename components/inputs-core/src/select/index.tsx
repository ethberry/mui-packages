import { FC } from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { getIn, useFormikContext } from "formik";

import { useStyles } from "./styles";

export interface ISelectInputProps extends SelectProps {
  name: string;
  options: Record<string, string>; // enum
  disabledOptions?: Array<string>;
}

export const SelectInput: FC<ISelectInputProps> = props => {
  const { options, label, name, multiple, variant = "standard", disabledOptions = [], ...rest } = props;
  const classes = useStyles();

  const suffix = name.split(".").pop() as string;

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);

  const { formatMessage } = useIntl();
  const localizedLabel = label === void 0 ? formatMessage({ id: `form.labels.${suffix}` }) : label;

  return (
    <FormControl fullWidth className={classes.root}>
      <InputLabel id={`${name}-select-label`} variant={variant}>
        {localizedLabel}
      </InputLabel>
      <Select
        multiple={multiple}
        labelId={`${name}-select-label`}
        label={localizedLabel}
        id={`${name}-select`}
        name={name}
        onChange={formik.handleChange}
        value={value}
        variant={variant}
        renderValue={
          multiple
            ? (values): string =>
                (values as Array<string>).map(value => formatMessage({ id: `enums.${suffix}.${value}` })).join(", ")
            : (value): string => formatMessage({ id: `enums.${suffix}.${value as string}` })
        }
        {...rest}
      >
        {Object.values(options).map((option, i) => (
          <MenuItem value={option} key={i} disabled={disabledOptions.includes(option)}>
            <FormattedMessage id={`enums.${suffix}.${option}`} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
