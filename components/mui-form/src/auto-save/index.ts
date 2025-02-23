import { FC } from "react";
import { FieldValues, get, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useDeepCompareEffect } from "@ethberry/react-hooks";

import { useInputRegistry } from "../input-registry-provider";

interface IAutoSaveProps {
  onSubmit: (values: any, form: UseFormReturn<FieldValues, any>) => Promise<void>;
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit } = props;

  const form = useFormContext();
  const { registeredInputs } = useInputRegistry();

  const {
    formState: { isDirty, dirtyFields },
  } = form;

  const values = useWatch();

  const debouncedOnSubmit = useDebouncedCallback(async () => {
    await onSubmit(values, form);
  }, 300);

  useDeepCompareEffect(() => {
    if (isDirty) {
      if (
        registeredInputs
          .filter(input => input.isAsync)
          .some(input => !Array.isArray(get(values, input.name)) && !get(dirtyFields, input.name))
      ) {
        return;
      }

      void debouncedOnSubmit();
    }
  }, [values, { isDirty }, registeredInputs]);

  return null;
};
