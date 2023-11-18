export function isNumber(x: unknown): boolean {
  return typeof x === "number";
}

export function isBigNumber(x: unknown): boolean {
  if (!x || typeof x !== "object" || typeof x.constructor !== "function") {
    return false;
  }

  const xAsAny = x as any;

  if (
    xAsAny.isBigNumber === true &&
    typeof xAsAny.constructor.prototype === "object" &&
    xAsAny.constructor.prototype.isBigNumber === true
  ) {
    return true;
  }

  if (typeof xAsAny.constructor.isDecimal === "function" && xAsAny.constructor.isDecimal(xAsAny) === true) {
    return true;
  }

  return false;
}

export function isFraction(x: unknown): boolean {
  const xAsAny = x as any;
  return (!!xAsAny && typeof xAsAny === "object" && "isFraction" in xAsAny && xAsAny.isFraction === true) || false;
}

export function isString(x: unknown): boolean {
  return typeof x === "string";
}
