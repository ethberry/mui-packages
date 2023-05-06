import { parseUnits, formatUnits } from "ethers";
import { format, number } from "mathjs";

export const formatValue =
  (units?: bigint | number | string) =>
  (value: string): string => {
    return value ? format(number(parseUnits(value, units).toString()), { notation: "fixed" }) : "0";
  };

export const normalizeValue =
  (units?: bigint | number | string) =>
  (value: string): string => {
    // values passed from query string are parsed to number by custom qs.decoder
    const safeValue = format(number(value), { notation: "fixed" });
    const normalizedValue = value ? formatUnits(safeValue, units) : "0";
    const [whole, decimals] = normalizedValue.split(".");

    return decimals === "0" ? whole : normalizedValue;
  };
