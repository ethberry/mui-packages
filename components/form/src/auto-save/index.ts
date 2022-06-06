import { FC, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

interface IAutoSaveProps {
  onSubmit: (values: any) => void;
}

export const AutoSave: FC<IAutoSaveProps> = props => {
  const { onSubmit } = props;

  const watch = useWatch();

  const debouncedOnSubmit = useDebouncedCallback(() => onSubmit(watch), 300);

  useEffect(() => {
    debouncedOnSubmit();
  }, [watch]);

  return null;
};
