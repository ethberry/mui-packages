import { FC, useEffect, useMemo } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { constants, BigNumberish } from "ethers";

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

  const form = useFormContext<any>();
  const value = useWatch({ name });
  const normalizedValue = normalizeValue(units)(value);

  // memoize value to handle changing units
  // and setting correct value to the form according to the new units
  const memoizedValue = useMemo(() => normalizeValue(units)(value), [value]);
  useEffect(() => {
    form.setValue(name, formatValue(units)(memoizedValue), { shouldTouch: true });
  }, [units]);

  return (
    <MaskedInput
      allowNegative={allowNegative}
      decimalSeparator={fractionalDelimiter}
      thousandSeparator={thousandsSeparator}
      allowLeadingZeros={fillByZeros}
      prefix={`${symbol} `}
      name={name}
      formatValue={formatValue(units)}
      normalizeValue={normalizeValue(units)}
      defaultValue={normalizedValue}
      {...rest}
    />
  );
};
