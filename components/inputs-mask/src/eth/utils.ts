import { utils } from "ethers";

export const formatValue =
  (units?: number) =>
  (value: string): string => {
    if (!value) return "0";
    const parsedValue = utils.parseUnits(value, units).toString();
    const numValue = parseFloat(parsedValue);
    return numValue.toFixed();
  };

export const normalizeValue =
  (units?: number) =>
  (value: string): string => {
    if (!value) return "0";
    const safeValue = parseFloat(value).toString();
    const normalizedValue = utils.formatUnits(safeValue, units);
    const [whole, decimals] = normalizedValue.split(".");

    return decimals === "0" ? whole : normalizedValue;
  };
