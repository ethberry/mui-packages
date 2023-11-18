import { isBigNumber, isFraction, isNumber, isString } from "./is";

function getNonDecimalNumberParts(input: any) {
  const nonDecimalWithRadixMatch = input.match(/(0[box])([0-9a-fA-F]*)\.([0-9a-fA-F]*)/);
  if (nonDecimalWithRadixMatch) {
    // @ts-ignore
    const radix = { "0b": 2, "0o": 8, "0x": 16 }[nonDecimalWithRadixMatch[1]];
    const integerPart = nonDecimalWithRadixMatch[2];
    const fractionalPart = nonDecimalWithRadixMatch[3];
    return { input, radix, integerPart, fractionalPart };
  } else {
    return null;
  }
}

function makeNumberFromNonDecimalParts(parts: any) {
  const n = parseInt(parts.integerPart, parts.radix);
  let f = 0;
  for (let i = 0; i < parts.fractionalPart.length; i++) {
    const digitValue = parseInt(parts.fractionalPart[i], parts.radix);
    f += digitValue / Math.pow(parts.radix, i + 1);
  }
  const result = n + f;
  if (isNaN(result)) {
    throw new SyntaxError('String "' + parts.input + '" is not a valid number');
  }
  return result;
}

export function number(x: any): number {
  if (isNumber(x)) {
    return x as number;
  }

  if (isString(x)) {
    if (x === "NaN") return NaN;
    const nonDecimalNumberParts = getNonDecimalNumberParts(x);
    if (nonDecimalNumberParts) {
      return makeNumberFromNonDecimalParts(nonDecimalNumberParts);
    }
    let size = 0;
    const wordSizeSuffixMatch = x.match(/(0[box][0-9a-fA-F]*)i([0-9]*)/);
    if (wordSizeSuffixMatch) {
      size = Number(wordSizeSuffixMatch[2]);
      x = wordSizeSuffixMatch[1];
    }
    let num = Number(x);
    if (isNaN(num)) {
      throw new SyntaxError('String "' + x + '" is not a valid number');
    }
    if (wordSizeSuffixMatch) {
      if (num > 2 ** size - 1) {
        throw new SyntaxError(`String "${x}" is out of range`);
      }
      if (num >= 2 ** (size - 1)) {
        num = num - 2 ** size;
      }
    }
    return num;
  }

  if (isBigNumber(x)) {
    return x.toNumber() as number;
  }

  if (isFraction(x)) {
    return x.valueOf() as number;
  }

  return 0;
}
