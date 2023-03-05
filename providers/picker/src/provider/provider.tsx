import { FC, PropsWithChildren } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, LocalizationProviderProps } from "@mui/x-date-pickers/LocalizationProvider";

export const PickerProvider: FC<PropsWithChildren<LocalizationProviderProps<any>>> = props => {
  const { children, ...rest } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} {...rest}>
      {children}
    </LocalizationProvider>
  );
};
