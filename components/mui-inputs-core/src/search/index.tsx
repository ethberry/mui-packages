import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormContext, Controller } from "react-hook-form";
import { IconButton, IconButtonProps, InputBase, InputBaseProps, Paper, PaperProps } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

import { useTestId } from "@ethberry/provider-test-id";

export interface ISearchInputProps extends InputBaseProps {
  iconButtonProps?: Partial<IconButtonProps>;
  paperProps?: Partial<PaperProps>;
}

export const SearchInput: FC<ISearchInputProps> = props => {
  const { name = "search", inputProps, iconButtonProps = {}, paperProps = {}, ...rest } = props;

  const { testId } = useTestId();
  const testIdProps = testId ? { "data-testid": `${testId}-${name}` } : {};

  const form = useFormContext<any>();

  const { formatMessage } = useIntl();
  const localizedPlaceholder = formatMessage({ id: `form.placeholders.${name}` });

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            my: 1,
          }}
          {...paperProps}
        >
          <IconButton aria-label="search" sx={{ p: "10px" }} {...iconButtonProps}>
            <SearchOutlined />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
            }}
            placeholder={localizedPlaceholder}
            inputProps={{
              ...inputProps,
              ...testIdProps,
            }}
            {...field}
            {...rest}
          />
        </Paper>
      )}
    />
  );
};
