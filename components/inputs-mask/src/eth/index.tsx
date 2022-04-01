import { FC } from "react";
import { getIn, useFormikContext } from "formik";
import { utils, constants } from "ethers";

import { MaskedInput } from "../mask";

export interface IEthInputProps {
  allowNegative?: boolean;
  fractionalDelimiter?: string;
  fillByZeros?: string;
  name: string;
  readOnly?: boolean;
  precision?: number;
  symbol?: string;
  thousandsSeparator?: string;
}

export const EthInput: FC<IEthInputProps> = props => {
  const {
    allowNegative = false,
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    precision = 2,
    symbol = constants.EtherSymbol,
    thousandsSeparator = " ",
    ...rest
  } = props;

  const formatValue = (value: string): string => utils.parseEther(value).toString();

  const normalizeValue = (value: string): string => {
    const normalizedValue = utils.formatEther(value);
    const [whole, decimals] = normalizedValue.split(".");
    return decimals === "0" ? whole : normalizedValue;
  };

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);
  const formattedValue = normalizeValue(value);

  const maskProps = {
    mask: Number,
    thousandsSeparator,
    scale: precision, // digits after decimal
    signed: allowNegative, // allow negative
    normalizeZeros: true, // appends or removes zeros at ends
    radix: fractionalDelimiter, // fractional delimiter
    padFractionalZeros: fillByZeros, // if true, then pads zeros at end to the length of scale
  };

  const mask = [
    {
      mask: "", // To hide symbol if field is empty
    },
    {
      mask: `${symbol} num`,
      blocks: {
        num: maskProps,
      },
    },
    {
      mask: `-${symbol} num`,
      blocks: {
        num: maskProps,
      },
    },
  ];

  const updateValue = (maskedRef: any): void => {
    if (maskedRef && maskedRef.current) {
      const currencyAmount = formatValue(maskedRef.current.unmaskedValue);
      formik.setFieldValue(name, currencyAmount);
    }
  };

  return (
    <MaskedInput
      mask={mask}
      name={name}
      updateValue={updateValue}
      useMaskedValue={false}
      value={formattedValue}
      {...rest}
    />
  );
};