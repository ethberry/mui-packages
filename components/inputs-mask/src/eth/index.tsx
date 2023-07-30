import { FC } from "react";
import { useWatch } from "react-hook-form";
import { BigNumberish, constants } from "ethers";

import { MaskedInput } from "../mask";
import { formatValue, normalizeValue } from "./utils";

export interface IEthInputProps {
  allowNegative?: boolean;
  fractionalDelimiter?: string;
  fillByZeros?: boolean;
  name: string;
  readOnly?: boolean;
  precision?: number;
  units?: BigNumberish;
  symbol?: string;
  thousandsSeparator?: string;
}

export const EthInput: FC<IEthInputProps> = props => {
  const {
    allowNegative = false,
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    symbol = constants.EtherSymbol,
    thousandsSeparator = " ",
    units,
    ...rest
  } = props;

  const value = useWatch({ name });
  const normalizedValue = normalizeValue(units)(value);

  return (
    <MaskedInput
      allowNegative={allowNegative}
      decimalSeparator={fractionalDelimiter}
      thousandSeparator={thousandsSeparator}
      allowLeadingZeros={fillByZeros}
      prefix={symbol ? `${symbol} ` : ""}
      name={name}
      formatValue={formatValue(units)}
      normalizeValue={normalizeValue(units)}
      defaultValue={normalizedValue}
      {...rest}
    />
  );
};
