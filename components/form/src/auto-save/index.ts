import { FC } from "react";
import { FieldValues, get, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useDeepCompareEffect } from "@gemunion/react-hooks";

interface IAutoSaveProps {
  onSubmit: (values: any, form: UseFormReturn<FieldValues, any>) => Promise<void>;
  awaitingFieldsNames?: string[];
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit, awaitingFieldsNames } = props;

  const form = useFormContext();

  const {
    formState: { isDirty },
  } = form;

  const values = useWatch();

  const debouncedOnSubmit = useDebouncedCallback(async () => {
    await onSubmit(values, form);
  }, 300);

  useDeepCompareEffect(() => {
    if (isDirty) {
      if (awaitingFieldsNames && awaitingFieldsNames.some(fieldName => get(values, fieldName) === 0)) {
        return;
      }

      void debouncedOnSubmit();
    }
  }, [values, { isDirty }, awaitingFieldsNames]);

  return null;
};
