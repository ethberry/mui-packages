import { FC, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface IAutoSaveProps {
  onSubmit: (values: any) => Promise<void>;
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit } = props;

  const watch = useWatch();

  const debouncedOnSubmit = useDebouncedCallback(async () => await onSubmit(watch), 300);

  useEffect(() => {
    void debouncedOnSubmit();
  }, [watch]);

  return null;
};
