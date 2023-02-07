import { FC } from "react";
import { useIntl } from "react-intl";
import { unstable_usePrompt as usePrompt } from "react-router-dom";
import { useFormContext } from "react-hook-form";

interface IPromptIfDirtyProps {
  visible?: boolean;
}

export const PromptIfDirty: FC<IPromptIfDirtyProps> = props => {
  const { visible = true } = props;
  const {
    formState: { isDirty, submitCount },
  } = useFormContext();
  const { formatMessage } = useIntl();

  usePrompt({
    message: formatMessage({ id: "form.hints.prompt" }),
    when: visible && isDirty && submitCount === 0,
  });

  return null;
};
