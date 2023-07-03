import { FC, forwardRef } from "react";
import { Box, InputBaseComponentProps } from "@mui/material";
import { useWatch } from "react-hook-form";

import { ITextInputProps, TextInput } from "../text";

export type IStaticInputProps = ITextInputProps;

export const StaticInputComponent = forwardRef<any, InputBaseComponentProps>((props, ref) => {
  const { value, placeholder, sx } = props;

  return (
    <Box
      sx={[{ overflow: "auto", paddingTop: "4px", paddingBottom: "5px" }, ...(Array.isArray(sx) ? sx : [sx])]}
      ref={ref}
    >
      {value || placeholder}
    </Box>
  );
});

export const StaticInput: FC<IStaticInputProps> = props => {
  const { InputLabelProps, InputProps, name, ...rest } = props;

  const value = useWatch({ name });

  return (
    <TextInput
      sx={{ my: 1 }}
      name={name}
      value={value}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      InputProps={{
        ...InputProps,
        inputComponent: StaticInputComponent,
      }}
      {...rest}
    />
  );
};
