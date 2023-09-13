import { FC, useCallback, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { unstable_useBlocker as useBlocker, useBeforeUnload } from "react-router-dom";
import { useFormContext } from "react-hook-form";

function usePrompt(onLocationChange: () => boolean, hasUnsavedChanges: boolean) {
  const blocker = useBlocker(hasUnsavedChanges ? onLocationChange : false);
  const prevState = useRef(blocker.state);

  useEffect(() => {
    if (blocker.state === "blocked") {
      blocker.reset();
    }
    prevState.current = blocker.state;
  }, [blocker]);
}

export const PromptIfDirty: FC = () => {
  const {
    formState: { isDirty, submitCount },
  } = useFormContext();
  const { formatMessage } = useIntl();
  const hasUnsavedChanges = isDirty && submitCount === 0;

  const onLocationChange = useCallback(() => {
    if (hasUnsavedChanges) {
      return !window.confirm(formatMessage({ id: "form.hints.prompt" }));
    }
    return false;
  }, [hasUnsavedChanges]);

  usePrompt(onLocationChange, hasUnsavedChanges);

  useBeforeUnload(
    useCallback(
      event => {
        if (hasUnsavedChanges) {
          event.preventDefault();
          event.stopPropagation();
          event.returnValue = "";
        }
      },
      [hasUnsavedChanges],
    ),
    { capture: true },
  );

  return null;
};
