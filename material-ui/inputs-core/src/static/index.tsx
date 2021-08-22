import React, { FC, forwardRef } from "react";
import { InputBaseComponentProps } from "@material-ui/core";
import { getIn, useFormikContext } from "formik";

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

  const formik = useFormikContext<any>();

  return (
    <TextInput
      name={name}
      value={getIn(formik.values, name)}
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
