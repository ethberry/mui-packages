import { FC } from "react";
import { useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { useDeepCompareEffect } from "@gemunion/react-hooks";

interface IAutoSaveProps {
  onSubmit: (values: any) => Promise<void>;
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit } = props;

  const values = useWatch({});

  const debouncedOnSubmit = useDebouncedCallback(async () => {
    await onSubmit(values);
  }, 300);

  useDeepCompareEffect(() => {
    void debouncedOnSubmit();
  }, [values]);

  return null;
};
