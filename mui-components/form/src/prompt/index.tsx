import { FC } from "react";
import { useIntl } from "react-intl";
import { useFormikContext } from "formik";

import { usePrompt } from "./workaround";

interface IPromptIfDirtyProps {
  visible?: boolean;
}

export const PromptIfDirty: FC<IPromptIfDirtyProps> = props => {
  const { visible = true } = props;
  const formik = useFormikContext();
  const { formatMessage } = useIntl();

  usePrompt(formatMessage({ id: "form.hints.prompt" }), visible && formik.dirty && formik.submitCount === 0);

  return null;
};
