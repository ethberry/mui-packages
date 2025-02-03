import { isBigNumber, isString } from "./is";
import { format as formatNumber } from "./utils/number";
import { format as formatBigNumber } from "./utils/big-number";

const controlCharacters: Record<string, string> = {
  '"': '\\"',
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "\t": "\\t",
};

export function format(value: any, options: any): string {
  const result = _format(value, options);
  if (options && typeof options === "object" && "truncate" in options && result.length > options.truncate) {
    return result.substring(0, options.truncate - 3) + "...";
  }
  return result;
}

export function stringify(value: any): string {
  const text = String(value);
  let escaped = "";
  let i = 0;
  while (i < text.length) {
    const c = text.charAt(i);
    escaped += c in controlCharacters ? controlCharacters[c] : c;
    i++;
  }

  return '"' + escaped + '"';
}

function looksLikeFraction(value: any): boolean {
  return (
    (!!value &&
      typeof value === "object" &&
      typeof value.s === "number" &&
      typeof value.n === "number" &&
      typeof value.d === "number") ||
    false
  );
}

function _format(value: any, options: any): string {
  if (typeof value === "number") {
    return formatNumber(value, options);
  }

  if (isBigNumber(value)) {
    return formatBigNumber(value, options);
  }

  if (looksLikeFraction(value)) {
    if (!options || options.fraction !== "decimal") {
      return value.s * value.n + "/" + value.d;
    } else {
      return value.toString() as string;
    }
  }

  if (isString(value)) {
    return stringify(value);
  }

  if (typeof value === "function") {
    return value.syntax ? String(value.syntax) : "function";
  }

  if (value && typeof value === "object") {
    if (typeof value.format === "function") {
      return value.format(options) as string;
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
    } else if (value && value.toString(options) !== {}.toString()) {
      // @ts-ignore
      return value.toString(options) as string;
    } else {
      const entries = Object.keys(value).map(key => {
        return stringify(key) + ": " + format(value[key], options);
      });

      return "{" + entries.join(", ") + "}";
    }
  }

  return String(value);
}
