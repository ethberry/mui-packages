import { FC } from "react";
import { InputProps } from "@mui/material";
import { get, useFormContext } from "react-hook-form";

import { MaskedInput } from "../mask";

export interface ICurrencyInputProps {
  allowNegative?: boolean;
  fractionalDelimiter?: string;
  fillByZeros?: boolean;
  name: string;
  readOnly?: boolean;
  precision?: number;
  symbol?: string;
  thousandsSeparator?: string;
  InputProps?: Partial<InputProps>;
}

export const CurrencyInput: FC<ICurrencyInputProps> = props => {
  const {
    allowNegative = false,
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    precision = 2,
    symbol = "$",
    thousandsSeparator = " ",
    ...rest
  } = props;

  const formatValue = (value: string): number => {
    return value ? Math.round(parseFloat(value) * Math.pow(10, precision)) : 0;
  };

  const normalizeValue = (value: number): string => {
    return value ? (value / Math.pow(10, precision)).toFixed(precision) : "0";
  };

  const form = useFormContext<any>();
  const value = get(form.getValues(), name);
  const formattedValue = normalizeValue(value);

  return (
    <MaskedInput
      allowNegative={allowNegative}
      decimalSeparator={fractionalDelimiter}
      decimalScale={precision}
      thousandSeparator={thousandsSeparator}
      allowLeadingZeros={fillByZeros}
      prefix={symbol ? `${symbol} ` : ""}
      name={name}
      formatValue={formatValue}
      normalizeValue={normalizeValue}
      defaultValue={formattedValue}
      {...rest}
    />
  );
};
