import { useWatch } from "react-hook-form";

export const FormWatcher = () => {
  const form = useWatch();

  console.info(form);

  return null;
};
