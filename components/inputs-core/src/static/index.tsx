import { FC, forwardRef } from "react";
import { InputBaseComponentProps } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { ITextInputProps, TextInput } from "../text";

export type IStaticInputProps = ITextInputProps;

export const StaticInputComponent = forwardRef<any, InputBaseComponentProps>((props, ref) => {
  const { value, placeholder, className } = props;
  return (
    <div className={className} ref={ref}>
      {value || placeholder}
    </div>
  );
});

export const StaticInput: FC<IStaticInputProps> = props => {
  const { InputLabelProps, InputProps, name, ...rest } = props;

  const form = useFormContext<any>();
  const value = form.getValues(name);

  return (
    <TextInput
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
