import { useRef, useMemo, useEffect } from "react";

const deepEqual = (obj1: any, obj2: any): boolean => {
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

type UseEffectParams = Parameters<typeof useEffect>;
type EffectCallback = UseEffectParams[0];
type DependencyList = UseEffectParams[1];
// yes, I know it's void, but I like what this communicates about
// the intent of these functions: It's just like useEffect
type UseEffectReturn = ReturnType<typeof useEffect>;

function isPrimitive(val: unknown) {
  return val == null || /^[sbn]/.test(typeof val);
}

function checkDeps(deps: DependencyList) {
  if (!deps || !deps.length) {
    throw new Error("useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.");
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      "useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.",
    );
  }
}

/**
 * @param value the value to be memoized (usually a dependency list)
 * @returns a memoized version of the value as long as it remains deeply equal
 */
export const useDeepCompareMemoize = <T>(value: T) => {
  const ref = useRef<T>(JSON.parse(JSON.stringify(value)));
  const signalRef = useRef<number>(0);

  if (!deepEqual(JSON.parse(JSON.stringify(value)), ref.current)) {
    ref.current = JSON.parse(JSON.stringify(value));
    signalRef.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [signalRef.current]);
};

export const useDeepCompareEffect = (callback: EffectCallback, dependencies: DependencyList): UseEffectReturn => {
  if (process.env.NODE_ENV !== "production") {
    checkDeps(dependencies);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
};

export const useDeepCompareEffectNoCheck = (
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
};
