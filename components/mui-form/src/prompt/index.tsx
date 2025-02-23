import { FC } from "react";
import { useIntl } from "react-intl";
import { unstable_usePrompt as usePrompt } from "react-router";
import { useFormContext } from "react-hook-form";

interface IPromptIfDirtyProps {
  visible?: boolean;
}

export const PromptIfDirty: FC<IPromptIfDirtyProps> = props => {
  const { visible = true } = props;
  const {
    formState: { isDirty },
  } = useFormContext();
  const { formatMessage } = useIntl();

  usePrompt({
    message: formatMessage({ id: "form.hints.prompt" }),
    when: visible && isDirty,
  });

  return null;
};
