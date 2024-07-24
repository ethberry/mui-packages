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
