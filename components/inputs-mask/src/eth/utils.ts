import { BigNumberish, utils } from "ethers";

export const formatValue =
  (units?: BigNumberish) =>
  (value: string): string =>
    value ? utils.parseUnits(value, units).toString() : "0";

export const normalizeValue =
  (units?: BigNumberish) =>
  (value: string): string => {
    // values passed from query string are parsed to number by custom qs.decoder
    const normalizedValue = value ? utils.formatUnits(value.toString(), units) : "0";
    const [whole, decimals] = normalizedValue.split(".");

    return decimals === "0" ? whole : normalizedValue;
  };
