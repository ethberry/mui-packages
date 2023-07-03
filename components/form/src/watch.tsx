import { FC } from "react";
import { useWatch } from "react-hook-form";

export interface IFormWatcherProps {
  name?: string;
}

export const FormWatcher: FC<IFormWatcherProps> = props => {
  const { name } = props;
  const form = name ? useWatch({ name }) : useWatch();

  console.info(form);

  return null;
};
