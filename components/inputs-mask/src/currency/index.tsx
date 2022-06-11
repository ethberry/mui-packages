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

  const formatValue = (values: any): number => (values?.value ? Number.parseFloat(values?.value) * 10 ** precision : 0);
  const normalizeValue = (value: number): string => (value ? (value / 10 ** precision).toString() : "0");

  const form = useFormContext<any>();
  const value = get(form.getValues(), name);
  const formattedValue = normalizeValue(value);

  return (
    <MaskedInput
      allowNegative={allowNegative}
      decimalSeparator={fractionalDelimiter}
      thousandSeparator={thousandsSeparator}
      allowLeadingZeros={fillByZeros}
      prefix={symbol}
      name={name}
      formatValue={formatValue}
      normalizeValue={normalizeValue}
      defaultValue={formattedValue}
      {...rest}
    />
  );
};
