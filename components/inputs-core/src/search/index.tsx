import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller } from "react-hook-form";
import { IconButton, InputBase, InputBaseProps, Paper } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

import { useTestId } from "@gemunion/mui-form";

import { useStyles } from "./styles";

export interface ISearchInputProps extends InputBaseProps {}

export const SearchInput: FC<ISearchInputProps> = props => {
  const { name = "search", inputProps, ...rest } = props;
  const classes = useStyles();

  const { testId } = useTestId();

  const form = useFormContext<any>();

  const { formatMessage } = useIntl();
  const localizedPlaceholder = formatMessage({ id: `form.placeholders.${name}` });

  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Paper className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchOutlined />
          </IconButton>
          <InputBase
            className={classes.input}
            placeholder={localizedPlaceholder}
            inputProps={{
              ...inputProps,
              ...testIdProps,
            }}
            {...rest}
            {...field}
          />
        </Paper>
      )}
    />
  );
};
