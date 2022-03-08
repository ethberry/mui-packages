import { FC, useEffect } from "react";
import { useFormikContext } from "formik";

export const AutoSave: FC = () => {
  const formik = useFormikContext<any>();

  useEffect(() => {
    formik.handleSubmit();
  }, [formik.values]);

  return null;
};
