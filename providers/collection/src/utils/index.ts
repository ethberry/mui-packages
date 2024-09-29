import { defaultDecoder } from "qs";

import { InputType } from "@ethberry/types-collection";

// https://github.com/ljharb/qs/issues/91#issuecomment-522289267
export const decoder = (str: string, _decoder: defaultDecoder, charset: string): any => {
  const strWithoutPlus = str.replace(/\+/g, " ");
  if (charset === "iso-8859-1") {
    // unescape never throws, no try...catch needed:
    return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
  }

  if (/^(\d+|\d*\.\d+)$/.test(str)) {
    const parsed = parseFloat(str);
    return parsed.toString() === str ? parsed : str;
  }

  const keywords: Record<string, any> = {
    true: true,
    false: false,
    null: null,
    undefined: void 0,
  };

  if (str in keywords) {
    return keywords[str];
  }

  try {
    return decodeURIComponent(strWithoutPlus);
  } catch (e) {
    void e;
    return strWithoutPlus;
  }
};

export const deepEqual = (obj1: any, obj2: any): boolean => {
  // Private
  function isObject(obj: any) {
    return typeof obj === "object" && obj != null;
  }

  if (obj1 === obj2) {
    return true;
  } else if (isObject(obj1) && isObject(obj2)) {
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
    for (const prop in obj1) {
      if (!deepEqual(obj1[prop], obj2[prop])) {
        return false;
      }
    }
    return true;
  }

  return false;
};

export const hasAwaited = (obj: Record<string, any>): boolean =>
  Object.values(obj).some(val => val === InputType.awaited || (typeof val === "object" && hasAwaited(val)));
