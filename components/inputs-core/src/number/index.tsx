import { FC, KeyboardEvent, FocusEvent } from "react";
import { useFormContext } from "react-hook-form";

import { ITextInputProps, TextInput } from "../text";

export type INumberInputProps = {
  allowNegative?: boolean;
} & ITextInputProps;

export const NumberInput: FC<INumberInputProps> = props => {
  const { name, allowNegative = false, readOnly, ...rest } = props;

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
    if (readOnly) {
      return;
    }
    const value = e.target.value;
    if (!value) {
      form.setValue(name, 0, { shouldTouch: true });
      void form.trigger(name);
    } else {
      form.setValue(name, Number(value), { shouldTouch: true });
      void form.trigger(name);
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
      readOnly={readOnly}
      {...rest}
    />
  );
};
