import { FC } from "react";
import { TextInput } from "@gemunion/mui-inputs-core";

import { MaskedInputWrapper } from "./wrapper";

export interface IMaskedInputProps {
  name: string;
  thousandSeparator?: string;
  isNumericString?: boolean;
  prefix?: string;
  decimalSeparator?: string;
  allowNegative?: boolean;
  allowLeadingZeros?: boolean;
  readOnly?: boolean;
  formatValue?: (value: string) => string | number;
  InputProps?: any;
  defaultValue?: any;
  value?: any;
  displayType?: "input" | "text";
  type?: "text" | "tel" | "password";
  format?: string;
  mask?: string;
  onChange?: (event: { target: { name: string; value: string } }) => void;
}

export const MaskedInput: FC<IMaskedInputProps> = props => {
  const { name, formatValue, value: _value, InputProps, readOnly, ...rest } = props;

  const onValueChange = (field: any) => (values: any) => {
    field.onChange({
      target: {
        name,
        value: formatValue ? formatValue(values.value) : values.value,
      },
    });
  };

  return (
    <TextInput
      name={name}
      onChange={() => {}}
      onInputPropsValueChange={onValueChange}
      InputProps={{
        ...InputProps,
        readOnly,
        inputComponent: MaskedInputWrapper as any,
        inputProps: {
          ...rest,
        },
      }}
    />
  );
};
