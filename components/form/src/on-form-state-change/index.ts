import { FC } from "react";
import { FieldValues, useFormContext, UseFormReturn } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import { useDeepCompareEffect } from "@gemunion/react-hooks";

interface IOnFormStateChangeProps {
  onFormStateChange: (form: UseFormReturn<FieldValues, any>) => Promise<void>;
}

export const OnFormStateChange: FC<IOnFormStateChangeProps> = props => {
  const { onFormStateChange } = props;

  const form = useFormContext();

  const {
    formState: { isDirty, isValid, errors, touchedFields, dirtyFields },
    getValues,
  } = form;
  const values = getValues();

  const debouncedOnFormStateChange = useDebouncedCallback(async () => {
    await onFormStateChange(form);
  }, 300);

  useDeepCompareEffect(() => {
    void debouncedOnFormStateChange();
  }, [form, { isDirty, isValid }, errors, touchedFields, dirtyFields, values]);

  return null;
};
