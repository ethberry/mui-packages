import { isNumber } from "../is";

interface SplitValue { sign: "+" | "-" | ""; coefficients: number[]; exponent: number }

// eslint-disable-next-line @typescript-eslint/ban-types
export function format(value: number, options: object | Function | number): string {
  if (typeof options === "function") {
    return options(value) as string;
  }

  if (value === Infinity) {
    return "Infinity";
  } else if (value === -Infinity) {
    return "-Infinity";
  } else if (isNaN(value)) {
    return "NaN";
  }

  let notation = "auto";
  let precision;
  let wordSize;

  if (options && typeof options === "object") {
    if ("notation" in options && options.notation) {
      notation = options.notation as string;
    }

    if (isNumber(options)) {
      precision = options as unknown as number;
    } else if ("precision" in options && options.precision && isNumber(options.precision)) {
      precision = options.precision as number;
    }

    if ("wordSize" in options && options.wordSize) {
      wordSize = options.wordSize;
      if (typeof wordSize !== "number") {
        throw new Error('Option "wordSize" must be a number');
      }
    }
  }

  switch (notation) {
    case "fixed":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return toFixed(value, precision);

    case "exponential":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return toExponential(value, precision);

    case "auto":
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return toPrecision(value, precision, options && (options as any)).replace(/((\.\d*?)(0+))($|e)/, function () {
        // eslint-disable-next-line prefer-rest-params
        const digits = arguments[2];
        // eslint-disable-next-line prefer-rest-params
        const e = arguments[4];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return digits !== "." ? digits + e : e;
      });

    default:
      throw new Error(
        'Unknown notation "' + notation + '". ' + 'Choose "auto", "exponential", "fixed", "bin", "oct", or "hex.',
      );
  }
}

export function splitNumber(value: number | string): SplitValue {
  const match = /^(-?)(\d+\.?\d*)(e([+-]?\d+))?$/.exec(String(value)
    .toLowerCase());
  if (!match) {
    throw new SyntaxError("Invalid number " + value);
  }

  const sign = match[1];
  const digits = match[2];
  let exponent = parseFloat(match[4] || "0");

  const dot = digits.indexOf(".");
  exponent += dot !== -1 ? dot - 1 : digits.length - 1;

  const coefficients = digits
    .replace(".", "") // remove the dot (must be removed before removing leading zeros)
    .replace(/^0*/, function (zeros) {
      exponent -= zeros.length;
      return "";
    })
    .replace(/0*$/, "") // remove trailing zeros
    .split("")
    .map(function (d) {
      return parseInt(d);
    });

  if (coefficients.length === 0) {
    coefficients.push(0);
    exponent++;
  }

  return { sign, coefficients, exponent } as SplitValue;
}

export function toFixed(value: any, precision?: number): string {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  const splitValue = splitNumber(value);
  const rounded =
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    typeof precision === "number" ? roundDigits(splitValue, splitValue.exponent + 1 + precision) : splitValue;
  let c = rounded.coefficients;
  let p = rounded.exponent + 1; // exponent may have changed

  const pp = p + (precision || 0);
  if (c.length < pp) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    c = c.concat(zeros(pp - c.length));
  }

  if (p < 0) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    c = zeros(-p + 1).concat(c);
    p = 1;
  }

  if (p < c.length) {
    c.splice(p, 0, p === 0 ? "0." : ".");
  }

  return (rounded.sign + c.join("")) as string;
}

export function toExponential(value: any, precision?: number) {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  const split = splitNumber(value);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const rounded = precision ? roundDigits(split, precision) : split;
  let c = rounded.coefficients;
  const e = rounded.exponent;

  if (typeof precision === "number" && c.length < precision) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    c = c.concat(zeros(precision - c.length));
  }

  const first = c.shift();
  return rounded.sign + first + (c.length > 0 ? "." + c.join("") : "") + "e" + (e >= 0 ? "+" : "") + e;
}

export function toPrecision(
  value: any,
  precision: number | undefined,
  options: {
    lowerExp: number | undefined;
    upperExp: number | undefined;
  },
): string {
  if (isNaN(value) || !isFinite(value)) {
    return String(value);
  }

  const lowerExp = options?.lowerExp !== undefined ? options.lowerExp : -3;
  const upperExp = options?.upperExp !== undefined ? options.upperExp : 5;

  const split = splitNumber(value);
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const rounded = precision ? roundDigits(split, precision) : split;
  if (rounded.exponent < lowerExp || rounded.exponent >= upperExp) {
    return toExponential(value, precision);
  } else {
    let c = rounded.coefficients;
    const e = rounded.exponent;

    if (precision && c.length < precision) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      c = c.concat(zeros(precision - c.length));
    }

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    c = c.concat(zeros(e - c.length + 1 + (precision && c.length < precision ? precision - c.length : 0)));

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    c = zeros(-e).concat(c);

    const dot = e > 0 ? e : 0;
    if (dot < c.length - 1) {
      c.splice(dot + 1, 0, ".");
    }

    return (rounded.sign + c.join("")) as string;
  }
}

export function roundDigits(split: any, precision: number) {
  const rounded = {
    sign: split.sign,
    coefficients: split.coefficients,
    exponent: split.exponent,
  };
  const c = rounded.coefficients;

  while (precision <= 0) {
    c.unshift(0);
    rounded.exponent++;
    precision++;
  }

  if (c.length > precision) {
    const removed = c.splice(precision, c.length - precision);

    if (removed[0] >= 5) {
      let i = precision - 1;
      c[i]++;
      while (c[i] === 10) {
        c.pop();
        if (i === 0) {
          c.unshift(0);
          rounded.exponent++;
          i++;
        }
        i--;
        c[i]++;
      }
    }
  }

  return rounded;
}

function zeros(length: number): Array<number> {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(0);
  }
  return arr;
}
