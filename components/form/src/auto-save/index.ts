import { FC } from "react";
import { FieldValues, useFormContext, UseFormReturn, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useDeepCompareEffect } from "@gemunion/react-hooks";

interface IAutoSaveProps {
  onSubmit: (values: any, form: UseFormReturn<FieldValues, any>) => Promise<void>;
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit } = props;

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
      void debouncedOnSubmit();
    }
  }, [values, { isDirty }]);

  return null;
};
