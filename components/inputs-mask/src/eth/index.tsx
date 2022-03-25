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
  thousandsSeparator?: string;
  formatValue?: (value: string) => string;
  normalizeValue?: (value: string) => string;
}

export const EthInput: FC<IEthInputProps> = props => {
  const {
    allowNegative = false,
    fractionalDelimiter = ".",
    fillByZeros = false,
    name,
    thousandsSeparator = " ",
    ...rest
  } = props;

  const formatValue = (value: string): string => utils.parseEther(value).toString();

  const normalizeValue = (value: string): string => utils.formatEther(value).split(".")[0];

  const formik = useFormikContext<any>();
  const value = getIn(formik.values, name);
  const formattedValue = normalizeValue(value);

  const maskProps = {
    mask: Number,
    thousandsSeparator,
    scale: 0, // digits after decimal
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
      mask: `${constants.EtherSymbol} num`,
      blocks: {
        num: maskProps,
      },
    },
    {
      mask: `-${constants.EtherSymbol} num`,
      blocks: {
        num: maskProps,
      },
    },
  ];

  const updateValue = (maskedRef: any): void => {
    if (maskedRef && maskedRef.current) {
      const EthAmount = formatValue(maskedRef.current.unmaskedValue);
      formik.setFieldValue(name, EthAmount);
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
