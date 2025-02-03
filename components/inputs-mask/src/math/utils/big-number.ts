export function format(value: any, options: any): string {
  if (typeof options === "function") {
    return options(value) as string;
  }

  if (!value.isFinite()) {
    return value.isNaN() ? "NaN" : value.gt(0) ? "Infinity" : "-Infinity";
  }

  let notation = "auto";
  let precision;
  let wordSize;

  if (options !== undefined) {
    if (typeof options === "object" && "notation" in options && options.notation) {
      notation = options.notation as string;
    }

    if (typeof options === "number") {
      precision = options;
    } else if ("precision" in options && options.precision !== undefined) {
      precision = options.precision as number;
    }

    if (typeof options === "object" && "wordSize" in options && options.wordSize) {
      wordSize = options.wordSize;
      if (typeof wordSize !== "number") {
        throw new Error('Option "wordSize" must be a number');
      }
    }
  }

  switch (notation) {
    case "fixed":
      return toFixed(value, precision);

    case "exponential":
      return toExponential(value, precision);

    case "auto": {
      const lowerExp = options && options.lowerExp !== undefined ? options.lowerExp : -3;
      const upperExp = options && options.upperExp !== undefined ? options.upperExp : 5;

      if (value.isZero()) return "0";

      let str;
      const rounded = value.toSignificantDigits(precision);
      const exp = rounded.e;
      if (exp >= lowerExp && exp < upperExp) {
        str = rounded.toFixed();
      } else {
        str = toExponential(value, precision);
      }

      return str.replace(/((\.\d*?)(0+))($|e)/, function () {
        // eslint-disable-next-line prefer-rest-params
        const digits = arguments[2];
        // eslint-disable-next-line prefer-rest-params
        const e = arguments[4];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return digits !== "." ? digits + e : e;
      }) as string;
    }
    default:
      throw new Error(
        'Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.',
      );
  }
}

export function toExponential(value: any, precision?: number): string {
  if (precision !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value.toExponential(precision - 1); // Note the offset of one
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return value.toExponential();
  }
}

export function toFixed(value: any, precision?: number): string {
  return value.toFixed(precision) as string;
}
