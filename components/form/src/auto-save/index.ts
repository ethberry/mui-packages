import { FC, useEffect } from "react";
import { useFormikContext } from "formik";

export const AutoSave: FC = () => {
  const formik = useFormikContext();

  useEffect(() => {
    formik.handleSubmit();
  }, [formik.values]);

  return null;
};
