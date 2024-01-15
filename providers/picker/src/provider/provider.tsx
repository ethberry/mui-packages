import { FC, PropsWithChildren } from "react";
// https://github.com/mui/mui-x/issues/11454
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider, LocalizationProviderProps } from "@mui/x-date-pickers/LocalizationProvider";

export const PickerProvider: FC<PropsWithChildren<LocalizationProviderProps<Date, any>>> = props => {
  const { children, ...rest } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} {...rest}>
      {children}
    </LocalizationProvider>
  );
};
