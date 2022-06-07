import { FC, KeyboardEvent } from "react";

import { IFilledTextInputProps, IOutlinedTextInputProps, IStandardTextInputProps, TextInput } from "../text";
import { useStyles } from "./styles";

export interface IStandardNumberInputProps extends IStandardTextInputProps {
  allowNegative?: boolean;
}

export interface IFilledNumberInputProps extends IFilledTextInputProps {
  allowNegative?: boolean;
}

export interface IOutlinedNumberInputProps extends IOutlinedTextInputProps {
  allowNegative?: boolean;
}

export type INumberInputProps = IStandardNumberInputProps | IFilledNumberInputProps | IOutlinedNumberInputProps;

export const NumberInput: FC<INumberInputProps> = props => {
  const { name, allowNegative = false, ...rest } = props;
  const classes = useStyles();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.keyCode === 69 || (!allowNegative && e.keyCode === 189) || (e.shiftKey && e.keyCode === 187)) {
      // disallow e/-/+
      e.preventDefault();
    }
  };

  const formatValue = (value: any) => (value === null && value === void 0 ? "" : Number(value));

  return (
    <TextInput
      classes={classes}
      type="number"
      onKeyDown={handleKeyDown}
      formatValue={formatValue}
      name={name}
      {...rest}
    />
  );
};
