import { FC, ReactElement } from "react";
import { FormattedMessage } from "react-intl";
import { Prompt } from "react-router-dom";

import { useFormikContext } from "formik";

interface IPromptIfDirtyProps {
  visible?: boolean;
}

export const PromptIfDirty: FC<IPromptIfDirtyProps> = props => {
  const { visible = true } = props;
  const formik = useFormikContext();

  if (!visible) {
    return null;
  }

  return (
    <FormattedMessage id="form.hints.prompt">
      {([formattedMessage]: Array<string>): ReactElement => (
        <Prompt when={formik.dirty && formik.submitCount === 0} message={formattedMessage} />
      )}
    </FormattedMessage>
  );
};
