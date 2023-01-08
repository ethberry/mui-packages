import { FC, KeyboardEvent, FocusEvent } from "react";
import { useFormContext } from "react-hook-form";

import { ITextInputProps, TextInput } from "../text";

export type INumberInputProps = {
  allowNegative?: boolean;
} & ITextInputProps;

export const NumberInput: FC<INumberInputProps> = props => {
  const { name, allowNegative = false, ...rest } = props;

  const form = useFormContext<any>();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 69 || (!allowNegative && e.keyCode === 189) || (e.shiftKey && e.keyCode === 187)) {
      // disallow e/-/+
      e.preventDefault();
    }
  };

  const formatValue = (value: string | number) => {
    return !value && value !== 0 ? "" : Number(value);
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!value) {
      form.setValue(name, 0);
    } else {
      form.setValue(name, Number(value));
    }
  };

  return (
    <TextInput
      sx={{ my: 1 }}
      type="number"
      onKeyDown={handleKeyDown}
      onBlur={handleOnBlur}
      formatValue={formatValue}
      name={name}
      {...rest}
    />
  );
};
