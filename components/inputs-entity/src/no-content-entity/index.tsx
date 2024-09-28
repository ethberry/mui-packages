import { FC, useEffect } from "react";

import { useDeepCompareEffect } from "@ethberry/react-hooks";
import { useInputRegistry } from "@ethberry/mui-form";

import { INoContentEntity } from "../interfaces";
import { useEntity } from "../useEntity";

export const NoContentEntity: FC<INoContentEntity> = props => {
  const { name, data = true } = props;

  const { fetchOptions, abortController } = useEntity(props);

  const { registerInput, unregisterInput } = useInputRegistry();

  useDeepCompareEffect(() => {
    void fetchOptions();

    return () => abortController.abort({ message: "AbortError" });
  }, [data]);

  useEffect(() => {
    registerInput(name, true);
    return () => {
      unregisterInput(name);
    };
  }, [name]);

  return null;
};
