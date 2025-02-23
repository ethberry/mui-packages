import { FC } from "react";
import { useFormContext } from "react-hook-form";

export const FormState: FC = () => {
  const {
    formState: { errors, isDirty, isValid },
  } = useFormContext();

  console.info({ isDirty, isValid, errors });

  return null;
};
