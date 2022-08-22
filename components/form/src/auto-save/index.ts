import { FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { useDeepCompareEffect } from "@gemunion/react-hooks";

interface IAutoSaveProps {
  onSubmit: (values: any) => Promise<void>;
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit } = props;

  const values = useWatch();
  const { formState } = useFormContext();

  const debouncedOnSubmit = useDebouncedCallback(async () => {
    await onSubmit(values);
  }, 300);

  useDeepCompareEffect(() => {
    if (formState.isDirty) {
      void debouncedOnSubmit();
    }
  }, [values, formState.isDirty]);

  return null;
};
