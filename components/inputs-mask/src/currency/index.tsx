import { FC } from "react";
import { InputProps } from "@mui/material";
import { get, useFormContext } from "react-hook-form";

import { number, format } from "../math";
import { MaskedInput } from "../mask";

export interface ICurrencyInputProps {
  name: string;
  allowNegative?: boolean;
  fractionalDelimiter?: string;
  fillByZeros?: boolean;
  required?: boolean;
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

  const formatValue = (value: string): number | string =>
    value ? number(Math.round(number(value) * 10 ** precision)) : "";
  const normalizeValue = (value: number): string =>
    value ? format(value / 10 ** precision, { notation: "fixed" }) : "0";

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
