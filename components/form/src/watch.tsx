import { FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export interface IFormWatcherProps {
  name?: string;
}

export const FormWatcher: FC<IFormWatcherProps> = props => {
  const { name } = props;
  const form = name ? useWatch({ name }) : useWatch();
  const {
    formState: { errors, isDirty, isValid },
  } = useFormContext();

  console.info({ form, errors, isDirty, isValid });

  return null;
};
